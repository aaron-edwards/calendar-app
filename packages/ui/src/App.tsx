import { Paper, Slide, Typography } from '@mui/material';
import { useState } from 'react';
import Menu from './Menu';
import { Page } from './Pages';

function App() {
  const [currentPage, setPage] = useState<Page | null>(null);

  return (
    <Paper
      square
      elevation={0}
      sx={{
        height: '100vh',
        display: 'flex',
      }}
    >
      <Paper sx={{ zIndex: 1 }} square elevation={4}>
        <Menu page={currentPage} setPage={setPage} />
      </Paper>
      <Slide direction="right" in={currentPage !== null} mountOnEnter unmountOnExit>
        <Paper square elevation={2} sx={{ width: 300 }}>
          <Typography variant="h4">{currentPage}</Typography>
        </Paper>
      </Slide>
    </Paper>
  );
}

export default App;
