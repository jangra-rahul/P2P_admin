// src/store/saga/singleApproverSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCaller } from '@/utils/apiCaller';
import {
  getSingleApproverRequest,
  getSingleApproverSuccess,
  getSingleApproverFailure,
} from '../slice/singleApproverSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toastUtil } from '@/utils/toastUtil';

function* getSingleApproverWorker(action: PayloadAction<{ id: string }>) {
  try {
    const { id } = action.payload;

    const response = yield call(() =>
      apiCaller('get', `admin/approver/${id}`)
    );

    yield put(getSingleApproverSuccess(response));
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch Approver.';
    yield put(getSingleApproverFailure(message));
    toastUtil.error(message);
  }
}

export default function* singleApproverSaga() {
  yield takeLatest(getSingleApproverRequest.type, getSingleApproverWorker);
}
