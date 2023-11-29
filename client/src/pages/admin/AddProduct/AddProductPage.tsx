import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormControl, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

interface Product {
  name: string;
  price: number;
  quantity: number;
  wattage: number;
  pin: string;
  connect: string;
  weight: number;
  description: string;
  categoryId: string;
}

interface Category {
  categoryId: number;
  description: number;
  name: string;
}

const schema = yup.object().shape({
  categoryId: yup.string().required("Manufacturer is required"),
  name: yup
    .string()
    .max(100, "string must not be longer than 100 characters")
    .required("Name is required"),
  price: yup
    .number()
    .min(1, "Min is 1")
    .required("Field is required")
    .positive(),
  quantity: yup
    .number()
    .min(1, "Min is 1")
    .required("Field is required")
    .positive()
    .integer(),
  wattage: yup
    .number()
    .min(1, "Min is 1")
    .required("Field is required")
    .positive(),
  pin: yup
    .string()
    .max(100, "string must not be longer than 100 characters")
    .required("Field is required"),
  connect: yup
    .string()
    .max(255, "string must not be longer than 255 characters")
    .required("Field is required"),
  weight: yup
    .number()
    .min(1, "Min is 1")
    .required("Field is required")
    .positive(),
  description: yup
    .string()
    .max(1000, "string must not be longer than 1000 characters")
    .required("Description is required"),
});

export default function AddProductPage() {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const [manufacturer, setManufacturer] = useState<Category[]>([]);

  const [imageUrlAvatar, setImageUrlAvatar] = useState<string | null>(null);

  const [optionalImages, setOptionalImages] = useState<string[]>([]);

  const fetchData = async () => {
    const manufacturerRes = await axios.get(`${apiURL}/categories`);
    setManufacturer(manufacturerRes.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (!selectedImage) return;
    const selectedImage = e.target.files?.[0];
    // let selectedImageUrl = URL.createObjectURL(e.target.files[0]);
    if (selectedImage) {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          setImageUrlAvatar(url);
          // setSelectedImageUrl(null);
          Swal.fire({
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleMultipleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    const uploadPromises = [];
    if (files && files.length > 0) {
      // Rest of your code
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytes(storageRef, file);
        uploadPromises.push(uploadTask);
      }

      Promise.all(uploadPromises)
        .then((snapshots) => {
          const downloadUrls: string[] = [];

          snapshots.forEach((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              downloadUrls.push(url);

              // Kiểm tra xem đã tải lên tất cả ảnh chưa và xử lý sau khi tải lên hoàn thành.
              if (downloadUrls.length === files.length) {
                // downloadUrls chứa các đường dẫn tải về của tất cả các ảnh.
                console.log(downloadUrls);
                setOptionalImages(downloadUrls);
                Swal.fire({
                  icon: "success",
                });
              }
            });
          });
        })
        .catch((error) => {
          console.error("Error uploading images:", error);
        });
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Product) => {
    if (!imageUrlAvatar) {
      Swal.fire({
        icon: "error",
        title: "Avatar is not blank",
        timer: 2000,
      });
      return;
    } else {
      const newProduct = { ...data, avatar: imageUrlAvatar, optionalImages };
      console.log(newProduct);
      try {
        const response: AxiosResponse = await axios.post(
          `${apiURL}/products`,
          newProduct
        );
        console.log(response.status);

        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Add product successfully",
            timer: 2000,
          });
          navigate("/admin/products");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error,
        } as SweetAlertOptions);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{
            marginTop: 8,
            marginBottom: 3,
          }}
        >
          Back
        </Button>
        <Box>
          <Typography component="h1" variant="h5">
            Add a product
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Box marginTop={2}>
                  <Controller
                    defaultValue=""
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Name"
                        error={!!errors?.name}
                        helperText={errors?.name?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue={0}
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Price"
                        error={!!errors?.price}
                        helperText={errors?.price?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue={0}
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Quantity"
                        error={!!errors?.quantity}
                        helperText={errors?.quantity?.message}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <Box marginTop={2}>
                  <Controller
                    defaultValue={0}
                    name="wattage"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Wattage"
                        error={!!errors?.wattage}
                        helperText={errors?.wattage?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue={""}
                    name="pin"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Pin"
                        error={!!errors?.pin}
                        helperText={errors?.pin?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue={""}
                    name="connect"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Connect"
                        error={!!errors?.connect}
                        helperText={errors?.connect?.message}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box marginTop={2}>
                  <Controller
                    defaultValue={0}
                    name="weight"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Weight"
                        error={!!errors?.weight}
                        helperText={errors?.weight?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  <Controller
                    defaultValue=""
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        label="Description"
                        error={!!errors?.description}
                        helperText={errors?.description?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginTop={2}>
                  {" "}
                  <Controller
                    defaultValue=""
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.categoryId}>
                        <InputLabel>Category</InputLabel>
                        <Select {...field} label="Category">
                          {manufacturer?.map((e, i) => (
                            <MenuItem key={i} value={e.categoryId}>
                              {e.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.categoryId ? (
                          <Typography color={"error"} fontSize={"12px"}>
                            {errors.categoryId.message}
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </FormControl>
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box>
              <Typography variant="h4">Avatar</Typography>
              <input type="file" onChange={handleAvatarUpload} />

              {imageUrlAvatar ? (
                <img src={imageUrlAvatar} alt="" width={"350px"} />
              ) : (
                <></>
              )}
            </Box>
            <Box>
              <Typography variant="h4">Optional Images</Typography>
              <input
                type="file"
                name="optional-image"
                id="optional-image"
                multiple
                onChange={handleMultipleImageUpload}
              />
              <div className="grid md:grid-cols-3 gap-4">
                {optionalImages ? (
                  optionalImages.map((e, i) => (
                    <img key={i} src={e} alt="" className="w-full" />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
