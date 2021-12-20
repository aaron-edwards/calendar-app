import { Box, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import Menu from './Menu';
import { Page } from './Pages';

function App() {
  const [currentPage, setPage] = useState<Page | null>(null);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
      }}
    >
      <Paper square elevation={4}>
        <Menu page={currentPage} setPage={setPage} />
      </Paper>
      {currentPage && (
        <Paper elevation={2} square sx={{ width: 300 }}>
          <Typography variant="h4">{currentPage}</Typography>
        </Paper>
      )}
      <Paper elevation={1} square sx={{ flexGrow: 1 }} />
    </Box>
  );
}

export default App;
