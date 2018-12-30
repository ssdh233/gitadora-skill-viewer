export const SET_IS_SSR = "SET_IS_SSR";
export const SET_KASEGI_DATA = "SET_KASEGI_DATA";
export const SET_KASEGI_COMPARED_SKILL = "SET_KASEGI_COMPARED_SKILL";
export const SET_LIST_DATA = "SET_LIST_DATA";
export const SET_SKILL_DATA = "SET_SKILL_DATA";

export function setIsSSR(value) {
  return { type: SET_IS_SSR, value };
}

export function setKasegiData(data) {
  return { type: SET_KASEGI_DATA, data };
}

export function setKasegiComparedSkill(data) {
  return { type: SET_KASEGI_COMPARED_SKILL, data };
}

export function setListData(data) {
  return { type: SET_LIST_DATA, data };
}

export function setSkillData(data) {
  return { type: SET_SKILL_DATA, data };
}
