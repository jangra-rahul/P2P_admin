import { call, delay, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiCaller } from '../../utils/apiCaller'; 
import { loginRequest, loginSuccess, loginFailure } from '../slice/userSlice';
import { toastUtil } from '@/utils/toastUtil';
import { navigateTo } from '@/componets/common/Navigation';

function* loginWorker(action: PayloadAction<{ email: string; password: string }>) {
  try {
    const { email, password } = action.payload;
    const response = yield call(apiCaller, 'post', 'admin/login', { email, password });
    console.log(response)
    if (response?.api_token) {
          localStorage.setItem("token", response?.api_token);
        }
        navigateTo("/dashboard");
    yield put(loginSuccess(response));
      toastUtil.success('Login successful!'); 
  } catch (error) {
    const message = error?.response?.data?.message || 'Login failed';
    yield put(loginFailure(message));
    toastUtil.error(message);
  }
}

export default function* userSaga() {
  yield takeLatest(loginRequest.type, loginWorker);
}
