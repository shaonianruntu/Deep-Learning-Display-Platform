/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-15 14:51:22
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-30 09:22:48
 */
import { actionTypes } from "./index";
import { fromJS } from "immutable";

const defaultState = fromJS({
  imgOriginUrl: "",
  imgUrl: "",
  loading: false,
  callback: false,
  callBackInterval: "",

  cutList: [],
  cutSampleList: [],
  cutAllList: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_IMG_URL:
      return state.merge({
        imgOriginUrl: action.imgOriginUrl,
        loading: false,
        callback: false
      });
    case actionTypes.UPDATE_LOADING_STATUS:
      return state.set("loading");
    case actionTypes.UPDATE_CALLBACK:
      return state.set("callback", true);

    case actionTypes.CHANGE_IMAGE_CUT:
      return state.set("cutList", fromJS(action.cutList));
    case actionTypes.CHANGE_IMAGE_CUT_SAMPLE:
      return state.set("cutSampleList", fromJS(action.cutSampleList));
    case actionTypes.CHANGE_IMAGE_CUT_ALL:
      return state.set("cutAllList", fromJS(action.cutAllList));

    case actionTypes.ARTIFICIAL_UPLOAD_DONE:
      return state.merge({
        imgOriginUrl: "test_multi.jpg",
        loading: false
      });
    case actionTypes.ARTIFICIAL_CALLBACK:
      return state.merge({
        imgUrl: "multi.jpg",
        callback: true
      });
    default:
      return state;
  }
};
