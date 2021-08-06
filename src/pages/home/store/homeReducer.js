// import {constants} from './index';
import {fromJS} from "immutable";
import {constants} from "./index";

const defaultState = fromJS({
  billList:[],
  categoryList: []
})

const homeReducer = (homeState=defaultState, homeAction) =>{
  switch (homeAction.type) {
    case constants.CHANGE_BILL_DATA:
      return homeState.set('billList', homeAction.billList)
    default:
      return homeState;
  }
}

export default homeReducer;