import { handleUserNotFound } from "../exceptions/handleUserNotFound.js";
import User from "../models/User.js";


// GET: Retrieve user by ID
export const getUser = async (req, res) => {
    try {
      const { id } = req.params;

      if(!User.isValidId(id)) {
        return res.status(400).json({ menssage: "Invalid user ID format." });
      }

      const user = await User.findById(id);
      if (!user) {
        return handleUserNotFound(res);
    }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error retrieving user : ", error);
      res.status(500).json({ message: "An error ocurrede while to retrieving the user " });  
    }
  };