import { useEffect, useState } from "react";

import { Container, Typography, Box, Button } from "@mui/material";

import axios from "axios";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import numeral from "numeral";
import HeaderComp from "../../../components/header/HeaderComp";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  active: boolean;
}
interface Order {
  orderId: number;
  userId: number;
  total: string;
  address: string;
  status: number;
  createAt: string;
}

interface OrderDetail {
  orderId: number;
  userId: number;
  totalAmount: string;
  shippingAddress: string;
  status: number;
  orderDate: string;
  orderdetailId: number;
  productId: number;
  productName: string;
  price: string;
  image: string;
  quantity: number;
  lastName: string;
  firstName: string;
}

function OrderHistoryPage() {
  const apiURL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState<Order[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
  const [show, setShow] = useState(false);
  const userStorageData = localStorage.getItem("user");
  const user: User = userStorageData
    ? JSON.parse(userStorageData)
    : { id: "", name: "", email: "", phone: "", role: "", active: false };

  const fetchData = async () => {
    if (user.id) {
      const response = await axios.get(`${apiURL}/order/user/${user.id}`);
      setData(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDetail = async (id: number) => {
    handleShow();
    const response = await axios.get(`${apiURL}/order-detail/${id}`);
    setOrderDetail(response.data);
  };
  return (
    <>
      <Helmet>
        <title>Lịch sử mua hàng</title>
      </Helmet>
      <HeaderComp />
      <Box className=" bg-slate-200" paddingY={3} marginTop={8}>
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Hình ảnh</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Giá sản phẩm</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail?.map((item: OrderDetail, i: number) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>
                        <img src={item.image} width={"100px"} />
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{numeral(item.price).format("0, ")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Container>
          <Typography variant="h5" marginTop={2}>
            LỊCH SỬ MUA HÀNG
          </Typography>
          <Box>
            {data?.map((e, i) => (
              <Box
                key={i}
                marginY={2}
                className="bg-white"
                padding={2}
                borderRadius={2}
              >
                <Typography>
                  <span className="font-semibold">Thời gian đặt hàng:</span>{" "}
                  {moment(e.createAt).format("DD-MM-YYYY HH:mm:ss")}.
                </Typography>
                <Typography>
                  {" "}
                  <span className="font-semibold">Địa chỉ giao hàng:</span>{" "}
                  {e.address}
                </Typography>
                <Typography>
                  <span className="font-semibold"> Tổng tiền:</span>{" "}
                  {numeral(e.total).format("0,")} VNĐ
                </Typography>
                <Typography>
                  <span className="font-semibold">Tình trạng:</span> Tình trạng:{" "}
                  {e.status === 0
                    ? "Đang xử lý"
                    : e.status === 1
                    ? "Đang giao hàng"
                    : e.status === 2
                    ? "Đã giao hàng"
                    : "Đã bị huỷ"}
                </Typography>
                <div className="mt-4">
                  <Button
                    variant="contained"
                    onClick={() => handleDetail(e.orderId)}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default OrderHistoryPage;
