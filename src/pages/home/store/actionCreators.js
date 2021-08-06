import React, {Component} from 'react';
import * as d3 from 'd3';
import {constants} from "./index";
import axios from "axios";

export const getBillData = () => {
  return (dispatch) => {
    axios.get('/api/bill.csv').then((res) => {
      const ret = [];
      const arr = res.data.split("\n");
      for (let i = 1; i < arr.length; i++) {
        // console.log(typeof arr[i])
        // console.log(arr[i]);
        const singleArr = arr[i].split(",");
        console.log(singleArr)
        const singleBill = {
          type: singleArr[0],
          time: singleArr[1],
          category: singleArr[2],
          amount: singleArr[3]
        }
        ret.push(singleBill)
      }
      const action = {
        type: constants.CHANGE_BILL_DATA,
        billList: ret
      }
      dispatch(action);
    });
  };
}