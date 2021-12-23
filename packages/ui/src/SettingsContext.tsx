import { createTheme, Theme, ThemeProvider } from '@mui/material';
import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import merge from 'lodash.merge';
import { DeepPartial } from './types';

export type Settings = {
  theme: {
    palette: {
      mode: 'light' | 'dark';
    };
  };
};

type UpdateSettings = (newSettings: DeepPartial<Settings>) => void;

export const defaultSettings: Settings = {
  theme: {
    palette: {
      mode: 'dark',
    },
  },
};

export const SettingsContext = createContext<{
  settings: Settings;
  updateSettings: UpdateSettings;
}>({
  settings: defaultSettings,
  updateSettings: (settings) => settings,
});

export const SettingsProvider: FC = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const updateSettings = useCallback(
    (newSettings: DeepPartial<Settings>) =>
      setSettings((s) => merge({}, s, newSettings)),
    [setSettings]
  );
  const theme = useMemo<Theme>(
    () => createTheme(settings.theme),
    [settings.theme]
  );
  const value = useMemo(
    () => ({ settings, updateSettings }),
    [settings, updateSettings]
  );

  useEffect(
    () => updateSettings(JSON.parse(localStorage.getItem('settings') ?? '{}')),
    []
  );
  useEffect(
    () => localStorage.setItem('settings', JSON.stringify(settings)),
    [settings]
  );

  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SettingsContext.Provider>
  );
};
