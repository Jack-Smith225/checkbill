import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Select, Table} from 'antd';
import {actionCreators} from "./store";
import 'antd/dist/antd.css';
import './index.css'

const {Option} = Select

class Home extends PureComponent {

  componentDidMount() {
    this.props.changeBillData();
    this.props.getCategoryData();
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
          <Select className={"dropDown"} onChange={this.props.handleChange} defaultValue={'全部数据'}>
            {
              this.props.monthList.map((item, index) => {
                return <Option key={index} value={item}>{item}</Option>
              })
            }
          </Select>
          <Table columns={columns} dataSource={this.props.filteredBills}
                 rowKey={record => record.time + record.category + record.amount}
          />
        </div>
    );
  }
}

function mapStateToProps(state) {
  const categoryList = state.get('homeReducer').get('categoryList');
  return {
    billList: state.get('homeReducer').get('billList'),
    categoryNameDict: Object.assign({}, ...categoryList.map((x) => ({[x.id]: x.name}))),
    monthList: state.get('homeReducer').get('monthList'),
    filteredBills: state.get('homeReducer').get('filteredBills')
  }
}

const mapDispatchToProps = (dispatch) => ({
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
  }
});

// 连接comboStore和Home组件
export default connect(mapStateToProps, mapDispatchToProps)(Home)