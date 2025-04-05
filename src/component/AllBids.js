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
    </div>
  );
};

export default AllBids;
