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
import { useNavigate } from "react-router-dom";

// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../../components/Title/Title";

import axios from "axios";
import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

import { Helmet } from "react-helmet";
import TablePagination from "@mui/material/TablePagination";

// import { Col, Row } from "react-bootstrap";
import numeral from "numeral";
// import Form from "react-bootstrap/Form";

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
// import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import moment from "moment";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { ListItem, ListItemText } from "@mui/material";

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
interface Order {
  orderId: number;
  userId: number;
  total: number;
  address: string;
  status: number;
  createAt: Date;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}
interface OrderDetail {
  orderId: number;
  orderDetailId: number;
  productId: number;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

export default function OrdersManagerPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const apiURL = import.meta.env.VITE_API_URL;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const adminStorageData = localStorage.getItem("admin");
  const admin: Admin = adminStorageData
    ? JSON.parse(adminStorageData)
    : { id: "", name: "", email: "" };

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // const handleExit = () => {
  //     localStorage.removeItem("admin");
  //     navigate("/admin/login-admin");
  // };

  const [orders, setOrders] = useState<Order[] | null>(null);
  // const [selectedOrderStatus, setSelectedOrderStatus] = useState(0);

  const fetchData = async () => {
    await axios
      .get(`${apiURL}/order`)
      .then((res) => setOrders(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<
    OrderDetail[] | null
  >(null);

  const handleOrderDetail = async (order: Order) => {
    setSelectedOrder(order);
    await axios
      .get(`${apiURL}/order-detail/${order.orderId}`)
      .then((res) => setSelectedOrderDetail(res.data))
      .catch((error) => console.log(error));
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

  const handleChange = (value: number, id: number) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`${apiURL}/order/${id}`, { value })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({ icon: "success", title: "success", timer: 2000 });
              fetchData();
            }
          })
          .catch((error) => console.log(error));
      }
    });
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Helmet>
        <title>Orders Manager</title>
      </Helmet>
      <Dialog
        open={show}
        onClose={handleClose}
        fullScreen
        aria-labelledby="contained-modal-title-vcenter"
        PaperProps={{
          sx: {
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ddd",
            padding: "16px",
          }}
        >
          Order Detail
        </DialogTitle>
        <DialogContent sx={{ padding: "16px" }}>
          {selectedOrder && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Order ID: {selectedOrder.orderId}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Customer: {selectedOrder.user.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Email: {selectedOrder.user.email}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Order Date:{" "}
                {moment(selectedOrder.createAt).format("DD/MM/YYYY HH:mm:ss")}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Total Amount: {numeral(selectedOrder.total).format("0,")} VNĐ
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Shipping Address: {selectedOrder.address}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Order Status:{" "}
                {selectedOrder.status === 0
                  ? "Pending"
                  : selectedOrder.status === 1
                  ? "Delivery"
                  : selectedOrder.status === 2
                  ? "Completed"
                  : "Canceled"}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Products:
              </Typography>
              {selectedOrderDetail?.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    width="80px"
                    height="auto"
                    style={{ marginRight: "16px" }}
                  />
                  <div>
                    <List>
                      <ListItem>
                        <ListItemText primary={item.productName} />
                      </ListItem>
                      <ListItem>
                        <p>{numeral(item.price).format("0,")} VNĐ</p>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Quantity: ${item.quantity}`} />
                      </ListItem>
                    </List>
                  </div>
                </div>
              ))}
            </>
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
                    <Title>Orders</Title>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Order Id</TableCell>

                          <TableCell>User Name</TableCell>
                          <TableCell>Order Time</TableCell>
                          <TableCell>Total Amount (VND)</TableCell>
                          <TableCell>Order Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((order, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {page * rowsPerPage + index + 1}
                              </TableCell>
                              <TableCell>{order.orderId}</TableCell>
                              <TableCell>{order.user.name}</TableCell>

                              <TableCell>
                                {moment(order.createAt).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )}
                              </TableCell>
                              <TableCell>
                                {numeral(order.total).format("0,")}
                              </TableCell>
                              <TableCell>
                                {+order.status === 0
                                  ? "Pending"
                                  : order.status === 1
                                  ? "Delivery"
                                  : order.status === 2
                                  ? "Completed"
                                  : "Canceled"}
                              </TableCell>
                              <TableCell>
                                <Box
                                  display={"flex"}
                                  flexDirection={"column"}
                                  gap={1}
                                >
                                  <Button
                                    variant="contained"
                                    onClick={() => handleOrderDetail(order)}
                                    className="w-100 mb-2"
                                  >
                                    Detail
                                  </Button>

                                  <Select
                                    size="small"
                                    value={order.status}
                                    disabled={
                                      order.status === 3 || order.status === 2
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        +e.target.value,
                                        order.orderId
                                      )
                                    }
                                  >
                                    <MenuItem value={0}>Pending</MenuItem>
                                    <MenuItem value={1}>Delivery</MenuItem>
                                    <MenuItem value={2}>Completed</MenuItem>
                                    <MenuItem value={3}>Canceled</MenuItem>
                                  </Select>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={orders?.length || 0}
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
