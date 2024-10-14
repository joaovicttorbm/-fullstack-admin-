import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const adminColumns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params) => formatPhoneNumber(params.value),
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.4,
  },
  {
    field: "occupation",
    headerName: "Occupation",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
  },
];

const formatPhoneNumber = (number) => {
  return number.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
}

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <AdminDataGrid data={data} isLoading={isLoading} theme={theme}/>
      </Box>
  );
};

const AdminDataGrid = ({data, isLoading, theme}) => {
  return (
    <Box
        mt="40px"
        height="75vh"
        sx={getGridStyles}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={adminColumns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
    </Box>
  )
}

const getGridStyles = (theme) => ({
  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.background.alt,
    color: theme.palette.secondary[100],
    borderBottom: "none",
  },
  "& .MuiDataGrid-virtualScroller": {
    backgroundColor: theme.palette.primary.light,
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.palette.background.alt,
    color: theme.palette.secondary[100],
    borderTop: "none",
  },
  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    color: `${theme.palette.secondary[200]} !important`,
  },
});

export default Admin;