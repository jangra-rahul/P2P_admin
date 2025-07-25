import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/rootReducer"; 
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
