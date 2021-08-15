import {fromJS} from "immutable";
import {constants} from "./index";

const defaultState = fromJS({
  billList: [],
  categoryList: [],
  filteredBills: [],
  recordToAdd: Object.create({
    type: '',
    time: '',
    category: '',
    amount: ''
  }),
  selectedMonth: '',
  showAddForm: false
})

const homeReducer = (homeState = defaultState, homeAction) => {

  switch (homeAction.type) {
    case constants.GET_BILL_DATA:
      return getBillData();
    case constants.GET_CATEGORY_DATA:
      return homeState.set('categoryList', homeAction.categoryList);
    case constants.FILTER_BILLLIST:
      var filteredBills;
      if (homeAction.month.includes("/")) {
        filteredBills = homeState.get('billList').filter(function (element) {
          let localDateStr = new Date(parseInt(element.time)).toLocaleDateString();
          return localDateStr.split("/")[0] + "/" + localDateStr.split("/")[1] === homeAction.month;
        });
      } else {
        filteredBills = homeState.get('billList');
      }
      return homeState.set('filteredBills', filteredBills)
          .set('selectedMonth', homeAction.month);
    case constants.SUBMIT:
      let recordToAdd = homeAction.value;
      let originBillList = homeState.get('billList');
      let temp = [...originBillList];
      temp.push(recordToAdd);

      var filteredBills;
      if (homeState.get("selectedMonth").includes("/")) {
        filteredBills = temp.filter(function (element) {
          let localDateStr = new Date(parseInt(element.time)).toLocaleDateString();
          return localDateStr.split("/")[0] + "/" + localDateStr.split("/")[1] === homeState.get("selectedMonth");
        });
      } else {
        filteredBills = temp;
      }

      return homeState.set('billList', temp)
          .set('filteredBills', filteredBills);
    case constants.SHOW_ADD_FORM:
      return homeState.set('showAddForm', true);
    case constants.HIDE_ADD_FORM:
      return homeState.set('showAddForm', false);
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
};

export default homeReducer;