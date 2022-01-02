import { Drawer as MuiDrawer, Collapse, Stack, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import Pages, { Page } from '../Pages';
import Menu from './Menu';

type State = {
  page: Page;
  menuOpen: boolean;
};

type Props = {
  orientation?: 'horizontal' | 'vertical';
};

export default function MiniDrawer({ orientation = 'vertical' }: Props) {
  const theme = useTheme();
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
      anchor={orientation === 'vertical' ? 'left' : 'bottom'}
      variant="permanent"
      open={menuOpen}
      PaperProps={{ sx: { position: 'unset' } }}
    >
      <Stack
        direction={orientation === 'vertical' ? 'row' : 'column-reverse'}
        sx={{
          transition: theme.transitions.create('max-height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Menu
          page={menuOpen ? page : undefined}
          setPage={setPage}
          orientation={orientation}
        />
        <Collapse
          orientation={orientation === 'vertical' ? 'horizontal' : 'vertical'}
          in={menuOpen}
          mountOnEnter
          unmountOnExit
        >
          <Pages page={page} isMobile={orientation === 'horizontal'} />
        </Collapse>
      </Stack>
    </MuiDrawer>
  );
}
