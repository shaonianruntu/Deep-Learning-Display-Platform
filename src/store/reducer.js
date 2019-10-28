/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-10 15:21:39
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-28 21:54:18
 */
import { combineReducers } from "redux-immutable";

import { reducer as FDReducer } from "../pages/fd/store";

// import { reducer as SRReducer } from "../pages/sr/store";

const reducer = combineReducers({
  fd: FDReducer
  // sr: SRReducer
  // detail: detailReducer,
  // login: loginReducer
});

export default reducer;
