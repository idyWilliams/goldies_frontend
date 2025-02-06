import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { userReducer } from "./features/user";

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

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
