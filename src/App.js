import logo from "./logo.svg";
import "./App.css";
import AllBids from "./component/AllBids";
import Navbar from "./component/Navbar";
import AddBidForm from "./component/AddBidForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/addbids" element={<AddBidForm />} />
        <Route path="/all-bids" element={<AllBids />} />
      </Routes>
    </Router>
  );
}

export default App;
