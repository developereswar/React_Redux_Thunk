import { LOGINAUTH, DEVICELIST, DEVICEDETAIL } from "../actions/actionType";

export const loginauth = (state = null, action) => {
  switch (action.type) {
    case LOGINAUTH:
      return action.payload;
    default:
      return state;
  }
};

export const devicelist = (state = null, action) => {
  switch (action.type) {
    case DEVICELIST:
      return action.payload;
    default:
      return state;
  }
};


export const deviceDetail = (state = null, action) => {
  switch (action.type) {
    case DEVICEDETAIL:
      return action.payload;
    default:
      return state;
  }
};
