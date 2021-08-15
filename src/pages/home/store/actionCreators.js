// eslint-disable-next-line
import React from 'react';
import {constants} from "./index";
import axios from "axios";

export const getBillData = () => {
  return (dispatch) => {
    axios.get('/api/bill.csv').then((res) => {
      const ret = [];
      const arr = res.data.split("\n");
      for (let i = 1; i < arr.length; i++) {
        const singleArr = arr[i].split(",");
        const singleBill = {
          type: singleArr[0],
          time: singleArr[1],
          category: singleArr[2],
          amount: singleArr[3]
        }
        ret.push(singleBill)
      }
      const action = {
        type: constants.GET_BILL_DATA,
        billList: ret
      }
      dispatch(action);
    });
  };
}

export const getCategoryData = () => {
  return (dispatch) => {
    axios.get('/api/categories.csv').then((res) => {
      const ret = [];
      const arr = res.data.split("\n");
      for (let i = 0; i < arr.length; i++) {
        const singleArr = arr[i].split(",");
        const singleCategory = {
          id: singleArr[0],
          type: singleArr[1],
          name: singleArr[2]
        }
        ret.push(singleCategory)
      }
      const action = {
        type: constants.GET_CATEGORY_DATA,
        categoryList: ret
      }
      dispatch(action)
    })
  }
};

export const filterBillList = function (value) {
  return {
    type: constants.FILTER_BILLLIST,
    month: value
  }
}

export const alterType = function (billType) {
  return {
    type: constants.ALTER_TYPE,
    value: billType
  }
};

export const alterDate = function (localDateStr) {
  return {
    type: constants.ALTER_DATE,
    value: localDateStr
  }
};

export const alterCategory = (value) => ({
  type: constants.ALTER_CATEGORY,
  value: value
})

export const alterAmount = (amount) => ({
  type: constants.ALTER_AMOUNT,
  value: amount
})

export const submit = (recordToAdd) => ({
  type: constants.SUBMIT,
  value: recordToAdd
})

export const showAddForm = () => ({
  type: constants.SHOW_ADD_FORM,
})

export const hideAddForm = () => ({
  type: constants.HIDE_ADD_FORM,
})