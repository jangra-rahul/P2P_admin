import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../slice/userSlice";
import merchantReducer from "../slice/merchantSlice";
import approverReducer from "../slice/approverSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  merchant:merchantReducer,
  approver:approverReducer,
});

export default rootReducer;
