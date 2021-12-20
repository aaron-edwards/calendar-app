import { IconButton, Box, Paper, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useCallback, useState } from 'react';

enum Pages {
  Settings = 'Settings',
}

function App() {
  const [currentPage, setPage] = useState<Pages | undefined>(undefined);
  const onSettings = useCallback(
    () => setPage((page) => (page === Pages.Settings ? undefined : Pages.Settings)),
    [setPage]
  );
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
      }}
    >
      <Paper
        square
        elevation={2}
        sx={{
          width: 'auto',
          height: '100vh',
          display: 'flex',
        }}
      >
        <Paper square elevation={currentPage ? 2 : undefined}>
          <IconButton size="large" onClick={onSettings}>
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </Paper>
        {currentPage && (
          <Box sx={{ width: 300 }}>
            <Typography variant="h4">{currentPage}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default App;
