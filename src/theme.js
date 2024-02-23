const COLORS = {
  white: "white",
  black: "black",
  black_87: "rgba(0, 0, 0, 0.87)",
  darkGray: "#333333"
};

const theme = {
  // TODO might need main text color
  header: {
    title: COLORS.black_87,
    bottomLine: COLORS.black
  },
  index: {
    subHeader: COLORS.white,
    subHeaderBg: COLORS.darkGray
  }
};

export default theme;
