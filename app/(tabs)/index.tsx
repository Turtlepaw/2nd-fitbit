import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useDarkText } from "@/components/darkText";
import { Button } from "react-native-paper";
import { Link, router } from "expo-router";

export default function TabOneScreen() {
  const darkText = useDarkText({
    fontSize: 19,
    fontWeight: "400",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sync Status</Text>
      <Text style={darkText}>No accounts connected</Text>
      <Button
        mode="contained"
        style={{
          marginTop: 15,
        }}
        onPress={() => router.push("/settings")}
      >
        Connect Accounts
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
