import {combineReducers} from "redux-immutable";
import {homeReducer} from "../pages/home/store";


const comboReducer = combineReducers({
  homeReducer: homeReducer,
})

export default comboReducer
