// sagas/assignMerchantSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { assignMerchantFailure, assignMerchantRequest, assignMerchantSuccess,unAssignMerchantRequest,unAssignMerchantSuccess,unAssignMerchantFailure } from '../slice/assignMerchantSlice';
import {apiCaller} from '../../utils/apiCaller'; // your API wrapper
import { toastUtil } from '../../utils/toastUtil'; // your toast utility
import { navigateTo } from '@/componets/common/Navigation';

function* assignMerchantWorker(action: any): Generator<any, void, any> {
  try {
    const response = yield call(() =>
      apiCaller('post', 'admin/assignMerchants', action.payload)
    );

    yield put(assignMerchantSuccess(response));
    toastUtil.success(response?.message || 'Merchant assigned successfully!');
    navigateTo("/dashboard/approvers");
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Failed to assign merchant.';
    yield put(assignMerchantFailure(message));
    toastUtil.error(message);
  }
}
function* unAssignMerchantWorker(action: any): Generator<any, void, any> {
  try {
    const response = yield call(() =>
      apiCaller('post', 'admin/unassignMerchants', action.payload)
    );
    yield put(unAssignMerchantSuccess(response));
    toastUtil.success(response?.message || 'Merchant assigned successfully!');
    navigateTo("/dashboard/approvers");
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Failed to assign merchant.';
    yield put(unAssignMerchantFailure(message));
    toastUtil.error(message);
  }
}

export default function* assignMerchantSaga() {
  yield takeLatest(assignMerchantRequest.type, assignMerchantWorker);
  yield takeLatest(unAssignMerchantRequest.type, unAssignMerchantWorker);
}
