/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-15 14:51:22
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-28 21:11:27
 */
import { actionTypes } from "./index";
import { fromJS } from "immutable";

const defaultState = fromJS({
  imgUrl: "",
  loading: false,
  callback: false,
  callBackInterval: ""
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_IMG_URL:
      return state.merge({
        imgUrl: action.imgUrl,
        loading: false,
        callback: false
      });
    case actionTypes.UPDATE_LOADING_STATUS:
      return state.set("loading");
    case actionTypes.UPDATE_CALLBACK:
      return state.set("callback", true);
    default:
      return state;
  }
};
