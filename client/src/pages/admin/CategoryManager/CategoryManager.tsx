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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../../components/Title/Title";
import { Helmet } from "react-helmet";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { DataGrid } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
// import moment from "moment";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Swal, { SweetAlertOptions } from "sweetalert2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
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
  name: yup.string().required("Field cannot be blank"),
  description: yup.string().required("Field cannot be blank"),
});

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

function CategoryManagerPage() {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
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

  const [data, setData] = useState<Category[]>([]);
  const fetchData = async () => {
    await axios
      .get(`${apiURL}/categories`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleShow = () => setShow(true);

  const handlePostDetail = () => {
    handleShow();
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Pagination change event handlers
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    handleCloseUserMenu();
    localStorage.removeItem("admin");
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

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiURL}/categories/${id}`)
          .then((response) => {
            console.log(response);
            if (response.data?.errno === 1451) {
              Swal.fire({
                icon: "error",
                title:
                  "You cannot delete this category because there are existing products in this category",
                timer: 2000,
              });
              return;
            }
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                timer: 2000,
                title: "Deleted!",
              });
              fetchData();
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: error,
            });
          });
      }
    });
  };
  const onSubmit = async (data: object) => {
    handleClose();
    try {
      const response: AxiosResponse = await axios.post(
        `${apiURL}/categories`,
        data
      );
      // eslint-disable-next-line no-constant-condition
      console.log(response);

      // eslint-disable-next-line no-constant-condition
      if ((response.status = 200)) {
        await Swal.fire({
          icon: "success",
          title: "Add success",
          timer: 2000,
        });
        fetchData();
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
        <title>Categories Manager</title>
      </Helmet>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Add category</DialogTitle>
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
            defaultValue=""
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
            defaultValue=""
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
            Add
          </Button>
        </Box>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
                    <Title>Categories</Title>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={handlePostDetail}
                        color="primary"
                      >
                        <AddIcon />
                      </Button>
                    </Box>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>category Id</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((e, i) => (
                            <TableRow key={i}>
                              <TableCell>
                                {page * rowsPerPage + i + 1}
                              </TableCell>
                              <TableCell>{e.categoryId}</TableCell>
                              <TableCell>{e.name}</TableCell>
                              <TableCell>{e.description}</TableCell>
                              <TableCell>
                                <Box display={"flex"} gap={1}>
                                  <Button
                                    variant="contained"
                                    color="success"
                                    component={NavLink}
                                    to={`/admin/categories/${e.categoryId}/update`}
                                  >
                                    <ModeEditIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(e.categoryId)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={data?.length || 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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

export default CategoryManagerPage;
