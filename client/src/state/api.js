import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TAGS = {
  USER: "User",
  PRODUCTS: "Products",
  CUSTOMERS: "Customers",
  TRANSACTIONS: "Transactions",
  GEOGRAPHY: "Geography",
  SALES: "Sales",
  ADMINS: "Admins",
};

const createQuery = (endpoint, method = "GET", params = {}) => ({
  query: (arg) => ({
    url: endpoint,
    method,
    ...(params && { params: {...params, ...arg} } )
  }),
  providesTags: [endpoint.replace("/", "").toUpperCase()]
})


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: Object.values(TAGS),
    endpoints: (build) => ({
        getUser: build.query(createQuery(`/general/user/:id`)),
        getProducts: build.query(createQuery("client/products")),
        getCustomers: build.query(createQuery("client/customers")),
        getTransactions: build.query(createQuery("client/transactions", "GET", {page: true, pageSize: true, sort: true, search: true} )),
        getGeography: build.query(createQuery("client/geography")),
        getSales: build.query(createQuery("sales/sales")),
        getAdmins: build.query(createQuery("management/admins")),
    })
});
    
export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery
  } = api;