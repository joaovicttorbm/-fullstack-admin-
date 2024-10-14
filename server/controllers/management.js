import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { handleUserNotFound } from "../exceptions/handleUserNotFound.js";


// GET: Retrieve all admins, excluding passwords
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Utility function to fetch sales transactions by IDs
const fetchSalesTransactions = async (salesIds) => {
  const salesPromises = salesIds.map((id) => Transaction.findById(id));
  const transactions = await Promise.all(salesPromises);

  return transactions.filter((transaction) => transaction !== null);
};

// GET: Retrieve user performance by ID
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    if(! mongoose.Types.ObjectId.isValidId(id)) {
      return res.status(400).json({ menssage: "Invalid user ID format." });
    }

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId.createFromTime(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    if (!userWithStats.length) {
      return handleUserNotFound(res);
    }

    const filteredSaleTransactions = await fetchSalesTransactions(
      userWithStats[0].affiliateStats.affiliateSales
    );

    res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};
