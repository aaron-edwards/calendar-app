import { Box, Collapse, Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import CalendarContainer from './Calendar/CalendarContainer';
import Menu from './Menu';
import Pages, { Page } from './Pages';

type State = {
  page: Page;
  menuOpen: boolean;
};

function App() {
  const [{ page, menuOpen }, setState] = useState<State>({
    page: Page.Settings,
    menuOpen: false,
  });
  const setPage = useCallback(
    (newPage: Page) => {
      if (newPage) {
        setState({ menuOpen: true, page: newPage });
      } else {
        setState((state) => ({ menuOpen: false, page: state.page }));
      }
    },
    [setState]
  );

  return (
    <Paper
      square
      elevation={0}
      sx={{
        height: '100vh',
        display: 'flex',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Paper sx={{ zIndex: 1 }} square elevation={4}>
          <Menu page={menuOpen ? page : undefined} setPage={setPage} />
        </Paper>
        <Collapse
          orientation="horizontal"
          in={menuOpen}
          mountOnEnter
          unmountOnExit
        >
          <Paper square elevation={2} sx={{ height: '100%', width: 300 }}>
            <Pages page={page} />
          </Paper>
        </Collapse>
      </Box>
      <CalendarContainer />
    </Paper>
  );
}

export default App;
