/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-28 21:53:13
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-30 13:53:05
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

var arr = new Array(100);
for (var i = 0; i < arr.length; i++) {
  arr[i] = i + 1;
}

class FP extends PureComponent {
  render() {
    return (
      <div className={style["FP"]}>
        <Row className={style["header"]}>
          <span className={style["title"]}>人脸画像合成</span>
        </Row>
        <Row className={style["cutImage"]}>
          <Card title="人脸原图与生成画像对照">
            {/* {this.getFpResult()} */}
            {arr.map((item, index) => (
              <div className={style["cutAllGroup"]}>
                <img
                  src={"cuhk_b/" + item + ".jpg"}
                  alt={"input" + item + ".jpg"}
                ></img>
                <img
                  src={"600/" + item + ".jpg"}
                  alt={"output" + item + ".jpg"}
                ></img>
              </div>
            ))}
          </Card>
        </Row>
      </div>
    );
  }

  getFpResult() {}

  getFpSampleResult(i) {
    return (
      <div className={style["cutAllGroup"]}>
        <img src={"cuhk_b/" + i + ".jpg"} alt={i + ".jpg"}></img>
        <img src={"600/" + i + ".jpg"} alt={i + ".jpg"}></img>
      </div>
    );
  }
}

export default FP;
