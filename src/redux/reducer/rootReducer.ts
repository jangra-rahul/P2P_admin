import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../slice/userSlice";
import merchantReducer from "../slice/merchantSlice";
import approverReducer from "../slice/approverSlice";
import assignMerchantsReducer from "../slice/assignMerchantSlice";
import singleApproverReducer from "../slice/singleApproverSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  merchant:merchantReducer,
  approver:approverReducer,
  assignMerchant:assignMerchantsReducer,
  singleApprover: singleApproverReducer,
});

export default rootReducer;
