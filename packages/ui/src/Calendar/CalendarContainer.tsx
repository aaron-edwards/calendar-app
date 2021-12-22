import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import useTime from '../hooks/useTime';

const UPDATE_TIME = 60_000;

export default function CalendarContainer() {
  const time = useTime(UPDATE_TIME);
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography>{format(time, 'yyyy-MM-dd HH:mm:ss')}</Typography>
    </Box>
  );
}
