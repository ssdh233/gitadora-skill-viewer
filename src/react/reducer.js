import { SET_IS_SSR, SET_KASEGI_DATA } from "./actions";

const initialState = {
  isSSR: true,
  kasegiData: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_SSR:
      return Object.assign({}, state, {
        isSSR: action.value
      });
    case SET_KASEGI_DATA:
      return Object.assign({}, state, {
        kasegiData: action.data
      });
    default:
      return state;
  }
}
