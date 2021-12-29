import { createTheme, Theme, ThemeProvider } from '@mui/material';
import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  Dispatch,
} from 'react';
import merge from 'lodash.merge';
import { Calendar, DeepPartial } from '../types';

export type Settings = {
  theme: {
    palette: {
      mode: 'light' | 'dark';
      primary: { main: string };
      secondary: { main: string };
    };
  };
  calendar: {
    calendars?: Record<string, Calendar>;
  };
};

type UpdateSettings = (newSettings: DeepPartial<Settings>) => void;

export const defaultSettings: Settings = {
  theme: {
    palette: {
      mode: 'dark',
      primary: { main: '#009688' },
      secondary: { main: '#f44336' },
    },
  },
  calendar: {
    calendars: {},
  },
};

export const SettingsContext = createContext<{
  settings: Settings;
  updateSettings: UpdateSettings;
  setSettings: Dispatch<React.SetStateAction<Settings>>;
}>({
  settings: defaultSettings,
  setSettings: () => undefined,
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
    () => ({ settings, updateSettings, setSettings }),
    [settings, updateSettings, setSettings]
  );

  useEffect(
    () => updateSettings(JSON.parse(localStorage.getItem('settings') ?? '{}')),
    []
  );
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SettingsContext.Provider>
  );
};
