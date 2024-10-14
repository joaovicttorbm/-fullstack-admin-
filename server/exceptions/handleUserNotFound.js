export const handleUserNotFound = (res) => {
    res.status(404).json({ message: "User not found" });
  };