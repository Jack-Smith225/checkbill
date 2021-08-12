import {fromJS} from "immutable";
import {constants} from "./index";

const defaultState = fromJS({
  billList: [],
  categoryList: [],
  categoryNameDict: {},
  monthList: [],
  filteredBills: []
})

const homeReducer = (homeState = defaultState, homeAction) => {

  switch (homeAction.type) {
    case constants.GET_BILL_DATA:
      return getBillData();
    case constants.GET_CATEGORY_DATA:
      return homeState.set('categoryList', homeAction.categoryList);
    case constants.FILTER_BILLLIST:
      return filterBillList();
    default:
      return homeState;
  }

  function getMonthList(action) {
    const dateStrList = action.billList.map((x) => (new Date(parseInt(x.time)).toLocaleDateString()));
    // 整理数据格式, 并去重
    let monthList = dateStrList.map((x) => {
      let arr = x.split("/");
      return arr[0] + "/" + arr[1]
    }).filter(function (element, index, self) {
      return index === self.indexOf(element);
    });
    monthList.push('全部数据');
    return monthList;
  }

  function getBillData() {
    return homeState.set('billList', homeAction.billList)
        .set('monthList', getMonthList(homeAction))
        .set('filteredBills', homeAction.billList);
  }

  function filterBillList() {
    if (homeAction.month.includes("/")) {
      let month = homeAction.month.split("/")[1];
      let filteredBills = homeState.get('billList').filter(function (element) {
        let localDateStr = new Date(parseInt(element.time)).toLocaleDateString();
        return localDateStr.split("/")[1] === month;
      });
      return homeState.set('filteredBills', filteredBills);
    } else {
      let billList = homeState.get("billList");
      return homeState.set('filteredBills', billList);
    }
  }
};

export default homeReducer;