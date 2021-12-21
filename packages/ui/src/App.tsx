import { Paper, Slide } from '@mui/material';
import { useCallback, useState } from 'react';
import Menu from './Menu';
import Pages, { Page } from './Pages';

type State = {
  page: Page;
  menuOpen: boolean;
};

function App() {
  const [{ page, menuOpen }, setState] = useState<State>({ page: Page.Settings, menuOpen: false });
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
      <Paper sx={{ zIndex: 1 }} square elevation={4}>
        <Menu page={menuOpen ? page : undefined} setPage={setPage} />
      </Paper>
      <Slide direction="right" in={menuOpen} mountOnEnter unmountOnExit>
        <Paper square elevation={2} sx={{ width: 300 }}>
          <Pages page={page} />
        </Paper>
      </Slide>
    </Paper>
  );
}

export default App;
