import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

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
import axios from "axios";
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
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import numeral from "numeral";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import moment from "moment";

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

interface Admin {
  email: string;
  id: string;
  name: string;
}

interface Product {
  productId: number;
  name: string;
  price: string;
  source: string;
  categoryName: string;
}

interface ProductDetail {
  productId: string;
  name: string;
  price: string;
  quantity: number;
  wattage: number;
  pin: string;
  connect: string;
  weight: number;
  description: string;
  categoryId: string;
  createAt: string;
  category: {
    categoryId: string;
    name: string;
    description: string;
  };
}

interface ProductPicture {
  pictureId: number;
  productId: number;
  source: string;
  type: number;
}

function ProductManagerPage() {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [images, setImages] = useState<ProductPicture[]>([]);
  const adminStorageData = localStorage.getItem("admin");
  const admin: Admin = adminStorageData
    ? JSON.parse(adminStorageData)
    : { id: "", name: "", email: "" };

  const toggleDrawer = () => {
    setOpen(!open);
  };
  // const handleExit = () => {
  //     localStorage.removeItem("admin_token");
  //     navigate("/admin/login");
  // };

  const [data, setData] = useState<Product[]>([]);
  const fetchData = () => {
    axios
      .get(`${apiURL}/products`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectProduct, setSelectProduct] = useState<ProductDetail | null>(
    null
  );
  const handleProductDetail = async (product: number) => {
    console.log(`${apiURL}/products/${product}`);

    handleShow();
    const response = await axios.get(`${apiURL}/products/${product}`);
    const imagesRes = await axios.get(`${apiURL}/pictures/${product}`);
    setSelectProduct(response.data);
    setImages(imagesRes.data);
  };
  console.log(selectProduct);

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

    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin");
    Swal.fire({
      icon: "success",
      title: "Logout successful",
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

  const handleDeleteProduct = (id: number) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiURL}/products/${id}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                timer: 2000,
                title: "Delete the product successfully!",
              });
              fetchData();
            }
          })
          .catch((error) =>
            Swal.fire({
              icon: "error",
              title: error,
            })
          );
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Helmet>
        <title>Product Manager</title>
      </Helmet>

      <Dialog open={show} onClose={handleClose} fullScreen>
        <DialogTitle>Product Detail</DialogTitle>
        <DialogContent>
          {selectProduct ? (
            <>
              <DialogContentText>
                <b>ID:</b> {selectProduct.productId}
              </DialogContentText>
              <DialogContentText>
                <b> Name:</b> {selectProduct.name}
              </DialogContentText>
              <DialogContentText>
                <b> Category:</b> {selectProduct.category.name}
              </DialogContentText>

              <DialogContentText>
                <b>Quantity:</b> {selectProduct.quantity}
              </DialogContentText>
              <DialogContentText>
                <b>Price:</b> {numeral(selectProduct.price).format("0,")} VND
              </DialogContentText>
              <DialogContentText>
                <b>Wattage:</b> {selectProduct.wattage}
              </DialogContentText>
              <DialogContentText>
                <b>Pin:</b> {selectProduct.pin}
              </DialogContentText>
              <DialogContentText>
                <b>Connect:</b> {selectProduct.connect}
              </DialogContentText>
              <DialogContentText>
                <b>Weight:</b> {selectProduct.weight}
              </DialogContentText>
              <DialogContentText>
                <b>Description:</b> {selectProduct.description}
              </DialogContentText>
              <DialogContentText>
                <b>Create At:</b>{" "}
                {moment(selectProduct.createAt).format("DD/MM/YYYY HH:mm:ss")}
              </DialogContentText>
              <DialogContentText>
                <b>Images:</b>
              </DialogContentText>
              <div className="grid md:grid-cols-3">
                {images.map((e, i) => (
                  <img
                    key={i}
                    src={e.source}
                    alt={selectProduct.name}
                    width={"300px"}
                    className="w-full gap-4"
                  />
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
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
                    <Title>Products</Title>
                    <Box>
                      <Button
                        variant="contained"
                        component={NavLink}
                        to={"/admin/products/add"}
                      >
                        <AddIcon />{" "}
                      </Button>
                    </Box>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Name</TableCell>

                          <TableCell>Image</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Price (VNĐ)</TableCell>
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
                              <TableCell>{e.name}</TableCell>

                              <TableCell>
                                <Box>
                                  <img
                                    src={e.source}
                                    alt={e.name}
                                    style={{ maxWidth: "100px" }}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell>{e.categoryName}</TableCell>
                              <TableCell>
                                {numeral(e.price).format("0,")}
                              </TableCell>
                              <TableCell>
                                <Box display={"flex"} gap={1}>
                                  <Button
                                    variant="contained"
                                    onClick={() =>
                                      handleProductDetail(+e.productId)
                                    }
                                    color="primary"
                                  >
                                    <RemoveRedEyeIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    component={NavLink}
                                    to={`/admin/products/${e.productId}/update`}
                                  >
                                    <CreateIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() =>
                                      handleDeleteProduct(e.productId)
                                    }
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

export default ProductManagerPage;
