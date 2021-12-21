import { Box, List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from '@mui/material';
import React, { useCallback, useContext } from 'react';
import { SettingsContext } from '../SettingsContext';

export default function SettingsPage() {
  const { settings, updateSettings } = useContext(SettingsContext);
  const updateThemeMode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      updateSettings({ theme: { palette: { mode: e.target.checked ? 'dark' : 'light' } } }),
    [updateSettings]
  );
  return (
    <Box>
      <Typography variant="h3">Settings</Typography>
      <List>
        <ListItem aria-label="dark-mode">
          <ListItemIcon />
          <ListItemText primary="Use dark mode" id="dark-mode-label" />
          <Switch
            aria-label="Use dark mode"
            inputProps={{
              'aria-labelledby': 'dark-mode-label',
            }}
            checked={settings.theme.palette.mode === 'dark'}
            onChange={updateThemeMode}
          />
        </ListItem>
      </List>
    </Box>
  );
}
