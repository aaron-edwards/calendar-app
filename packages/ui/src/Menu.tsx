import { SettingsTwoTone } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useCallback } from 'react';
import { Page } from './Pages';

type Props = {
  page?: Page;
  setPage: (page: Page) => void;
};

const Menu = ({ page, setPage }: Props) => {
  const handleChange = useCallback(
    (_, nextView) => setPage(nextView),
    [setPage, page]
  );
  return (
    <ToggleButtonGroup
      orientation="vertical"
      exclusive
      size="large"
      value={page}
      onChange={handleChange}
    >
      <ToggleButton value={Page.Settings} aria-label="settings">
        <SettingsTwoTone />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Menu;
