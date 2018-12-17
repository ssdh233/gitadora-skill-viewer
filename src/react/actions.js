export const SET_IS_SSR = "SET_IS_SSR";
export const SET_KASEGI_DATA = "SET_KASEGI_DATA";

export function setIsSSR(value) {
  return { type: SET_IS_SSR, value };
}

export function setKasegiData(data) {
  return { type: SET_KASEGI_DATA, data };
}
