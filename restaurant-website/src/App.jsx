import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import Order from "./pages/Order/Order.jsx";
import Reservations from "./pages/Reservations/Reservations.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;