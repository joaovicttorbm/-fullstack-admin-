import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();

    if (!overallStats || overallStats.length === 0) {
      return res.status(404).json({ menssage: "No sales data found"});
    }

    res.status(200).json(overallStats[0]);
  } catch (error) {
    console.error("Error feching sales data: ", error);
    res.status(404).json({ message: "An error occurred wilw feching sales data." });
  }
};