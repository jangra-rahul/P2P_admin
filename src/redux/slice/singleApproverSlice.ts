// src/redux/slice/singleApproverSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const singleApproverSlice = createSlice({
  name: 'singleApprover',
  initialState,
  reducers: {
    getSingleApproverRequest: (state, _action: PayloadAction<{ id: string }>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    getSingleApproverSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload?.data || null;
    },
    getSingleApproverFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSingleApprover: (state) => {
      return initialState;
    },
  },
});

export const {
  getSingleApproverRequest,
  getSingleApproverSuccess,
  getSingleApproverFailure,
  resetSingleApprover,
} = singleApproverSlice.actions;

export default singleApproverSlice.reducer;
