import {
    GridColumnMenuContainer,
    GridColumnMenuHideItem, // Use this instead of HideGridColMenuItem
  } from "@mui/x-data-grid";
  
  const CustomColumnMenu = ({ hideMenu, currentColumn, open }) => {
    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}
      >
        <GridColumnMenuHideItem onClick={hideMenu} column={currentColumn} />
      </GridColumnMenuContainer>
    );
  };
  
  export default CustomColumnMenu;
  