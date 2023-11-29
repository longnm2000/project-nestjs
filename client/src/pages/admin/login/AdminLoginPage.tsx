import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const defaultTheme = createTheme();

interface Data {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Invalid email")
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "Invalid email")
    .max(100, "Email must not be longer than 100 characters"),
  password: yup.string().required("Password can not be blank"),
});

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Data) => {
    console.log(data);
    axios
      .post(`${apiURL}/auth/admin/login`, data)
      .then(async (res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          localStorage.setItem("admin_token", res.data.access_token);
          localStorage.setItem("admin", JSON.stringify(res.data.admin));
          await Swal.fire({
            icon: "success",
            title: "Logged in successfully!",
            text: "Tự động chuyển về trang chủ",
            timer: 1000,
          });
          navigate("/admin/users");
        }
        if (res.data.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Mật khẩu không chính xác!",

            timer: 1000,
          });
        }
        if (res.data.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Email không tồn tại!",
            timer: 1000,
          });
        }
        if (res.data.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Internal server error!",
            timer: 1000,
          });
        }
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: err,
          timer: 1000,
        } as SweetAlertOptions)
      );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AdminPanelSettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login for Administrator
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  placeholder="Email"
                  autoFocus
                  autoComplete="email"
                  label="Email Address"
                  id="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
