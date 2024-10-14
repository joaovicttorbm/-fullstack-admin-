import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const {palette} = useTheme();
  const secondary = palette.secondary;
  return (
    <Box>
      <Typography
        variant="h2"
        color={secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;