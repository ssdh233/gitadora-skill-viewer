import {
  SET_IS_SSR,
  SET_KASEGI_DATA,
  SET_KASEGI_COMPARED_SKILL,
  SET_LIST_DATA,
  SET_SKILL_DATA,
  SET_SKILL_SAVED_LIST,
  SET_SAVED_SKILL_DATA
} from "./actions";

const initialState = {
  isSSR: true,
  // kasegi page
  kasegiData: null,
  kasegiComparedSkill: null,
  // list page
  listData: null,
  // skill page
  skillData: null,
  skillSavedList: null,
  // saved skill page
  savedSkillData: null
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
    case SET_SKILL_DATA:
      return Object.assign({}, state, {
        skillData: action.data
      });
    case SET_SKILL_SAVED_LIST:
      return Object.assign({}, state, {
        skillSavedList: action.data
      });
    case SET_SAVED_SKILL_DATA:
      return Object.assign({}, state, {
        savedSkillData: action.data
      });
    default:
      return state;
  }
}
