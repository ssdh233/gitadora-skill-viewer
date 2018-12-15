import { SET_KASEGI_DATA } from "./actions";

const initialState = {
  kasegiData: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_KASEGI_DATA:
      return Object.assign({}, state, {
        kasegiData: action.data
      });
    default:
      return state;
  }
}
