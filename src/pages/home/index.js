import {PureComponent} from "react";
import {connect} from "react-redux";
import React from "react";
import {Upload, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import jschardet from 'jschardet';
import Papa from 'papaparse'

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
    if(encoding === "windows-1252"){
      encoding = "ANSI";
    }
    return encoding;
  }

  render() {
    const _this = this;
    const props={
      beforeUpload: file => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload= function (evt){
          const data = evt.target.result;
          const encoding = _this.checkEncoding(data);

          Papa.parse(file, {
            encoding: encoding,
            complete: function (results) {
              const res = results.data;
              if (res[res.length - 1] === "") {
                res.pop();
              }

              _this.setState(res);
            }
          })
        }
        return false
      }
    }
    return (
        <Upload {...props}>
          <Button icon={<UploadOutlined/>}>
              点击上传csv
          </Button>
        </Upload>
    );
  }
}

const mapStateToProps = (state)=>({

})

const mapDispatchToProps=(dispatch)=>({

})

// 连接comboStore和Home组件
export default connect(mapStateToProps, mapDispatchToProps)(Home)