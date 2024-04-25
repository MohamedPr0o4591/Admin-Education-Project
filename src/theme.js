export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          background: {
            mainDefault: "#818d99",
          },
        }
      : {
          // palette values for dark mode
        }),
  },
});
