const COLORS = {
  // for dark mode
  white: "white",
  lightGray_e3: "#e3e3e3",
  gray_bb: "#bbbbbb",
  darkGray_31: "#313131",
  black_1f: "#1f1f1f",
  black: "black",

  babyBlueEyes: "#a8c7fa",
  folly: "#f50057",

  // for default mode
  blue: "#0000EE",
  red: "red"
};

const defaultTheme = {
  key: "default",
  main: "",
  mainBg: COLORS.white,
  link: COLORS.blue,
  header: {
    title: COLORS.black_1f,
    bottomLine: COLORS.black,
    button: COLORS.black_1f,
    popover: "",
    popoverBg: COLORS.white,
    popoverHeader: "",
    popoverHoverBg: "rgba(0, 0, 0, 0.04)"
  },
  index: {
    subHeader: COLORS.white,
    subHeaderBg: COLORS.darkGray_31,
    imageDesc: COLORS.red,
    imageDescBg: COLORS.white,
    imageOpacity: 1,
    scriptBg: COLORS.lightGray_e3
  },
  skill: {
    profileTableHeader: COLORS.white,
    table: COLORS.black_87,
    tableHeaderBg: COLORS.darkGray_31,
    tableBg: COLORS.black,
    tableBgHexOpacity: "",
    saveButtonOpacity: 1,
    rivalIdInputBorder: "",
    rivalIdInputCaret: "",
    rivalIdInputPlaceholder: ""
  },
  list: {
    table: "",
    tableBg: "",
    tableContent: COLORS.white,
    tableContentBg: COLORS.black
  },
  kasegi: {
    table: COLORS.black,
    tableBg: "",
    tableBgHexOpacity: ""
  }
};

const darkTheme = {
  key: "dark",
  main: COLORS.gray_bb,
  mainBg: COLORS.black_1f,
  link: COLORS.babyBlueEyes,
  header: {
    title: COLORS.gray_bb,
    bottomLine: COLORS.gray_bb,
    button: COLORS.gray_bb,
    popover: COLORS.babyBlueEyes,
    popoverBg: COLORS.darkGray_31,
    popoverHeader: COLORS.gray_bb,
    popoverHoverBg: "rgba(255, 255, 255, 0.08)"
  },
  index: {
    subHeader: COLORS.black_1f,
    subHeaderBg: COLORS.gray_bb,
    imageDesc: COLORS.folly,
    imageDescBg: COLORS.black_1f,
    imageOpacity: 0.4,
    scriptBg: COLORS.darkGray_31
  },
  skill: {
    profileTableHeader: "",
    table: COLORS.black_1f,
    tableHeaderBg: COLORS.darkGray_31,
    tableBg: COLORS.black,
    tableBgHexOpacity: "CC",
    saveButtonOpacity: 0.8,
    rivalIdInputBorder: COLORS.white,
    rivalIdInputCaret: COLORS.white,
    rivalIdInputPlaceholder: COLORS.white
  },
  list: {
    table: COLORS.black_1f,
    tableBg: COLORS.lightGray_e3,
    tableContent: COLORS.gray_bb,
    tableContentBg: COLORS.black_1f
  },
  kasegi: {
    table: COLORS.black_1f,
    tableBg: COLORS.lightGray_e3,
    tableBgHexOpacity: "99"
  }
};

const theme = { default: defaultTheme, dark: darkTheme };

export default theme;
