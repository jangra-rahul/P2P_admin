import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AssignMerchantState {
  loading: boolean;
  error: any;
  success: boolean;
  assignedMerchantId: string | null;
}

interface AssignMerchantPayload {
  approverId: any;
  merchantIds: any[];
}

const initialState: AssignMerchantState = {
  loading: false,
  error: null,
  success: false,
  assignedMerchantId: null,
};

const assignMerchantSlice = createSlice({
  name: 'assignMerchant',
  initialState,
  reducers: {
    assignMerchantRequest: (state, _action: PayloadAction<AssignMerchantPayload>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    assignMerchantSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.assignedMerchantId = action.payload?.data?._id || null;
    },
    assignMerchantFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetAssignMerchant: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.assignedMerchantId = null;
    },
  },
});

export const {
  assignMerchantRequest,
  assignMerchantSuccess,
  assignMerchantFailure,
  resetAssignMerchant,
} = assignMerchantSlice.actions;

export default assignMerchantSlice.reducer;
