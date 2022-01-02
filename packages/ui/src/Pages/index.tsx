import { Box } from '@mui/material';
import SettingsPage from './SettingsPage';

// eslint-disable-next-line import/prefer-default-export
export enum Page {
  Settings = 'Settings',
  User = 'User',
}

const pages: Record<Page, JSX.Element> = {
  [Page.Settings]: <SettingsPage />,
  [Page.User]: <div>User</div>,
};

export default function SidePages({ page }: { page: Page }) {
  return (
    <Box
      sx={(theme) => ({
        overflowY: 'scroll',
        [theme.breakpoints.down('sm')]: {
          height: 300,
        },
        [theme.breakpoints.up('sm')]: {
          width: 300,
        },
      })}
    >
      {pages[page]}
    </Box>
  );
}
