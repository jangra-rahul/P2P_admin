import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../slice/userSlice";
import merchantReducer from "../slice/merchantSlice";
import approverReducer from "../slice/approverSlice";
import assignMerchantsReducer from "../slice/assignMerchantSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  merchant:merchantReducer,
  approver:approverReducer,
  assignMerchant:assignMerchantsReducer,
});

export default rootReducer;
