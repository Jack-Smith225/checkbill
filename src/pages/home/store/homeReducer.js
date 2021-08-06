// import {constants} from './index';
import {fromJS} from "immutable";

const defaultState = fromJS({

})

const homeReducer = (homeState=defaultState, homeAction) =>{
  switch (homeAction.type) {
    default:
      return homeState;
  }
}

export default homeReducer;