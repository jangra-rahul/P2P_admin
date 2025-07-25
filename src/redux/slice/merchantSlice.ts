import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Merchant {
  // define your merchant properties here
  id: string;
  name: string;
}

interface MerchantState {
  loading: boolean;
  error: string | null;
  success: boolean;
  merchants: Merchant[];
}


const initialState: MerchantState = {
  loading: false,
  error: null,
  success: false,
  merchants: [],
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    addMerchantRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    addMerchantSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    addMerchantFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetAddMerchant: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    getMerchantsRequest: (state, _action: PayloadAction<{ page: number; limit: number; search: string }>) => {
      state.loading = true;
    },
    getMerchantsSuccess: (state, action: PayloadAction<{ data: Merchant[] }>) => {
      state.loading = false;
      state.merchants = action.payload.data;
    },
    getMerchantsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addMerchantRequest,
  addMerchantSuccess,
  addMerchantFailure,
  resetAddMerchant,
  getMerchantsRequest,
  getMerchantsSuccess,
  getMerchantsFailure,
} = merchantSlice.actions;

export default merchantSlice.reducer;
