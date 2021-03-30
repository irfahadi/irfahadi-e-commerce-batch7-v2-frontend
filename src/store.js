import { configureStore } from "@reduxjs/toolkit";
import advReducer from "./features/adv/advSlices";

export default configureStore({
  reducer: {
      adv : advReducer
  },
});