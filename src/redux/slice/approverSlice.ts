import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  success: false,
  approvers: [],
  newApproverId: null,
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
    addApproverSuccess: (state,action) => {
      state.loading = false;
      state.success = true;
      state.newApproverId = action.payload?.data?._id || null;
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

     changeApproverStatusRequest: (
  state,
  _action: PayloadAction<{ id: string; status: string }>
) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    changeApproverStatusSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    changeApproverStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  editApproverRequest: (state, _action: PayloadAction<{ id: string; data: any }>) => {
  state.loading = true;
  state.error = null;
  state.success = false;
}, 
editApproverSuccess: (state) => {
  state.loading = false;
  state.success = true;
},
editApproverFailure: (state, action: PayloadAction<string>) => {
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
    changeApproverStatusRequest,
  changeApproverStatusSuccess,
  changeApproverStatusFailure,
   editApproverRequest,
  editApproverSuccess,
  editApproverFailure,
} = ApproverSlice.actions;

export default ApproverSlice.reducer;
