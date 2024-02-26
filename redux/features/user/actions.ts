import { createAction } from "@reduxjs/toolkit";

export const addOption = createAction(
  "ADD DETAILS",
  function prepare(
    email: string,
    firstName: string,
    isAdmin: Boolean,
    lastName: string,
    _id: string
  ) {
    return {
      payload: {
        email,
        firstName,
        isAdmin,
        lastName,
        _id,
      },
    };
  }
);
