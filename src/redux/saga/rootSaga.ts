import { all } from 'redux-saga/effects';
import userSaga from '../saga/userSaga';
import merchantSaga from './merchantSaga';
import approverSaga from './approverSaga';
import assignMerchantSaga from './assignMerchantSaga';

export default function* rootSaga() {
  yield all([userSaga(), merchantSaga(),approverSaga(),assignMerchantSaga()]);
}
