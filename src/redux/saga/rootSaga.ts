import { all } from 'redux-saga/effects';
import userSaga from '../saga/userSaga';
import merchantSaga from './merchantSaga';
import approverSaga from './approverSaga';

export default function* rootSaga() {
  yield all([userSaga(), merchantSaga(),approverSaga()]);
}
