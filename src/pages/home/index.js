import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Form, Select, Table} from 'antd';
import {actionCreators} from "./store";
import 'antd/dist/antd.css';
import './index.css'
import AddForm from "./components/AddForm";

const {Option} = Select

class Home extends Component {

  dropDownRef = React.createRef();

  componentDidMount() {
    this.props.changeBillData();
    this.props.getCategoryData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.recordAddFlag !== this.props.recordAddFlag) {
      this.dropDownRef.current.resetFields();
      this.props.resetSelectMonth();
    }
  }

  render() {

    const columns = [
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: type => type === '1' ? '收入' : '支出'
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render: function (time, record) {
          let date = new Date(parseInt(time));
          return date.toLocaleDateString(
              'cn-CN'
          )
        }
      },
      {
        title: '分类',
        dataIndex: 'category',
        key: 'category',
        render: category => this.props.categoryNameDict[category]
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount'
      }
    ]

    // noinspection JSUnresolvedVariable
    return (
        <div className={"rootDiv"}>
          <div className={"tableWrapper"}>

            <Form
                ref={this.dropDownRef}
                name={"dropDownRef"}
                layout={"inline"}
            >
              <Form.Item
                  name={"下拉框"}
              >
                <Select className={"dropDown"}
                        onChange={this.props.handleChange}
                        placeholder={"请选择月份"}
                >
                  {
                    this.props.monthList.map((item, index) => {
                      return <Option key={index} value={item}>{item}</Option>
                    })
                  }
                </Select>
              </Form.Item>
            </Form>

            {
              this.props.showAddForm ?
                  <Button onClick={this.props.hideAddForm} className={"addRecordButton"} type={"primary"}>隐藏</Button> :
                  <Button onClick={this.props.displayAddForm} className={"addRecordButton"}>添加</Button>
            }

            {
              this.props.showAddForm ? <AddForm/> : null
            }
            <Table columns={columns} dataSource={this.props.filteredBillList.slice().reverse()}
                   rowKey={record => record.time + record.category + record.amount + Math.random().toString()}
            />
            {
              this.props.selectedMonth.includes("/") ?
                  <div className={"statistic"}>
                    <label>月收入: {this.props.monthIncome.length !== 0 ? this.props.monthIncome.reduce(function (accumulator, currentValue) {
                      return accumulator + currentValue;
                    }) + " 元" : "暂无数据"} </label>
                    <label>月支出: {this.props.monthCost.length !== 0 ? this.props.monthCost.map(x => parseInt(x.amount)).reduce(function (accumulator, currentValue) {
                      return accumulator + currentValue;
                    }) + " 元" : "暂无数据"} </label>
                  </div> : null
            }
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {

  let billList = state.get('homeReducer').get('billList');
  const dateStrList = billList.map((x) => (new Date(parseInt(x.time)).toLocaleDateString()));
  // 整理数据格式, 并去重
  let monthList = dateStrList.map((x) => {
    let arr = x.split("/");
    return arr[0] + "/" + arr[1]
  }).filter(function (element, index, self) {
    return index === self.indexOf(element);
  });
  monthList.push('全部月份');

  const categoryList = state.get('homeReducer').get('categoryList').filter(function (element) {
    return element.id !== "id"
  });
  return {
    categoryNameList: categoryList.filter(function (element) {
      return element.name !== "name"
    }).map((x) => x.name),
    billList: billList,
    categoryNameDict: Object.assign({}, ...categoryList.filter(function (element) {
      return element.id !== "id";
    }).map((x) => ({[x.id]: x.name}))),
    monthList: monthList,
    filteredBillList: state.get('homeReducer').get('filteredBills'),
    showAddForm: state.get('homeReducer').get('showAddForm'),
    monthIncome: state.get('homeReducer').get('filteredBills').filter(function (element) {
      return element.type === "1"
    }).map(x => parseInt(x.amount)),
    monthCost: state.get('homeReducer').get('filteredBills').filter(function (element) {
      return element.type === "0"
    }),
    selectedMonth: state.get('homeReducer').get('selectedMonth'),
    recordAddFlag: state.get('homeReducer').get('recordAddFlag')
  }
}

const mapDispatchToProps = (dispatch) => (
    {
      changeBillData() {
        const action = actionCreators.getBillData();
        dispatch(action);
      },
      getCategoryData() {
        const action = actionCreators.getCategoryData();
        dispatch(action)
      },
      handleChange(value) {
        const action = actionCreators.filterBillList(value);
        dispatch(action);
      },
      displayAddForm() {
        const action = actionCreators.showAddForm();
        dispatch(action);
      },
      hideAddForm() {
        const action = actionCreators.hideAddForm();
        dispatch(action);
      },
      resetSelectMonth() {
        const action = actionCreators.resetSelectMonth();
        dispatch(action);
      }
    }
);

// 连接comboStore和Home组件
export default connect(mapStateToProps, mapDispatchToProps)(Home)