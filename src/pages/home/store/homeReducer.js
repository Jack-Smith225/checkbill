// import {constants} from './index';
import {fromJS} from "immutable";
import {constants} from "./index";

const defaultState = fromJS({
  billList: [],
  categoryList: [],
  categoryNameDict: {}
})

const homeReducer = (homeState = defaultState, homeAction) => {
  switch (homeAction.type) {
    case constants.CHANGE_BILL_DATA:
      return homeState.set('billList', homeAction.billList);
    case constants.GET_CATEGORY_DATA:
      return homeState.set('categoryList', homeAction.categoryList)
          .set('categoryNameDict', Object.assign({}, ...homeAction.categoryList.map((x) => ({[x.id]: x.name}))));

    default:
      return homeState;
  }
}

export default homeReducer;