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

export default function SidePages({
  page,
  isMobile,
}: {
  page: Page;
  isMobile: boolean;
}) {
  return (
    <Box
      sx={{
        width: isMobile ? undefined : 300,
        height: isMobile ? 300 : undefined,
        overflowY: 'scroll',
      }}
    >
      {pages[page]}
    </Box>
  );
}
