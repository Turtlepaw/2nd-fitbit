import { StyleSheet, useWindowDimensions } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useAccounts } from "@/components/useAccount";
import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { Button, TouchableRipple, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useDarkText } from "@/components/darkText";
import { Center } from "@/components/flex";

export default function SettingsScreen() {
  const { sourceAccount, targetAccount } = useAccounts();
  const darkText = useDarkText({
    fontSize: 19,
    fontWeight: "400",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={darkText}>Manage and connect sync accounts</Text>
      <View style={{ paddingVertical: 5 }} />
      <SettingMenu
        icon={(props) => <MaterialIcons name="source" {...props} />}
        title="Source Account"
        description="This is where data will come from"
      >
        <Center>
          <Button
            mode="contained-tonal"
            disabled={sourceAccount == null}
            onPress={() => sourceAccount?.promptAsync()}
            style={{
              marginTop: 10,
            }}
          >
            {targetAccount != null ? "Rec" : "C"}onnect Account
          </Button>
        </Center>
      </SettingMenu>
      <SettingMenu
        icon={(props) => <MaterialIcons name="create" {...props} />}
        title="Target Account"
        description="This is where data from the source will be synced to"
      >
        <Center>
          <Button
            mode="contained-tonal"
            disabled={targetAccount == null}
            onPress={() => targetAccount?.promptAsync()}
            style={{
              marginTop: 10,
            }}
          >
            {targetAccount != null ? "Rec" : "C"}onnect Account
          </Button>
        </Center>
      </SettingMenu>
    </View>
  );
}

export function SettingMenu({
  children,
  title,
  description,
  icon,
}: PropsWithChildren<{
  title: string;
  description: string;
  icon: (props: { color: string; size: number }) => ReactElement;
}>) {
  const [isOpen, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const darkText = useDarkText(
    {
      fontSize: 19,
      fontWeight: "400",
    },
    theme
  );
  return (
    <View>
      <TouchableRipple
        onPress={() => {
          setOpen(!isOpen);
        }}
        style={{ minWidth: width, height: 50 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center", //Centered vertically
            alignItems: "center", //Centered horizontally
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", paddingLeft: 10 }}>
            <View style={{ paddingTop: 5 }}>
              {icon({
                color: theme.colors.secondary,
                size: 23,
              })}
            </View>
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 20,
                fontWeight: "normal",
                color: theme.colors.onBackground,
              }}
            >
              {title}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 5,
            }}
          >
            <MaterialIcons
              color={theme.dark ? "white" : "black"}
              name={isOpen ? "chevron-right" : "chevron-left"}
              style={{
                transform: [{ rotate: "-90deg" }],
              }}
              size={28}
            />
          </View>
        </View>
      </TouchableRipple>
      {isOpen && (
        <View>
          <View
            style={{
              paddingLeft: 45,
            }}
          >
            <Text style={darkText}>{description}</Text>
          </View>
          {children}
        </View>
      )}
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
