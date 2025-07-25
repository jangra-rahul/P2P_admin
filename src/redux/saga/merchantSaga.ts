// src/store/saga/merchantSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiCaller } from '../../utils/apiCaller';
import { toastUtil } from '@/utils/toastUtil';
import { navigateTo } from '../../componets/common/Navigation';
import {
  addMerchantRequest,
  addMerchantSuccess,
  addMerchantFailure,
  getMerchantsRequest,
  getMerchantsSuccess,
  getMerchantsFailure,
} from '../slice/merchantSlice';

interface AddMerchantPayload {
  merchantName: string;
  email: string;
  platformName: string;
  setDailyLimit: string | number; 
  password: string;
}


function* addMerchantWorker(action: PayloadAction<AddMerchantPayload>) {
  try {
    const merchantData:any = action.payload;

    const response = yield call(() => apiCaller('post', 'admin/addMerchant', merchantData));
    yield put(addMerchantSuccess(response));
    toastUtil.success(response?.message || 'Merchant added successfully!');
    navigateTo("/dashboard/merchants");

  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to add merchant. Please try again.';
    yield put(addMerchantFailure(message));
    toastUtil.error(message);
  }
}


function* getMerchantsWorker(action: PayloadAction<{ search?: string; page?: number }>) {
  try {
    const page = action.payload?.page || 1;
    const limit = 10;
    const search = action.payload?.search || '';

    const response = yield call(
      apiCaller,
      'get',
      `admin/getMerchants?page=${page}&limit=${limit}&search=${search}`
    );

    yield put(getMerchantsSuccess(response));
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch Approver.';
    yield put(getMerchantsFailure(message));
    toastUtil.error(message);
  }
}

export default function* merchantSaga() {
  yield takeLatest(addMerchantRequest.type, addMerchantWorker);
  yield takeLatest(getMerchantsRequest.type, getMerchantsWorker);

}