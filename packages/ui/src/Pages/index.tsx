import { Box } from '@mui/material';
import AuthenticationPage from './AuthenticationPage';
import SettingsPage from './SettingsPage';

// eslint-disable-next-line import/prefer-default-export
export enum Page {
  Settings = 'Settings',
  User = 'User',
}

const pages: Record<Page, JSX.Element> = {
  [Page.Settings]: <SettingsPage />,
  [Page.User]: <AuthenticationPage />,
};

export default function SidePages({ page }: { page: Page }) {
  return (
    <Box
      sx={(theme) => ({
        overflowY: 'auto',
        [theme.breakpoints.down('sm')]: {
          height: 300,
        },
        [theme.breakpoints.up('sm')]: {
          width: 360,
        },
      })}
    >
      {pages[page]}
    </Box>
  );
}
