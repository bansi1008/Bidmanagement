import React, { useState } from "react";
import axios from "axios";

const AddBidForm = () => {
  const [formData, setFormData] = useState({
    bidAmount: "",
    bidderId: "",
    spentConnections: "",
    projectURL: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      bidAmount: Number(formData.bidAmount),
      bidderId: Number(formData.bidderId),
      spentConnections: Number(formData.spentConnections),
      projectURL: formData.projectURL,
      message: formData.message,
    };

    try {
      const res = await axios.post(
        "http://localhost:4100/api/v1/getBids",
        payload
      );
      console.log("Bid added:", res.data);
      alert("Bid added successfully!");

      setFormData({
        bidAmount: "",
        bidderId: "",
        spentConnections: "",
        projectURL: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting bid", error);
      alert("Error submitting bid. Please try again." + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Bid</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="bidAmount" className="form-label">
            Bid Amount
          </label>
          <input
            type="number"
            name="bidAmount"
            id="bidAmount"
            className="form-control"
            placeholder="Enter Bid Amount"
            value={formData.bidAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bidderId" className="form-label">
            Bidder ID
          </label>
          <input
            type="number"
            name="bidderId"
            id="bidderId"
            className="form-control"
            placeholder="Enter Bidder ID"
            value={formData.bidderId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="spentConnections" className="form-label">
            Spent Connections
          </label>
          <input
            type="number"
            name="spentConnections"
            id="spentConnections"
            className="form-control"
            placeholder="Enter Spent Connections"
            value={formData.spentConnections}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="projectURL" className="form-label">
            Project URL
          </label>
          <input
            type="text"
            name="projectURL"
            id="projectURL"
            className="form-control"
            placeholder="Enter Project URL"
            value={formData.projectURL}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="form-control"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Bid
        </button>
      </form>
    </div>
  );
};

export default AddBidForm;
