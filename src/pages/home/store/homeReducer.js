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
  showAddForm: false,
  recordAddFlag: true
})

const homeReducer = (homeState = defaultState, homeAction) => {

  switch (homeAction.type) {
    case constants.GET_BILL_DATA:
      return getBillData();
    case constants.GET_CATEGORY_DATA:
      return homeState.set('categoryList', homeAction.categoryList);
    case constants.FILTER_BILLLIST:
      return filterBillList();
    case constants.SUBMIT_ADD_RECORD:
      return submitAddRecord();
    case constants.SHOW_ADD_FORM:
      return homeState.set('showAddForm', true);
    case constants.HIDE_ADD_FORM:
      return homeState.set('showAddForm', false);
    case constants.RESET_SELECT_MONTH:
      var filteredBills = homeState.get('billList');
      return homeState.set('selectedMonth', "全部数据")
          .set('filteredBills', filteredBills);
    default:
      return homeState;
  }

  function filterBillList() {
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
  }

  function submitAddRecord() {
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

    let recordAddFlag = !homeState.get('recordAddFlag');

    return homeState.set('billList', temp)
        .set('filteredBills', filteredBills)
        .set('recordAddFlag', recordAddFlag);
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