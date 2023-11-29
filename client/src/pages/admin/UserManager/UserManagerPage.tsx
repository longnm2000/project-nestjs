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

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  active: number;
}
interface Admin {
  email: string;
  id: string;
  name: string;
}

function UsersManagerPage() {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  // const adminToken = localStorage.getItem("access_token") || "";
  const adminStorageData = localStorage.getItem("admin");
  const admin: Admin = adminStorageData
    ? JSON.parse(adminStorageData)
    : { id: "", name: "", email: "" };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // const handleExit = () => {  //     localStorage.removeItem("admin_token");
  //     navigate("/admin/login");
  // };

  const [users, setUsers] = useState<User[]>([]);
  const fetchData = async () => {
    await axios
      .get(`${apiURL}/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleChangeStatus = async (user: User) => {
    await axios
      .patch(`${apiURL}/users/${user.id}`, {
        active: +user.active === 1 ? false : true,
      })
      .then((res) => {
        fetchData();
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const handlePostDetail = (user: User) => {
    setSelectedUser(user);
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
        <title>Users Manager</title>
      </Helmet>
      <>
        <Dialog open={show} onClose={handleClose}>
          <DialogTitle>User Detail</DialogTitle>
          <DialogContent>
            {selectedUser ? (
              <div>
                <DialogContentText>
                  <b>ID:</b> {selectedUser.id}
                </DialogContentText>
                <DialogContentText>
                  <b> Name:</b> {selectedUser.name}
                </DialogContentText>
                <DialogContentText>
                  <b>Email:</b> {selectedUser.email}
                </DialogContentText>
                <DialogContentText>
                  <b>Phone Number:</b> {selectedUser.phone}
                </DialogContentText>
              </div>
            ) : (
              <></>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
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
                    <Title>Users</Title>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone Number</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users
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
                              <TableCell>{e.email}</TableCell>
                              <TableCell>{e.phone}</TableCell>
                              <TableCell>
                                {+e.active === 1 ? (
                                  <Typography
                                    fontWeight={"bold"}
                                    color={"green"}
                                  >
                                    Accept
                                  </Typography>
                                ) : (
                                  <Typography
                                    fontWeight={"bold"}
                                    color={"error"}
                                  >
                                    Ignore
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                <Box
                                  display={"flex"}
                                  flexDirection={"column"}
                                  gap={2}
                                >
                                  <Button
                                    variant="contained"
                                    onClick={() => handlePostDetail(e)}
                                    color="primary"
                                  >
                                    Detail
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={() => handleChangeStatus(e)}
                                    color="error"
                                  >
                                    Change Status
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
                      count={users?.length || 0}
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

export default UsersManagerPage;
