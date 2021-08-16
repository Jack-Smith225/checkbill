// eslint-disable-next-line
import React from 'react';
import {constants} from "./index";
import axios from "axios";

export const getBillData = () => {
  function getBillList(res) {
    const result = [];
    const arr = res.data.split("\n");
    for (let i = 1; i < arr.length; i++) {
      const singleArr = arr[i].split(",");
      const singleBill = {
        type: singleArr[0],
        time: singleArr[1],
        category: singleArr[2],
        amount: singleArr[3]
      }
      result.push(singleBill)
    }
    return result;
  }

  return (dispatch) => {
    axios.get('/api/bill.csv').then((res) => {
      const result = getBillList(res);
      const action = {
        type: constants.GET_BILL_DATA,
        billList: result
      }
      dispatch(action);
    });
  };
}

export const getCategoryData = () => {

  function getCategoryList(res) {
    const result = [];
    const arr = res.data.split("\n");
    for (let i = 0; i < arr.length; i++) {
      const singleArr = arr[i].split(",");
      const singleCategory = {
        id: singleArr[0],
        type: singleArr[1],
        name: singleArr[2]
      }
      result.push(singleCategory)
    }
    return result;
  }

  return (dispatch) => {
    axios.get('/api/categories.csv').then((res) => {
      const result = getCategoryList(res);
      const action = {
        type: constants.GET_CATEGORY_DATA,
        categoryList: result
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

export const submitAddRecord = (recordToAdd) => ({
  type: constants.SUBMIT_ADD_RECORD,
  value: recordToAdd
})

export const showAddForm = () => ({
  type: constants.SHOW_ADD_FORM,
})

export const hideAddForm = () => ({
  type: constants.HIDE_ADD_FORM,
})

export const resetSelectMonth = () => ({
  type: constants.RESET_SELECT_MONTH,
})