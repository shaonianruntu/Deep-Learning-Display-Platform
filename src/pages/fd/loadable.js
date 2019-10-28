/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-28 17:01:20
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-28 21:49:41
 */
/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-12 18:07:43
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-28 21:49:17
 */
import React from "react";
import Loadable from "react-loadable";

const LoadableComponent = Loadable({
  loader: () => import("./"),
  loading() {
    // return <div>正在加载</div>;
    return <div></div>;
  }
});

export default () => <LoadableComponent />;
