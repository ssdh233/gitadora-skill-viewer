import {
  SET_IS_SSR,
  SET_KASEGI_DATA,
  SET_KASEGI_COMPARED_SKILL,
  SET_LIST_DATA
} from "./actions";

const initialState = {
  isSSR: true,
  kasegiData: null,
  kasegiComparedSkill: null,
  listData: null
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
    case SET_KASEGI_COMPARED_SKILL:
      return Object.assign({}, state, {
        kasegiComparedSkill: action.data
      });
    case SET_LIST_DATA:
      return Object.assign({}, state, {
        listData: action.data
      });
    default:
      return state;
  }
}
