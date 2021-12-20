import Settings from '@mui/icons-material/Settings';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useCallback } from 'react';
import { Page } from './Pages';

type Props = {
  page: Page | null;
  setPage: (page: Page) => void;
};

const Menu = ({ page, setPage }: Props) => {
  const handleChange = useCallback((_, nextView) => setPage(nextView), [setPage]);
  return (
    <ToggleButtonGroup orientation="vertical" exclusive size="large" value={page} onChange={handleChange}>
      <ToggleButton value={Page.Settings} aria-label="settings">
        <Settings />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Menu;
