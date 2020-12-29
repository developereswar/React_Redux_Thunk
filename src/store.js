import { combineReducers, createStore, applyMiddleware } from "redux";
import { loginauth, devicelist, deviceDetail} from "./reducers/postreducer";
import ReduxThunk from "redux-thunk";
const rootReducer = combineReducers({
  loginauth: loginauth,
  devicelist: devicelist,
  deviceDetail:deviceDetail
});

// var token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJJbnR1Q2FuZGlkYXRlIiwicGFzcyI6IkludHVUZXN0In0sImlhdCI6MTU2MTgwODgwNSwiZXhwIjoxNTYxODEyNDA1fQ.r1z6eGV0sP3FzrAycQ6gvtR9AxCD_R2Pq3cxllRY1UE";
// localStorage.setItem("token", token);
export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
