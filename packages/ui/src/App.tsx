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
          <Menu page={currentPage} setPage={setPage} />
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
