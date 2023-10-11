import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducer/Reducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
