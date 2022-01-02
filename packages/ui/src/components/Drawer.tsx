import {
  Drawer as MuiDrawer,
  Collapse,
  Stack,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { useCallback, useState } from 'react';
import Pages, { Page } from '../Pages';
import Menu from './Menu';

type State = {
  page: Page;
  menuOpen: boolean;
};

export default function MiniDrawer() {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
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
    <MuiDrawer
      // anchor={orientation === 'vertical' ? 'left' : 'bottom'}
      anchor={isMobile ? 'bottom' : 'left'}
      variant="permanent"
      open={menuOpen}
      PaperProps={{ sx: { position: 'unset' } }}
    >
      <Stack direction={['column-reverse', 'row']}>
        <Menu
          page={menuOpen ? page : undefined}
          setPage={setPage}
          mobile={isMobile}
        />
        <Collapse
          orientation={isMobile ? 'vertical' : 'horizontal'}
          in={menuOpen}
          mountOnEnter
          unmountOnExit
        >
          <Pages page={page} />
        </Collapse>
      </Stack>
    </MuiDrawer>
  );
}
