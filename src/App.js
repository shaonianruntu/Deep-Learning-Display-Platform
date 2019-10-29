/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-28 16:11:56
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-29 10:58:02
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

import { Col, Row, Menu, Icon } from "antd";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Row className={style["App"]}>
            <Col className={style["left"]}>
              <Row className={style["header"]}>
                <Link to="/">
                  <img
                    className={style["logo"]}
                    alt="logo"
                    src="./logo0.png"
                  ></img>
                </Link>
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
                    <Link to="/fp">人脸画像合成</Link>
                  </Menu.Item>

                  <Menu.Item key="3">
                    <Link to="/sr">图像超分辨率重建</Link>
                  </Menu.Item>
                </Menu>
              </Row>
              <Row className={style["footer"]}>
                <p>
                  <a href="http://www.hdu.edu.cn/">
                    <span>HDU</span>
                  </a>
                  <a href="https://github.com/HDUMIL">
                    <Icon type="github" />
                  </a>
                  <a href="http://mil.hdu.edu.cn">
                    <span>MIL</span>
                  </a>
                </p>
                <Row>Copyright &copy; 媒体智能实验室</Row>
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
