import { create } from "zustand";
import Constants from "expo-constants";
import { OAuthStorageValue } from "@beaverfy/expo-fitbit/build/types/api";
import { FitbitProviderData } from "@beaverfy/expo-fitbit/build/types/client";
import { FitbitClient } from "@beaverfy/expo-fitbit";
import { MMKV } from "react-native-mmkv";
import { Platform } from "react-native";

export const storage = new MMKV({
  id: `authentication`,
  encryptionKey:
    Platform.OS != "web" ? process.env.EXPO_PUBLIC_ENCRYPTION_KEY : undefined,
});

export interface AccountStoreData {
  /**
   * Target account (where the data is going to) for syncing
   * @returns Fitbit provider or null if not initialized
   */
  targetAccount: FitbitProviderData | null;
  /**
   * Source account (where the data is coming from) for syncing
   * @returns Fitbit provider or null if not initialized
   */
  sourceAccount: FitbitProviderData | null;
  setTargetAccount: (data: FitbitProviderData) => void;
  setSourceAccount: (data: FitbitProviderData) => void;
}

export const useAccounts = create<AccountStoreData>()((set) => ({
  sourceAccount: null,
  targetAccount: null,
  setSourceAccount(data) {
    return set({
      sourceAccount: data,
    });
  },
  setTargetAccount(data) {
    return set({
      targetAccount: data,
    });
  },
}));

/**
 * Creates a new `FitbitClient` to manage authentication
 */
export function useInitializeAccount() {
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET;
  const appScheme = Constants.expoConfig?.scheme;
  if (typeof clientId != "string" || typeof clientSecret != "string")
    throw Error(
      "Cannot access EXPO_PUBLIC env variables, consider making a .env file in the root"
    );
  if (typeof appScheme != "string")
    throw Error(
      "expoConfig.scheme is not a string, consider adding a 'scheme' to your expo config"
    );

  return {
    target: new FitbitClient({
      clientId,
      clientSecret,
      appScheme,
      scopes: [],
      debugLogs: true,
      storage: {
        get: (key) => storage.getString(key),
        set: (key, value) => storage.set(key, value),
      },
    }).useConfiguration(),
    source: new FitbitClient({
      clientId,
      clientSecret,
      appScheme,
      scopes: [],
      debugLogs: true,
      storage: {
        get: (key) => storage.getString(key),
        set: (key, value) => storage.set(key, value),
      },
    }).useConfiguration(),
  };
}
