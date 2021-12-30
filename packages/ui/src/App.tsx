import { Box, Collapse, Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import CalendarContainer from './components/Calendar/CalendarContainer';
import Menu from './components/Menu';
import Pages, { Page } from './components/Pages';

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
    <>
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
      <Box sx={{ width: '100%', height: '100%' }}>
        <CalendarContainer />
      </Box>
    </>
  );
}

export default App;
