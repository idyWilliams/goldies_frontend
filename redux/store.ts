import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { userReducer } from "./features/user";
export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;



