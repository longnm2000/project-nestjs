import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "../../../components/ListItems/ListItems";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import Chart from './Chart';
// import Deposits from "../../../components/Deposits/Deposits";
// import Orders from "../../../components/Orders/Orders";
import { NavLink, useNavigate } from "react-router-dom";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import Title from "../../../components/Title/Title";
import { Helmet } from "react-helmet";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { DataGrid } from "@mui/x-data-grid";
// import TablePagination from "@mui/material/TablePagination";
// import moment from "moment";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Swal, { SweetAlertOptions } from "sweetalert2";
import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogActions from "@mui/material/DialogActions";
// import DeleteIcon from "@mui/icons-material/Delete";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useForm, Controller } from "react-hook-form";
// import TextField from "@mui/material/TextField";
// import AddIcon from "@mui/icons-material/Add";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useParams } from "react-router-dom";
import UndoIcon from "@mui/icons-material/Undo";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Admin {
  email: string;
  id: string;
  name: string;
}

interface Category {
  categoryId: number;
  name: string;
  description: string;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const schema = yup.object().shape({
  name: yup
    .string()
    .max(100, "Max length is 100")
    .required("Name cannot be blank"),
  description: yup
    .string()
    .max(255, "Max length is 255")
    .required("Name cannot be blank"),
});

function UpdateCategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_API_URL;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const adminStorageData = localStorage.getItem("admin");
  const admin: Admin = adminStorageData
    ? JSON.parse(adminStorageData)
    : { id: "", name: "", email: "" };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [data, setData] = useState<Category | null>(null);
  const fetchData = async () => {
    await axios
      .get(`${apiURL}/categories/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    handleCloseUserMenu();

    localStorage.removeItem("admin_token");
    Swal.fire({
      icon: "success",
      title: "Đã đăng xuất thành công",
      timer: 2000,
    }).then(() => {
      navigate("/admin/login");
    });
  };
  const handleLogin = () => {
    handleCloseUserMenu();
    navigate("/admin/login");
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split("")[0]}`,
    };
  }

  const onSubmit = async (data: object) => {
    try {
      const response = await axios.put(`${apiURL}/categories/${id}`, data);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Update successfully",
          timer: 2000,
        });
        navigate("/admin/categories");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
      } as SweetAlertOptions);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Helmet>
        <title>Update category</title>
      </Helmet>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  color="inherit"
                >
                  {admin ? (
                    <Avatar {...stringAvatar(admin.name)} />
                  ) : (
                    <AccountCircleIcon sx={{ fontSize: 30 }} />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {admin ? (
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleLogin}>
                    <Typography textAlign="center">Log In</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  className="overflow-x-auto bg-white"
                >
                  <React.Fragment>
                    <Title>Update category</Title>
                    <Box>
                      <Button
                        variant="contained"
                        component={NavLink}
                        to={"/admin/categories"}
                      >
                        <UndoIcon />
                      </Button>
                    </Box>
                    {data ? (
                      <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 1 }}
                        padding={2}
                      >
                        <Controller
                          name="name"
                          control={control}
                          defaultValue={data?.name}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              margin="normal"
                              label="Name"
                              error={!!errors.name}
                              helperText={errors?.name?.message}
                            />
                          )}
                        />
                        <Controller
                          name="description"
                          control={control}
                          defaultValue={data?.description}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              margin="normal"
                              label="Description"
                              error={!!errors.description}
                              helperText={errors?.description?.message}
                            />
                          )}
                        />

                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Update
                        </Button>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UpdateCategoryPage;
