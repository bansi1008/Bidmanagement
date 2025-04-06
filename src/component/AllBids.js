import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import Navbar from "./Navbar";

const AllBids = () => {
  const [bids, setBids] = useState([]);
  const [editingBid, setEditingBid] = useState(null);
  const [editFormData, setEditFormData] = useState({
    bidAmount: "",
    projectURL: "",
  });

  const handleDelete = (bidId) => {
    console.log("Bid ID to delete:", bidId);
    axios
      .delete(`http://localhost:4100/api/v1/getBids/${bidId}`)
      .then((res) => {
        console.log("Bid deleted:", res.data);
        setBids((prev) => prev.filter((bid) => bid._id !== bidId));
      })
      .catch((err) => {
        console.error("Error deleting bid", err);
      });
  };

  const handleEditClick = (bid) => {
    setEditingBid(bid._id); // Set the ID of the bid being edited
    setEditFormData({
      bidAmount: bid.bidAmount,
      projectURL: bid.projectURL,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (bidId) => {
    // Update the bid
    axios
      .patch(`http://localhost:4100/api/v1/getBids/${bidId}`, editFormData)
      .then((res) => {
        console.log("Bid updated:", res.data);
        setBids((prev) =>
          prev.map((bid) => (bid._id === bidId ? res.data : bid))
        );
        setEditingBid(null); // Reset the editing state
      })
      .catch((err) => {
        console.error("Error updating bid", err);
      });
  };

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get("/getBids");
        setBids(res.data);
      } catch (err) {
        console.error("Error fetching bids", err);
      }
    };
    fetchBids();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1>Bid Management System</h1>
        <h2>All Bids</h2>
        <ul className="list-group">
          {bids.map((bid) => (
            <li key={bid._id} className="list-group-item">
              {editingBid === bid._id ? (
                <div>
                  <input
                    type="number"
                    name="bidAmount"
                    value={editFormData.bidAmount}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name="projectURL"
                    value={editFormData.projectURL}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                  <button
                    className="btn btn-success btn-sm float-end"
                    onClick={() => handleUpdate(bid._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm float-end me-2"
                    onClick={() => setEditingBid(null)} // Cancel editing
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  {bid.bidderId} - ${bid.bidAmount} - {bid.projectURL}{" "}
                  <button
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => handleDelete(bid._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-sm float-end me-2"
                    onClick={() => handleEditClick(bid)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllBids;
