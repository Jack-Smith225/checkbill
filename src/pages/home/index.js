import {PureComponent} from "react";
import {connect} from "react-redux";
import React from "react";
import {Upload, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import jschardet from 'jschardet';
import {actionCreators} from "./store";

class Home extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      csvParseData: []
    }
  }

  // 检查编排
  checkEncoding = (base64Str) => {
    //这种方式得到的是一种二进制串
    const str = atob(base64Str.split(";base64,")[1]); // atob  方法 Window 对象 定义和用法 atob() 方法用于解码使用 base-64 编码的字符
    //要用二进制格式
    let encoding = jschardet.detect(str);
    encoding = encoding.encoding;
    // 有时候会识别错误
    if (encoding === "windows-1252") {
      encoding = "ANSI";
    }
    return encoding;
  }

  componentDidMount() {
    this.props.changeBillData();
    this.props.getCategoryData();
  }

  render() {
    return (
        <div>
          home page
        </div>
    );
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  changeBillData() {
    const action = actionCreators.getBillData();
    dispatch(action);
  },

  getCategoryData() {
    const action = actionCreators.getCategoryData();
    dispatch(action)
  }
});

// 连接comboStore和Home组件
export default connect(mapStateToProps, mapDispatchToProps)(Home)