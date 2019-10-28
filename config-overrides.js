/*
 * @Description:
 * @Author: fangn
 * @Github:
 * @Date: 2019-10-28 16:15:40
 * @LastEditors: fangn
 * @LastEditTime: 2019-10-28 16:17:44
 */
const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {}
  })
);
