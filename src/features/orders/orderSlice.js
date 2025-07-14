import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: {},
  timeFramePresentWeekOrders: [],
  timeFramePastWeekOrders: [],
  shippingAddress: "",
  orderCustomerPage: 1,
  orderAdminPage: 1
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, { payload }) => {
      state.orders = payload || [];
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setOrderAdminPage: (state, { payload }) => {
      state.orderAdminPage = payload
    },
    setOrderCustomerPage: (state, { payload }) => {
      state.orderCustomerPage = payload
    },
    setTimeFramePresentWeekOrders: (state, { payload }) => {
      state.timeFramePresentWeekOrders = payload || []
    },
    setTimeFramePastWeekOrders: (state, { payload }) => {
      state.timeFramePastWeekOrders = payload || []
    },
  },
});

const { reducer, actions } = orderSlice;

export const { setOrders, setShippingAddress, setOrderAdminPage, setOrderCustomerPage, setTimeFramePresentWeekOrders, setTimeFramePastWeekOrders } = actions;
export default reducer;