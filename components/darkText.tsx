import { TextStyle } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";

const darkText = {
  dark: "#939aa3",
  light: "#4a4d52",
};

export function useDarkText(style?: TextStyle, theme?: MD3Theme) {
  const defaultTheme = useTheme();
  const { dark } = theme ?? defaultTheme;
  return {
    color: dark ? darkText.dark : darkText.light,
    ...style,
  };
}
