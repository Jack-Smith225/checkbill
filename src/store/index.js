import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import comoboReducer from './comboReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const comboStore =createStore(comoboReducer, composeEnhancers(
    applyMiddleware(thunk)
))

export default comboStore