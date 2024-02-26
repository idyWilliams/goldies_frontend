import { createReducer } from "@reduxjs/toolkit";
import { addOption } from "./actions";

type userState = {
  accessToken?: string;
  createdAt?: string;
  email: string;
  firstName: string;
  isAdmin: Boolean;
  lastName: string;
  updatedAt?: string;
  __v?: number;
  _id: string;
};

const initialState: userState = {
  email: "",
  firstName: "",
  isAdmin: false,
  lastName: "",
  _id: "",
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(addOption, (state, action) => {
    return action.payload;
  });
});
