import { ViewProps, View, ViewStyle, StyleSheet } from "react-native";

export function Row({ style, ...props }: ViewProps) {
  return <View style={[{ flexDirection: "row" }, style]} {...props} />;
}

export function Column({ style, ...props }: ViewProps) {
  return <View style={[{ flexDirection: "column" }, style]} {...props} />;
}

export function Center({
  style,
  disabled = false,
  ...props
}: ViewProps & { disabled?: boolean }) {
  return (
    <View style={[!disabled && { ...styles.centerItems }, style]} {...props} />
  );
}

export function Stack({
  dir,
  ...props
}: ViewProps & { dir: "vertical" | "horizontal" }) {
  return dir == "horizontal" ? <Column {...props} /> : <Row {...props} />;
}

export function SmartStack({
  style,
  children,
  containerStyle,
  dir,
  ...props
}: ViewProps & {
  containerStyle?: ViewStyle;
  dir: "vertical" | "horizontal";
}) {
  return (
    <View
      style={[
        { flexDirection: dir == "horizontal" ? "column" : "row" },
        containerStyle,
      ]}
      {...props}
    >
      {Array.isArray(children)
        ? children.map((item, index) => (
            <View key={index} style={style}>
              {item}
            </View>
          ))
        : children}
    </View>
  );
}

export function SmartRow({
  style,
  children,
  containerStyle,
  ...props
}: ViewProps & {
  containerStyle?: ViewStyle;
}) {
  return (
    <View style={[{ flexDirection: "row" }, containerStyle]} {...props}>
      {Array.isArray(children)
        ? children.map((item, index) => (
            <View key={index} style={style}>
              {item}
            </View>
          ))
        : children}
    </View>
  );
}

const styles = StyleSheet.create({
  centerItems: {
    alignItems: "center",
    justifyContent: "center",
  },
});
