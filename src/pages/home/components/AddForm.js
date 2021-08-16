import React, {Component} from "react";
import {Button, DatePicker, Form, Input, Select} from "antd";
import {connect} from "react-redux";
import {actionCreators} from "../store";

const {Option} = Select

class AddForm extends Component {

  formRef = React.createRef();


  check = () => {
    let recordToAdd = this.props.recordToAdd;
    if (recordToAdd.type === '') {
      alert("账单类型没选, 收入or支出?");
      return
    }
    if (recordToAdd.time === '') {
      alert("账单时间没选");
      return;
    }
    if (recordToAdd.amount === '') {
      alert("账单金额没填");
      return;
    }

    this.onReset();
    this.props.submit(recordToAdd);
  }

  onReset = () => {
    this.formRef.current.resetFields();
  };

  alterRecordType = (value) => {
    this.props.recordToAdd.type = value.toString();
  }

  alterRecordDate = (value) => {
    this.formRef.current.setFieldsValue({time: value});
    let timestamp = value.toDate().getTime();
    this.props.recordToAdd.time = timestamp.toString();
  }

  alterCategory = (value) => {
    this.props.recordToAdd.category = value.toString();
  }

  alterAmount = (e) => {
    this.props.recordToAdd.amount = e.target.value.toString();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.onReset();
  }

  render() {
    return (
        <Form
            ref={this.formRef}
            name="control-ref"
            onFinish={this.onFinish}
            layout={"inline"}
            className={"addOptions"}
        >
          <Form.Item
              name={"类型"}
              label={"类型"}
              rules={[{required: true}]}
          >
            <Select
                className={"text"}
                placeholder="请选择"
                onChange={this.alterRecordType}
                allowClear
            >
              {
                this.props.typeList.map((item, index) => {
                  return <Option key={index} value={index}>{item}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
              name={"time"}
              label={"时间"}
              rules={[{required: true}]}
          >
            <DatePicker className={"datepicker"} onChange={this.alterRecordDate}/>
          </Form.Item>

          <Form.Item
              name={"分类"}
              label={"分类"}
          >
            <Select
                className={"text"}
                placeholder={"请选择"}
                onChange={this.alterCategory}
                allowClear
            >
              {
                this.props.categoryList.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>
                })
              }
            </Select>
          </Form.Item>

          <Form.Item
              name={"金额"}
              label={"金额"}
              rules={[{required: true}]}
          >
            <Input
                id={"amountInput"}
                className={"amount text"}
                placeholder={"请输入数字"}
                onChange={this.alterAmount}
            />
          </Form.Item>

          <Form.Item>
            <Button type={"primary"} className={"submitButton"} htmlType={"button"} onClick={this.check}>
              确定
            </Button>
            <Button htmlType="button" onClick={this.onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
    );
  }
}

function mapStateToProps(state) {

  const categoryList = state.get('homeReducer').get('categoryList').filter(function (element) {
    return element.id !== "id"
  });

  return {
    categoryNameDict: Object.assign({}, ...categoryList.filter(function (element) {
      return element.id != "id";
    }).map((x) => ({[x.id]: x.name}))),
    categoryNameList: categoryList.filter(function (element) {
      return element.name != "name"
    }).map((x) => x.name),
    categoryList: categoryList,
    typeList: ["支出", "收入"],
    recordToAdd: {
      type: '',
      time: '',
      category: '',
      amount: ''
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit(recordToAdd) {
    const action = actionCreators.submitAddRecord(recordToAdd);
    dispatch(action);
    alert("添加成功!")

    const hideAddForm = actionCreators.hideAddForm();
    dispatch(hideAddForm);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)