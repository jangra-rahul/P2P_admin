import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  success: false,
  approvers: [],
};

const ApproverSlice = createSlice({
  name: 'approvers',
  initialState,
  reducers: {
    addApproverRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    addApproverSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    addApproverFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetAddApprover: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    getApproverRequest: (
      state,
      _action: PayloadAction<{ page: number; limit: number; search: string }>
    ) => {
      state.loading = true;
    },
    getApproverSuccess: (state, action: PayloadAction<{ data: any[] }>) => {
      state.loading = false;
      state.approvers = action.payload.data;
    },
    getApproverFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addApproverRequest,
  addApproverSuccess,
  addApproverFailure,
  resetAddApprover,
  getApproverRequest,
  getApproverSuccess,
  getApproverFailure,
} = ApproverSlice.actions;

export default ApproverSlice.reducer;
