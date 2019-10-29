/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-15 16:50:26
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-29 16:55:40
 */
import { actionTypes } from "./index";
import axios from "axios";

export const handleBtnPaly = () => {
  return dispatch => {
    axios
      .post("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
        play: true
      })
      .then(res => {
        console.log(res);
      })
      .catch(() => {
        console.log("post play action error");
      });
  };
};

export const handleBtnPause = () => {
  return dispatch => {
    axios
      .post("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
        pause: true
      })
      .then(res => {
        console.log(res);
      })
      .catch(() => {
        console.log("post play action error");
      });
  };
};

export const updateImgUrl = imgUrl => ({
  type: actionTypes.UPDATE_IMG_URL,
  imgUrl: imgUrl
});

export const updateLoadingStatus = () => ({
  type: actionTypes.UPDATE_LOADING_STATUS
});

const updateCallBack = done => ({
  type: actionTypes.UPDATE_CALLBACK
});

export const waitingCallBack = () => {
  return dispatch => {
    axios
      .get("https://www.mocky.io/v2/5cc8019d300000980a055e76")
      .then(res => {
        console.log(res);
        // if (res.done) {
        //   // 如果后台运行完成，done 返回 true，否则返回 false
        //   updateCallBack();
        // }
      })
      .catch(() => {
        console.log("post play action error");
      });
  };
};

const changeImageCut = data => ({
  type: actionTypes.CHANGE_IMAGE_CUT,
  cutList: data
});

export const getImageCut = () => {
  return dispatch => {
    axios
      .get("/api/fd_cut.json")
      .then(res => {
        const data = res.data.data;
        dispatch(changeImageCut(data));
      })
      .catch(() => {
        console.log("get image cut error");
      });
  };
};

const changeImageCutSample = data => ({
  type: actionTypes.CHANGE_IMAGE_CUT_SAMPLE,
  cutSampleList: data
});

export const getImageSampleCut = () => {
  return dispatch => {
    axios
      .get("/api/fd_cutsample.json")
      .then(res => {
        const data = res.data.data;
        dispatch(changeImageCutSample(data));
      })
      .catch(() => {
        console.log("get image cut sample error");
      });
  };
};
