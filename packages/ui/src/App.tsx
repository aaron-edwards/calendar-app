import { Box, styled } from '@mui/material';
import { useContext } from 'react';
import { AuthenticationContext } from './Authentication/AuthenticationContext';
import CalendarContainer from './Calendar/CalendarContainer';
import Drawer from './components/Drawer';

const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
  },
}));

function App() {
  const { user } = useContext(AuthenticationContext);

  return (
    <Container>
      <Drawer />
      {user && <CalendarContainer user={user} />}
    </Container>
  );
}

export default App;
