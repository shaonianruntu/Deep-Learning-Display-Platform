/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-28 16:58:11
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-30 12:27:54
 */
// Package
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actionCreators } from "./store";
// CSS
import style from "./style.module.less";
// Antd
import { Row, Col, Card, Upload, Icon, message } from "antd";

// 获取图像的 base64 格式
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

// 确保图像的格式为 jpg 和 png
function beforeUpload(file) {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  return isJpgOrPng;
}

class FD extends PureComponent {
  // 上传回调
  handleChange = async info => {
    const {
      updateLoadingStatus,
      updateImgOriginUrl,
      waitingCallBack,
      artificialCallBack
    } = this.props;

    if (info.file.status === "uploading") {
      updateLoadingStatus();
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        updateImgOriginUrl(imageUrl);
      });
      // 当 input image 上传完成后，就开启定时器，来每一秒钟检测一次 ajax 的回调结果。
      // window.callBackInterval = setInterval(waitingCallBack, 1000);
      setTimeout(artificialCallBack, 5000);
    }
  };

  updateOutput() {
    // 当接收到回调状态为成功时，则关闭定时器。
    clearInterval(window.callBackInterval);
    this.props.getImageCut();
    return (
      <div className={style["outputImage"]}>
        <img src={this.props.imgUrl} alt="inputImg" style={{ width: "100%" }} />
      </div>
    );
  }

  render() {
    const {
      imgOriginUrl,
      imgUrl,
      loading,
      callback,
      handleBtnPaly,
      handleBtnPause,
      handleBtnRedo,
      cutList,
      cutSampleList,
      cutAllList
    } = this.props;

    return (
      <div className={style["FD"]}>
        <Row className={style["header"]}>
          <span className={style["title"]}>人脸检测</span>
        </Row>
        <Row className={style["content"]}>
          <Col span={9}>
            <Card title="Input Image">
              <Upload
                name="inputImg"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // TODO：此处需要改成后端的接口
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imgOriginUrl ? (
                  <img
                    src={imgOriginUrl}
                    alt="inputImg"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>
                    <Icon type={loading ? "loading" : "plus"} />
                    <div className="ant-upload-text">上传图片</div>
                  </div>
                )}
              </Upload>
            </Card>
          </Col>
          <Col className={style["action"]} span={6}>
            <Icon
              type="play-circle"
              className={style["play"]}
              onClick={handleBtnPaly}
            />
            <Icon
              type="pause-circle"
              className={style["pause"]}
              onClick={handleBtnPause}
            />
            <Icon
              type="redo"
              className={style["redo"]}
              onClick={handleBtnRedo}
            />
          </Col>
          <Col span={9}>
            <Card title="Output Image">
              {callback ? this.updateOutput() : ""}
              {/* <img
                  src="./multi.jpg"
                  alt="inputImg"
                  style={{ width: "100%" }}
                /> */}
            </Card>
          </Col>
        </Row>
        {/* <Row className={style["cutImage"]}>
          <Col span={11}>
            <Card title="Output Image Face Cut">
              {cutList.map((item, index) => (
                <img
                  src={"cut/" + item.get("name")}
                  alt={item.get("name")}
                ></img>
              ))}
            </Card>
          </Col>
          <Col span={11} offset={2}>
            <Card title="Output Image Face Cut Sample Stroke">
              {cutSampleList.map((item, index) => (
                <img
                  src={"cut_sample/" + item.get("name")}
                  alt={item.get("name")}
                ></img>
              ))}
            </Card>
          </Col>
        </Row> */}
        <Row className={style["cutImage"]}>
          <Card title="Output Image Face Cut And Cut Sample Stroke">
            {callback
              ? cutAllList.map((item, index) => (
                  <div className={style["cutAllGroup"]}>
                    <img
                      src={"cut/" + item.get("name")}
                      alt={item.get("name")}
                    ></img>
                    <img
                      src={"cut_sample/" + item.get("samplename")}
                      alt={item.get("samplename")}
                    ></img>
                  </div>
                ))
              : ""}
          </Card>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    this.props.getImageCut();
    this.props.getImageSampleCut();
    this.props.getImageCutAll();
  }
}

const mapState = state => ({
  imgOriginUrl: state.getIn(["fd", "imgOriginUrl"]),
  imgUrl: state.getIn(["fd", "imgUrl"]),
  loading: state.getIn(["fd", "loading"]),
  callback: state.getIn(["fd", "callback"]),
  callBackInterval: state.getIn(["fd", "callBackInterval"]),

  cutList: state.getIn(["fd", "cutList"]),
  cutSampleList: state.getIn(["fd", "cutSampleList"]),
  cutAllList: state.getIn(["fd", "cutAllList"])
});

const mapDispatch = dispatch => ({
  updateImgOriginUrl(imageUrl) {
    dispatch(actionCreators.updateImgOriginUrl(imageUrl));
  },
  updateLoadingStatus() {
    dispatch(actionCreators.updateLoadingStatus());
  },

  waitingCallBack() {
    dispatch(actionCreators.waitingCallBack());
  },

  handleBtnPaly() {
    message.success(`开始运行`);
    // 当暂停后点击该按钮，则重新开始等待回传（此时自动启动失效）
    window.callBackInterval = setInterval(
      dispatch(actionCreators.waitingCallBack()),
      1000
    );
    dispatch(actionCreators.handleBtnPaly());
  },
  handleBtnPause() {
    message.error(`暂停运行`);
    // 当强行进行人工中止运行时，同时关闭等待回传定时器。
    clearInterval(window.callBackInterval);
    dispatch(actionCreators.handleBtnPause());
  },
  handleBtnRedo() {
    message.warning(`重新运行`);
    // 当强行进行人工中止运行时，同时关闭等待回传定时器。
    clearInterval(window.callBackInterval);
    dispatch(actionCreators.updateImgOriginUrl());
    dispatch(actionCreators.handleBtnPause());
  },

  getImageCut() {
    dispatch(actionCreators.getImageCut());
  },
  getImageSampleCut() {
    dispatch(actionCreators.getImageSampleCut());
  },
  getImageCutAll() {
    dispatch(actionCreators.getImageCutAll());
  },

  artificialCallBack() {
    dispatch(actionCreators.artificialCallBack());
  }
});

export default connect(
  mapState,
  mapDispatch
)(withRouter(FD));
