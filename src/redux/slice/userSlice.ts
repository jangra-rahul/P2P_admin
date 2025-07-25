import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loading: boolean;
  error: string | null;
  data: any; // ideally type this
}

const initialState: UserState = {
  loading: false,
  error: null,
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<{ email: string; password: string }>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
