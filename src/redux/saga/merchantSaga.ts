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

function* changeMerchantStatusWorker(action: PayloadAction<{id?:any,status:string}>) {
  try {
    const { id, status } = action.payload;
    const response = yield call(() => apiCaller('put', `admin/merchant/status/${id}`, { status }));
    yield put(changeMerchantStatusSuccess());
    toastUtil.success(response?.message || 'Status updated successfully!');
    // Refresh list (optional)
    // yield put(getMerchantsRequest({ page: 1, limit: 10, search: '' }));
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to update status.';
    yield put(changeMerchantStatusFailure(message));
    toastUtil.error(message);
  }
}

function* editApproverWorker(action: PayloadAction<{ id: string; data: any }>) {
  try {
    const { id, data } = action.payload;
    const response = yield call(() =>
      apiCaller('put', `admin/editMerchant/${id}`, data)
    );
    yield put(editMerchantSuccess());
    toastUtil.success(response?.message || 'Approver updated successfully!');
    navigateTo('/dashboard/merchants');
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to update Approver.';
    yield put(editMerchantFailure(message));
    toastUtil.error(message);
  }
}


function* getUnassignedMerchantsWorker(action: PayloadAction<{ search?: string }>) {
  try {
    const search = action.payload?.search || '';
    const response = yield call(
      () => apiCaller('get', `admin/unassignedMerchants?search=${search}`)
    );
    yield put(getUnassignedMerchantsSuccess(response));
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch unassigned merchants.';
    yield put(getUnassignedMerchantsFailure(message));
    toastUtil.error(message);
  }
}
function* getAssignedMerchantListsWorker(action: PayloadAction<{ approverId: string }>) {
  try {
    const { approverId } = action.payload;
    const response = yield call(() =>
      apiCaller('get', `admin/assignedMerchants/${approverId}`)
    );
    yield put(getAssignedMerchantsListSuccess(response));
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch assigned merchants.';
    yield put(getAssignedMerchantsListFailure(message));
    toastUtil.error(message);
  }
}

export default function* merchantSaga() {
  yield takeLatest(addMerchantRequest.type, addMerchantWorker);
  yield takeLatest(getMerchantsRequest.type, getMerchantsWorker);
  yield takeLatest(changeMerchantStatusRequest.type, changeMerchantStatusWorker);
yield takeLatest(editMerchantRequest.type, editApproverWorker); 
yield takeLatest(getUnassignedMerchantsRequest.type, getUnassignedMerchantsWorker);
yield takeLatest(getAssignedMerchantsListRequest.type, getAssignedMerchantListsWorker);

}