// src/store/saga/merchantSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiCaller } from '../../utils/apiCaller';
import { toastUtil } from '@/utils/toastUtil';
import { navigateTo } from '../../componets/common/Navigation';
import {
  addApproverRequest,
  addApproverSuccess,
  addApproverFailure,
  getApproverRequest,
  getApproverSuccess,
  getApproverFailure,
} from '../slice/approverSlice';

interface AddApproverPayload {
  merchantName: string;
  email: string;
  platformName: string;
  setDailyLimit: string | number; 
  password: string;
}


function* addApproverWorker(action: PayloadAction<AddApproverPayload>) {
  try {
    const merchantData:any = action.payload;

    const response = yield call(() => apiCaller('post', 'admin/addApprover', merchantData));
    yield put(addApproverSuccess(response));
    toastUtil.success(response?.message || 'Approver added successfully!');
    navigateTo("/dashboard/approvers");

  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to add Approver. Please try again.';
    yield put(addApproverFailure(message));
    toastUtil.error(message);
  }
}

function* getApproverWorker(action: PayloadAction<{ search?: string; page?: number }>) {
  try {
    const page = action.payload?.page || 1;
    const limit = 10;
    const search = action.payload?.search || '';

    const response = yield call(
      apiCaller,
      'get',
      `admin/getApprovers?page=${page}&limit=${10}&search=${search}`
    );

    yield put(getApproverSuccess(response));
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch Approver.';
    yield put(getApproverFailure(message));
    toastUtil.error(message);
  }
}

export default function* approverSaga() {
  yield takeLatest(addApproverRequest.type, addApproverWorker);
  yield takeLatest(getApproverRequest.type, getApproverWorker);

}