import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

// Utility function to attach stats to products
const attachStatsToProducts = async (products) => {
  return Promise.all(
    products.map(async (product) => {
      const stats = await ProductStat.find({ productId: product._id });
      return { ...product._doc, stats };
    })
  );
};

// GET: Products with their stats
export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      const productsWithStats = await attachStatsToProducts(products)

      res.status(200).json(productsWithStats);
    } catch (error) {
      console.error("Error feching products: ", error);
      res.status(404).json({ message: "Failed to feching products" });
    }
};

// GET: Customers with role 'user', excluding password
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error feching customers: ", error);
    res.status(500).json({ message: "Failed to feching customers" });
  }
};

// Utility function to format sorting criteria
const generateSort = (sort) => {
  const { field, sort: sortOrder } = JSON.parse(sort);
  return { [field]: sortOrder === "asc" ? 1 : -1 };
}

// GET: Transactions with pagination, sorting, and search
export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    const sortFormatted = sort ? generateSort(sort) : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize);
      
    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });
  } catch (error) {
    console.error("Error feching transactions: ", error);
    res.status(500).json({ message: "Failed to feching transactions" });
  }
};

// Utility function to map users' locations
const mappedLocations = (users) => {
  const locationMap = users.reduce((acc, { country }) => {
    const countryISO3 = getCountryIso3(country);
    acc[countryISO3] = (acc[countryISO3] || 0 ) + 1;
    return acc;
  }, {});

  return Object.entries(locationMap).map(
    ([country, count]) => ({ 
      id: country, 
      value: count 
    })
  );
};

// GET: User locations aggregated by country (ISO3)
export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const formattedLocations = mappedLocations(users);

    res.status(200).json(formattedLocations);
  } catch (error) {
    console.error("Error feching geography data: ", error);
    res.status(500).json({ message: "Failed to feching geography" });  
  }
};

