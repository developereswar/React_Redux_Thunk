import { LOGINAUTH, DEVICELIST, DEVICEDETAIL } from "./actionType";
import Axios from "axios";
import { authHeader } from '../gaurd/auth'

export const loginauth = userData => {
  const auth_key = "Basic " + btoa(userData.username + ":" + userData.password);
  return dispatch => {
    Axios.post(
      "https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/login",
      {},
      { headers: { Authorization: auth_key } }
    )
      .then(res => {
      
        dispatch({
          type: LOGINAUTH,
          payload: res.data
        });
      })
      .catch(err => {
          dispatch({
            type: LOGINAUTH,
            payload: {"error":"Invalid Username & Password"}
          });
      });
  };
};

export const deviceList =  () => {
  const token = authHeader();
  return dispatch => {
    Axios.get(
      "https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/devices",
      { headers: { Authorization: token } }
    ).then(res => {
      dispatch({
        type: DEVICELIST,
        payload: res.data
      });
    });
  };
};

export const deviceDetail = deviceNo => {
  const token = authHeader();
  return dispatch => {
    Axios.get(
      `https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest?device=${deviceNo}&page=2`,
      { headers: { Authorization: token } }
    )
      .then(res => {
        dispatch({
          type: DEVICEDETAIL,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: DEVICEDETAIL,
          payload: { error: "Error Connection" }
        });
      });
  };
};


export const logOut = () => {
  return dispatch => {
    localStorage.clear();
  }
}