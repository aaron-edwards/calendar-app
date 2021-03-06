import { SettingsTwoTone } from '@mui/icons-material';
import { Avatar, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useCallback, useContext } from 'react';
import { AuthenticationContext } from '../Authentication/AuthenticationContext';
import { Page } from '../Pages';

type Props = {
  page?: Page;
  setPage: (page: Page) => void;
  mobile?: boolean;
};

export default function Menu({ page, setPage, mobile = false }: Props) {
  const { user } = useContext(AuthenticationContext);
  const handleChange = useCallback(
    (_, nextView) => setPage(nextView),
    [setPage, page]
  );
  return (
    <ToggleButtonGroup
      orientation={mobile ? 'horizontal' : 'vertical'}
      exclusive
      value={page}
      onChange={handleChange}
    >
      <ToggleButton value={Page.User} aria-label="user">
        <Avatar
          alt={user?.profile.name}
          src={user?.profile.imageUrl}
          sx={{ width: '24px', height: '24px' }}
        />
      </ToggleButton>
      <ToggleButton value={Page.Settings} aria-label="settings">
        <SettingsTwoTone />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
