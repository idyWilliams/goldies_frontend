import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectUser = (state: RootState) => state.user;

export const countSelector = createSelector(selectUser, (state) => state);
