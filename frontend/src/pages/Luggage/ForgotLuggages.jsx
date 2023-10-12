import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RequestTodayGoodsDelivery, getAllForgottenLuggages, getAllForgottenLuggagesbyUserIDandShopID, getAllLuggages, getAllLuggagesbyUserIDandShopID } from "../../Api/services/LuggageService";
import Calendar from "react-calendar";
import { useQuery } from "react-query";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Modal, Table } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotLuggages() {
  const customeremail = useSelector((state) => state.auth.User.email);
  const name = useSelector((state) => state.auth.User.name);
  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getAllForgottenLuggages(customeremail),
  });
  const [page, setPage] = useState(0);
  const [date, setDate] = useState(new Date());
  const [deliverymodal, setShowDeliveryModal] = useState(false);
  const handleDeliveryModalOpen = () => setShowDeliveryModal(true);
  const handleDeliveryModalClose = () => setShowDeliveryModal(false);
  const [customerTokenModal, setShowCustomerTokenModal] = useState(false);
  const handleCustomerTokenModalOpen = () => setShowCustomerTokenModal(true);
  const handleCustomerTokenModalClose = () => setShowCustomerTokenModal(false);
  const [shopLuggageModal, setShopLuggageModal] = useState(false);
  const [shopId, setShopId] = useState("");
  const [shopLuggageData, setShopLuggageData] = useState([]);
  const handleShopLuggageModalOpen = () => setShopLuggageModal(true);
  const handleShopLuggageModalClose = () => setShopLuggageModal(false);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState(dayjs());
  const { User } = useSelector((state) => state.auth);

  const rowsPerPage = 3;


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // // Slice the data based on the current page and rows per page
  // const slicedData = shopLuggageData?.luggages?.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );
  // Custom function to determine if a date is a weekend (Saturday or Sunday)
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // Custom function to determine if a date is the current date
  const isCurrentDate = (dateToCheck) => {
    const currentDate = new Date();
    return (
      dateToCheck.getDate() === currentDate.getDate() &&
      dateToCheck.getMonth() === currentDate.getMonth() &&
      dateToCheck.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleTimeChange = (newTime) => {
    if (isTimeValid(newTime)) {
      setTime(newTime);
    }
  };

  const isTimeValid = (selectedTime) => {
    const minTime = dayjs('8:00 AM', 'h:mm A');
    const maxTime = dayjs('10:00 PM', 'h:mm A');
    return (
      selectedTime.isAfter(minTime) && selectedTime.isBefore(maxTime)
    );
  };

  // Custom CSS class names for different date types
  const tileClassName = ({ date }) => {
    if (isWeekend(date)) {
      return "weekend";
    } else if (isCurrentDate(date)) {
      return "current-date";
    }
    return "";
  };

  //Create a function to call the modal to show each goods and details individually
  const handleButtonClick = async (shopId) => {
    setShopId(shopId);
    try {
      console.log("shopId", shopId)
      console.log("userId", User._id)
      await getAllForgottenLuggagesbyUserIDandShopID(shopId, User._id)
        .then((res) => {
          console.log("res", res);
          setShopLuggageData(res);
          handleShopLuggageModalOpen();
          toast.success("Luggage Data Fetched Successfully");
        }
        );


    } catch (err) {
      console.log("err", err);
      toast.error("Error Fetching Luggage Data");
    }

  };

  let shopIdToPass = null;
  const navigate = useNavigate();
  const columns = [
    {
      header: "ShopName",
      accessorKey: "ShopName",
    },
    {
      header: "Status",
      accessorKey: "Status",
    },
    {
      header: "View",
      accessorKey: "ViewButton",
      cellRenderer: (rowData) => rowData.ViewButton,
    }
  ];

  function CircularWithValueLabel() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 10
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);

    return <CircularProgress value={progress} />;
  }

  let mappedData = [];

  if (data !== undefined) {
    mappedData = data?.uniqueShops?.map((shop) => {
      const row = {
        ShopName: shop.ShopName,
        Status: "",
      };

      // Add a button to the row data
      row.ViewButton = (
        <Button
          sx={{
            mt: 2,
            borderRadius: '18px', // Make this consistent with other borderRadius values
            // width: '20vw',
            // marginLeft: '3%',
            color: 'white',
            // marginTop: '2.7%',
            // height: '4vh',
            fontSize: '1.0rem',
            backgroundColor: '#1769aa', // Move backgroundColor here
          }}
          onClick={() => handleButtonClick(shop.ShopID)}
        >
          View
        </Button>
        // <button onClick={() => handleButtonClick(shop.ShopID)}>View</button>
      );

      if (data.shopcollected) {
        console.log("isComplete", data.shopcollected);
        row.Status = "Collected From ShopShop 🛍️";
      } else if (data.securitycollected) {
        row.Status = "Handed Over To Security 🛡️";
      } else if (data.customercollected) {
        row.Status = "Delivery Confirmed 🚚";
      } else {
        row.Status = "Pending";
      }

      return row;
    }) || [];
  }

  function handleDownload(downloadLink) {
    window.location.href = downloadLink;
  }
console.log("location", location)
console.log("time", time)
  const handleDeliverySubmit = async () => {
    try {
      console.log("handleDeliverySubmit called");
    const res =   await RequestTodayGoodsDelivery(
        User.id,
        location,
        time,
      ).then((res) => {
      toast.success("Your Request Has Is Being Processed");
      handleDeliveryModalClose();
      });
    } catch (err) {
      toast.error("Error Sending Request");
    }
  }
  return (
    <div
    >
      {isLoading ? (
        <CircularWithValueLabel />
      ) : (
        <Box
          sx={{
            borderRadius: "40px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            width: "94%",
            height: "80vh",
            padding: "10px",
            marginLeft: "3vw",
            marginTop: "5vh",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Forgot Your Baggages💼?
          </Typography>
          <Button
            sx={{ marginRight: "15%", border: "1px solid black", borderRadius: "8px", marginTop: "2%", marginLeft: "2%" }}
            onClick={() => navigate("/viewLuggage")}
          >
            <ArrowBackIcon style={{ marginLeft: "5px" }} />
            Back to Home
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "3%",
                marginLeft: "2%",
              }}
            >
              {data ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "20vw",
                  }}
                >
                  Total Baggages:{" "}
                  <Box
                    sx={{
                      borderRadius: "40px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      width: "2vw",
                      justifyContent: "center",
                      justifyItems: "center",
                      textAlign: "center",
                      marginLeft: "6%",
                    }}
                  >
                    {data.totalBags}
                  </Box>
                </div>
              ) : (
                "No baggage available"
              )}
            </Typography>
            <Button
              sx={{
                mt: 2,
                borderRadius: '18px', // Make this consistent with other borderRadius values
                width: '20vw',
                marginLeft: '1%',
                color: 'white',
                marginTop: '2.7%',
                height: '4vh',
                fontSize: '1.0rem',
                backgroundColor: '#1769aa', // Move backgroundColor here
              }}
              onClick={handleCustomerTokenModalOpen}
            >
              View Your Customer ID
            </Button>
            <Button
              sx={{
                mt: 2,
                borderRadius: '18px', // Make this consistent with other borderRadius values
                width: '20vw',
                marginLeft: '3%',
                color: 'white',
                marginTop: '2.7%',
                height: '4vh',
                fontSize: '1.0rem',
                backgroundColor: '#1769aa', // Move backgroundColor here
              }}
              onClick={handleDeliveryModalOpen}
            >
              Deliver Baggages
            </Button>
          </div>
          <div
            style={{
              marginTop: "8%",
            }}
          >

            <MaterialReactTable columns={columns} data={mappedData} />
          </div>
        </Box>
      )}

      {/*Start Of The Modal*/}
      <Modal
        show={deliverymodal}
        onHide={handleDeliveryModalClose}
        style={{ marginTop: "8%" }}
      >
        <Modal.Header closeButton>Baggage Delivery🛍️</Modal.Header>
        <Modal.Body>
          <InputLabel htmlFor="outlined-adornment-old-password">
            Select Exiting Point
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Delivery Location"
          >
            <MenuItem value={1}>Exit 1</MenuItem>
            <MenuItem value={2}>Exit 2</MenuItem>
            <MenuItem value={3}>Exit 3</MenuItem>
          </Select>
          <InputLabel htmlFor="outlined-adornment-old-password"
            style={{
              marginTop: "5%",
              marginLeft: "5%"
            }}
          >
            Select Delivery Time
          </InputLabel>
      
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                value={time}
                onChange={handleTimeChange}
                renderInput={(params) => <TextField {...params} />}
                ampm={true}
                openTo="hours"
                views={['hours', 'minutes', 'ampm']}
                mask="__:__ _M"
                inputFormat="hh:mm A"
              />
            </LocalizationProvider>
            
   
        </Modal.Body>
        <Modal.Footer>
        <Button
              sx={{
                marginLeft: "15%",
                borderRadius: "40px",
                backgroundColor: "#0276aa",
                color: "white",
                height: "6vh"
              }}
              onClick={handleDeliverySubmit}
            >
              Deliver Now
            </Button>
        </Modal.Footer>
      </Modal>
      {/*Modal For Customer Token */}
      <Modal
        show={customerTokenModal}
        onHide={handleCustomerTokenModalClose}
        style={{ marginTop: "8%" }}
      >
        <Modal.Header closeButton>Your Customer ID </Modal.Header>

        <Modal.Body style={{ textAlign: 'center' }}>
          {data
            ? `Your ID: ${data.customerid || "N/A"}`
            : "No ID to be displayed"}

        </Modal.Body>
      </Modal>
      {/*Modal To View Luggages in List View  */}
      <Modal
        show={shopLuggageModal}
        onHide={handleShopLuggageModalClose}
        style={{ marginTop: "8%" }}
      >
        <Modal.Header closeButton>View Your Luggages🛍️</Modal.Header>
        <Modal.Body>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Shop</TableCell>
                  <TableCell align="left">Bage No.</TableCell>
                  <TableCell align="left">Bill</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shopLuggageData.luggages && shopLuggageData.luggages.length > 0 ? (
                  shopLuggageData.luggages.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.ShopName}
                      </TableCell>
                      <TableCell align="left">{row.BagNo}</TableCell>
                      <TableCell align="left"><Button onClick={() => handleDownload(row.Bill)}>Download</Button></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p>No luggages to display</p>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={shopLuggageData?.luggages?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
            />
          </TableContainer>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}


export default ForgotLuggages