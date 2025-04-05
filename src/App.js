import logo from "./logo.svg";
import "./App.css";
import AllBids from "./component/AllBids";
import AddBidForm from "./component/AddBidForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddBidForm />} />
        <Route path="/all-bids" element={<AllBids />} />
      </Routes>
    </Router>
  );
}

export default App;
