import { Box, Theme, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { AuthenticationContext } from './Authentication/AuthenticationContext';
import CalendarContainer from './Calendar/CalendarContainer';
import Drawer from './components/Drawer';

function App() {
  const { user } = useContext(AuthenticationContext);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
      }}
    >
      <Drawer orientation={isMobile ? 'horizontal' : 'vertical'} />
      {user && <CalendarContainer user={user} />}
    </Box>
  );
}

export default App;
