import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "./components/Headers/adminHeader";
import Header from "./components/Headers/header";
import AddRestLocations from "./pages/Administration/addRestLocations";
import ShowRestLocations from "./pages/Administration/showRestLocations";
import ViewLocation from "./pages/Administration/viewLocation";
import SignIn from "./pages/Authentication/signin";
import SignUp from "./pages/Authentication/signup";
import CreateBlogPost from "./pages/Blog/createBlog";
import ViewAllShopBlogs from "./pages/Blog/viewBlogs";
import AddBaggageEmployee from "./pages/Employees/AddBaggageEmployee";
import AddEmployee from "./pages/Employees/AddEmployee";
import AddShop from "./pages/Employees/AddShop";
import AddLuggage from "./pages/Luggage/AddLuggage";
import ViewLuggage from "./pages/Luggage/ViewLuggage";
import ViewRestLocation from "./pages/Rest-Customers/viewRestLocation";
import ViewRestLocations from "./pages/Rest-Customers/viewRestLocations";
import { ShopHome } from "./pages/Shop/ShopHome";
import { AdminHome } from "./pages/home/admin-home";
import BaggageEmployeeHome from "./pages/home/baggage-employee-home";
import Home from "./pages/home/home";

import AddParkingSlot from "./pages/Administration/addParkingSlots";
import AvailableParkingSlots from "./pages/Administration/bookParking";
import ViewParkingSlots from "./pages/Administration/viewParkingSlots";

function App() {
  //Use Selector to getv logged role
  const isLoggedrole = useSelector((state) => state.auth.User.role);

  return (
    <BrowserRouter>
      {isLoggedrole === "admin" && <AdminHeader />}
      {isLoggedrole === "customer" && <Header />}
      {isLoggedrole === "shop" && <shopHeader />}
      {isLoggedrole !== "customer" && isLoggedrole !== "admin" && <Header />}
      <Routes>
        {isLoggedrole === "admin" && (
          <>
            <Route path="/adminhome" element={<AdminHome />} />

            <Route path="/addEmployee" element={<AddEmployee />} />
          </>
        )}


        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/addShop" element={<AddShop />} />
        <Route path="/addBaggageemployee" element={<AddBaggageEmployee />} />
        {isLoggedrole === "customer" && <Route path="/" element={<Home />} />}
        {isLoggedrole === "shop" && <Route path="/shopHome" element={<ShopHome />} />}
        {isLoggedrole === "baggageemployee" && <Route path="/baggageHome" element={<BaggageEmployeeHome />} />}
        <Route path="/showAllLocations" element={<ShowRestLocations />} />
        <Route path="/addluggage" element={<AddLuggage />} />
        <Route path="/viewLuggage" element={<ViewLuggage />} />
        <Route path="/shopHome" element={<ShopHome />} />
        <Route
          path="/shopper/showAllLocations"
          element={<ViewRestLocations />}
        />
        <Route path="/admin/addRestLocation" element={<AddRestLocations />} />
        <Route path="/admin/addParkingSlot" element={<AddParkingSlot />} />
        <Route path="/admin/viewParkingSlots" element={<ViewParkingSlots />} />
        <Route path="/admin/availableParkingSlots" element={<AvailableParkingSlots />} />
        <Route path="/RestLocation/:id" element={<ViewLocation />} />
        <Route
          path="/Shopper/RestLocation/:id"
          element={<ViewRestLocation />}
        />
        <Route path="/Shopper/RestLocation/:id" element={<ViewRestLocation />} />

        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/createBlog" element={<CreateBlogPost />} />
        <Route path="/allShopBlogs" element={<ViewAllShopBlogs />} />

        {/* <Route path="*" element={<h1><center>Page Not Found</center></h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
