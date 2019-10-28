/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-28 17:02:57
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-28 17:03:04
 */
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

export default store;
