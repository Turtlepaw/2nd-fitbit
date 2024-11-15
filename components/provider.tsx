import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Configuration,
  FitbitProviderData,
} from "@beaverfy/expo-fitbit/build/types/client";
import { FitbitClient } from "@beaverfy/expo-fitbit";

interface DataContextProps {
  children: ReactNode;
  configuration: Configuration;
}

interface ContextData {
  target: FitbitProviderData;
  source: FitbitProviderData;
}

const DataContext = createContext<ContextData | undefined>(undefined);

export const FitbitProvider: React.FC<DataContextProps> = ({
  children,
  configuration,
}) => {
  const target = new FitbitClient({
    ...configuration,
  }).useConfiguration();
  const source = new FitbitClient({
    ...configuration,
  }).useConfiguration();

  const value: ContextData = {
    target,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useFitbitProvider = (): FitbitProviderData => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
