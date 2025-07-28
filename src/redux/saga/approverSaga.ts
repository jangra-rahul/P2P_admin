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
  changeApproverStatusRequest,
  changeApproverStatusSuccess,
  changeApproverStatusFailure,
   editApproverRequest,
  editApproverSuccess,
  editApproverFailure,
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
    // navigateTo("/dashboard/approvers");
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
      `admin/getApprovers?page=${page}&limit=${limit}&search=${search}`
    );

    yield put(getApproverSuccess(response));
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch Approver.';
    yield put(getApproverFailure(message));
    toastUtil.error(message);
  }
}

function* changeApproverStatusWorker(action: PayloadAction<{id?:any,status:string}>) {
  try {
    const { id, status } = action.payload;
    const response = yield call(() => apiCaller('put', `admin/approver/status/${id}`, { status }));
    yield put(changeApproverStatusSuccess());
    toastUtil.success(response?.message || 'Status updated successfully!');
    // Refresh list (optional)
    // yield put(getMerchantsRequest({ page: 1, limit: 10, search: '' }));
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to update status.';
    yield put(changeApproverStatusFailure(message));
    toastUtil.error(message);
  }
}

function* editApproverWorker(action: PayloadAction<{ id: string; data: any }>) {
  try {
    const { id, data } = action.payload;
    const response = yield call(() =>
      apiCaller('put', `admin/editApprover/${id}`, data)
    );
    yield put(editApproverSuccess());
    toastUtil.success(response?.message || 'Approver updated successfully!');
    navigateTo('/dashboard/approvers');
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to update Approver.';
    yield put(editApproverFailure(message));
    toastUtil.error(message);
  }
}

export default function* approverSaga() {
  yield takeLatest(addApproverRequest.type, addApproverWorker);
  yield takeLatest(getApproverRequest.type, getApproverWorker);
  yield takeLatest(changeApproverStatusRequest.type, changeApproverStatusWorker);
yield takeLatest(editApproverRequest.type, editApproverWorker); 
}