import React, { useEffect, useState } from "react";
import axios from "../axios.js";

const AllBids = () => {
  const [bids, setBids] = useState([]);

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
  const totalBids = bids.length;
  const totalBidAmount = bids.reduce((acc, bid) => acc + bid.bidAmount, 0);

  return (
    <div>
      <h2>All Bids</h2>
      <ul>
        {bids.map((bid) => (
          <li key={bid._id}>
            {bid.bidderId} - ${bid.bidAmount} - {bid.projectURL}
          </li>
        ))}
      </ul>
      <h3>Total Bids: {totalBids}</h3>
      <h3>Total Bid Amount: ${totalBidAmount}</h3>
    </div>
  );
};

export default AllBids;
