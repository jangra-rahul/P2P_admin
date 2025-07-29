// import { changeApproverStatusRequest } from "@/redux/slice/approverSlice";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Merchant {
//   // define your merchant properties here
//   id: string;
//   name: string;
// }


// interface MerchantListState {
//   loading: boolean;
//   error: string | null;
//   data: Merchant[];
// }

// interface MerchantState {
//   loading: boolean;
//   error: string | null;
//   success: boolean;
//   merchants: Merchant[];
//   assignedMerchants: MerchantListState;

// }

// const initialState: MerchantState = {
//   loading: false,
//   error: null,
//   success: false,
//   merchants: [],
//   unassignedMerchants: { loading: false, error: null, data: [] },

// };

// const merchantSlice = createSlice({
//   name: "merchant",
//   initialState,
//   reducers: {
//     addMerchantRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.success = false;
//     },
//     addMerchantSuccess: (state) => {
//       state.loading = false;
//       state.success = true;
//     },
//     addMerchantFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     resetAddMerchant: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//     getMerchantsRequest: (
//       state,
//       _action: PayloadAction<{ page: number; limit: number; search: string }>
//     ) => {
//       state.loading = true;
//     },
//     getMerchantsSuccess: (
//       state,
//       action: PayloadAction<{ data: Merchant[] }>
//     ) => {
//       state.loading = false;
//       state.merchants = action.payload.data;
//     },
//     getMerchantsFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     changeMerchantStatusRequest: (
//       state,
//       _action: PayloadAction<{ id: string; status: string }>
//     ) => {
//       state.loading = true;
//       state.error = null;
//       state.success = false;
//     },
//     changeMerchantStatusSuccess: (state) => {
//       state.loading = false;
//       state.success = true;
//     },
//     changeMerchantStatusFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     editMerchantRequest: (
//       state,
//       _action: PayloadAction<{ id: string; data: any }>
//     ) => {
//       state.loading = true;
//       state.error = null;
//       state.success = false;
//     },
//     editMerchantSuccess: (state) => {
//       state.loading = false;
//       state.success = true;
//     },
//     editMerchantFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     getUnassignedMerchantsRequest: (
//       state,
//       _action: PayloadAction<{ search?: string }>
//     ) => {
//       state.loading = true;
//       state.error = null;
//     },
//     getUnassignedMerchantsSuccess: (
//       state,
//       action: PayloadAction<{ data: Merchant[] }>
//     ) => {
//       state.loading = false;
//       state.merchants = action.payload.data;
//     },
//     getUnassignedMerchantsFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     getAssignedMerchantsListRequest: (
//       state,
//       _action: PayloadAction<{ search?: string }>
//     ) => {
//       state.loading = true;
//       state.error = null;
//     },
//     getAssignedMerchantsListSuccess: (
//       state,
//       action: PayloadAction<{ data: Merchant[] }>
//     ) => {
//       state.loading = false;
//       state.merchants = action.payload.data;
//     },
//     getAssignedMerchantsListFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   addMerchantRequest,
//   addMerchantSuccess,
//   addMerchantFailure,
//   resetAddMerchant,
//   getMerchantsRequest,
//   getMerchantsSuccess,
//   getMerchantsFailure,
//   changeMerchantStatusRequest,
//   changeMerchantStatusSuccess,
//   changeMerchantStatusFailure,
//   editMerchantRequest,
//   editMerchantSuccess,
//   editMerchantFailure,
//   getUnassignedMerchantsRequest,
// getUnassignedMerchantsSuccess,
// getUnassignedMerchantsFailure,
//   getAssignedMerchantsListRequest,
// getAssignedMerchantsListSuccess,
// getAssignedMerchantsListFailure,
// } = merchantSlice.actions;

// export default merchantSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Merchant {
  id: string;
  name: string;
}

interface MerchantListState {
  loading: boolean;
  error: string | null;
  data: Merchant[];
}

interface MerchantState {
  loading: boolean;
  error: string | null;
  success: boolean;
  merchants: MerchantListState;
  assignedMerchants: MerchantListState;
  unassignedMerchants: MerchantListState;
}

const initialState: MerchantState = {
  loading: false,
  error: null,
  success: false,
  merchants: { loading: false, error: null, data: [] },
  assignedMerchants: { loading: false, error: null, data: [] },
  unassignedMerchants: { loading: false, error: null, data: [] },
};

const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    // ---------------- Add Merchant ----------------
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

    // ---------------- Get All Merchants ----------------
    getMerchantsRequest: (
      state,
      _action: PayloadAction<{ page: number; limit: number; search: string }>
    ) => {
      state.merchants.loading = true;
      state.merchants.error = null;
    },
    getMerchantsSuccess: (
      state,
      action: PayloadAction<{ data: Merchant[] }>
    ) => {
      state.merchants.loading = false;
      state.merchants.data = action.payload.data;
    },
    getMerchantsFailure: (state, action: PayloadAction<string>) => {
      state.merchants.loading = false;
      state.merchants.error = action.payload;
    },

    // ---------------- Change Merchant Status ----------------
    changeMerchantStatusRequest: (
      state,
      _action: PayloadAction<{ id: string; status: string }>
    ) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    changeMerchantStatusSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    changeMerchantStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------------- Edit Merchant ----------------
    editMerchantRequest: (
      state,
      _action: PayloadAction<{ id: string; data: any }>
    ) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    editMerchantSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    editMerchantFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------------- Get Unassigned Merchants ----------------
    getUnassignedMerchantsRequest: (
      state,
      _action: PayloadAction<{ search?: string }>
    ) => {
      state.unassignedMerchants.loading = true;
      state.unassignedMerchants.error = null;
    },
    getUnassignedMerchantsSuccess: (
      state,
      action: PayloadAction<{ data: Merchant[] }>
    ) => {
      state.unassignedMerchants.loading = false;
      state.unassignedMerchants.data = action.payload.data;
    },
    getUnassignedMerchantsFailure: (state, action: PayloadAction<string>) => {
      state.unassignedMerchants.loading = false;
      state.unassignedMerchants.error = action.payload;
    },

    // ---------------- Get Assigned Merchants ----------------
    getAssignedMerchantsListRequest: (
      state,
      _action: PayloadAction<{ search?: string }>
    ) => {
      state.assignedMerchants.loading = true;
      state.assignedMerchants.error = null;
    },
    getAssignedMerchantsListSuccess: (
      state,
      action: PayloadAction<{ data: Merchant[] }>
    ) => {
      state.assignedMerchants.loading = false;
      state.assignedMerchants.data = action.payload.data;
    },
    getAssignedMerchantsListFailure: (state, action: PayloadAction<string>) => {
      state.assignedMerchants.loading = false;
      state.assignedMerchants.error = action.payload;
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
  changeMerchantStatusRequest,
  changeMerchantStatusSuccess,
  changeMerchantStatusFailure,
  editMerchantRequest,
  editMerchantSuccess,
  editMerchantFailure,
  getUnassignedMerchantsRequest,
  getUnassignedMerchantsSuccess,
  getUnassignedMerchantsFailure,
  getAssignedMerchantsListRequest,
  getAssignedMerchantsListSuccess,
  getAssignedMerchantsListFailure,
} = merchantSlice.actions;

export default merchantSlice.reducer;
