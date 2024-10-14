import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

// Definindo os itens de navegação
const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Client Facing", icon: null },
  { text: "Products", icon: <ShoppingCartOutlined /> },
  { text: "Customers", icon: <Groups2Outlined /> },
  { text: "Transactions", icon: <ReceiptLongOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Overview", icon: <PointOfSaleOutlined /> },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  { text: "Breakdown", icon: <PieChartOutlined /> },
  { text: "Management", icon: null },
  { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { text: "Performance", icon: <TrendingUpOutlined /> },
];

// Componente Sidebar
const Sidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  // Atualiza o item ativo com base na URL
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  // Função para gerenciar a navegação
  const handleNavigation = (text) => {
    const lcText = text.toLowerCase();
    navigate(`/${lcText}`);
    setActive(lcText);
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Header 
              isNonMobile={isNonMobile} 
              setIsSidebarOpen={setIsSidebarOpen} 
            />

            <List>
              {navItems.map(({ text, icon }) => (
                <NavItem 
                  key={text} 
                  text={text} 
                  icon={icon} 
                  isActive={active === text.toLowerCase()} 
                  onClick={handleNavigation} 
                />
              ))}
            </List>
          </Box>

          <ProfileSection user={user} theme={theme} />
        </Drawer>
      )}
    </Box>
  );
};

// Componente Header
const Header = ({ isNonMobile, setIsSidebarOpen }) => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2rem 2rem 3rem">
      <FlexBetween color={theme.palette.secondary.main}>
        <Typography variant="h4" fontWeight="bold">
          JM-ECOMVISION
        </Typography>
        {!isNonMobile && (
          <IconButton onClick={() => setIsSidebarOpen(false)}>
            <ChevronLeft />
          </IconButton>
        )}
      </FlexBetween>
    </Box>
  );
};

// Componente NavItem
const NavItem = ({ text, icon, isActive, onClick }) => {
  const theme = useTheme();
  const lcText = text.toLowerCase();

  if (!icon) {
    return (
      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
        {text}
      </Typography>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => onClick(text)}
        sx={{
          backgroundColor: isActive ? theme.palette.secondary[300] : "transparent",
          color: isActive ? theme.palette.primary[600] : theme.palette.secondary[100],
        }}
      >
        <ListItemIcon
          sx={{
            ml: "2rem",
            color: isActive ? theme.palette.primary[600] : theme.palette.secondary[200],
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
        {isActive && <ChevronRightOutlined sx={{ ml: "auto" }} />}
      </ListItemButton>
    </ListItem>
  );
};

// Componente ProfileSection
const ProfileSection = ({ user, theme }) => (
  <Box position="absolute" bottom="2rem">
    <Divider />
    {/* Componente de perfil - Descomente se necessário */}
    {/* <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
      <Box
        component="img"
        alt="profile"
        src={profileImage}
        height="40px"
        width="40px"
        borderRadius="50%"
        sx={{ objectFit: "cover" }}
      />
      <Box textAlign="left">
        {user && (
          <>
            <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>
              {user.name}
            </Typography>
            <Typography fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
              {user.occupation}
            </Typography>
          </>
        )}
      </Box>
      <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} />
    </FlexBetween> */}
  </Box>
);

export default Sidebar;
