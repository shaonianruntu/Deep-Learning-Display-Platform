/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-28 16:11:56
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-28 21:53:06
 */
// Package
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
// Component
import store from "./store";
// Router
import FD from "./pages/fd/loadable";
import FP from "./pages/fp/loadable";
import SR from "./pages/sr/loadable";
// CSS
import style from "./style.module.less";

import { Col, Row, Menu } from "antd";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Row className={style["App"]}>
            <Col className={style["left"]}>
              <Row className={style["header"]}>
                <img className={style["logo"]} src="./logo0.png"></img>
                {/* <span className={style["title"]}>媒体智能实验室</span> */}
              </Row>
              <Row>
                <Menu
                  // onClick={this.handleClick}
                  style={{ width: 256 }}
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                >
                  <Menu.Item key="1">
                    <Link to="/">人脸检测</Link>
                  </Menu.Item>

                  <Menu.Item key="2">
                    <Link to="/sr">人脸画像合成</Link>
                  </Menu.Item>

                  <Menu.Item key="3">图像超分辨率重建</Menu.Item>
                </Menu>
              </Row>
            </Col>
            <Col className={style["right"]}>
              <Route path="/" exact component={FD}></Route>
              <Route path="/fp" exact component={FP}></Route>
              <Route path="/sr" exact component={SR}></Route>
            </Col>
          </Row>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
