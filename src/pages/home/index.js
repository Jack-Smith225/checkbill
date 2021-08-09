import {PureComponent} from "react";
import {connect} from "react-redux";
import React from "react";
import {Upload, Button, Table} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import jschardet from 'jschardet';
import {actionCreators} from "./store";
import 'antd/dist/antd.css';
import './index.css'


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
        key: 'time'
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
        <div>
          home page
          <Table columns={columns} dataSource={this.props.billList}
                 rowKey={record => record.time + record.category + record.amount}
          />
        </div>
    );
  }

}

const mapStateToProps = (state) => ({
  billList: state.get('homeReducer').get('billList'),
  categoryList: state.get('homeReducer').get('categoryList'),
  categoryNameDict: state.get('homeReducer').get('categoryNameDict')
})

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