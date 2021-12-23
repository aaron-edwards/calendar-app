import { Box } from '@mui/material';
import { addWeeks, startOfWeek } from 'date-fns';
import useTime from '../hooks/useTime';
import Calendar from './Calendar';

const UPDATE_TIME = 5_000;
const WEEK_STARTS_ON = 1;
const WEEKS_TO_DISPLAY = 5;

export default function CalendarContainer() {
  const currentTime = useTime(UPDATE_TIME);
  const start = startOfWeek(currentTime, { weekStartsOn: WEEK_STARTS_ON });
  const end = addWeeks(start, WEEKS_TO_DISPLAY);
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Calendar start={start} end={end} />
    </Box>
  );
}
