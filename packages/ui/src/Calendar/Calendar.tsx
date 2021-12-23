import { Grid, Typography } from '@mui/material';
import { addDays, differenceInCalendarDays, format, isEqual } from 'date-fns';
import React from 'react';

type Props = {
  start: Date;
  end: Date;
};

export function Calendar({ start, end }: Props) {
  const columns = Math.min(7, differenceInCalendarDays(end, start));
  return (
    <Grid container columns={columns}>
      {Array.from({ length: columns }, (_, index) => {
        const day = addDays(start, index);
        return (
          <Grid
            key={day.getTime()}
            item
            xs={1}
            sx={{
              borderBottom: '1px solid grey',
              borderLeft: index > 0 ? '1px solid grey' : undefined,
            }}
          >
            <Typography variant="h5" textAlign="center">
              {format(day, 'EEEE')}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default React.memo(Calendar, (prevProps, newProps) => {
  return (
    isEqual(prevProps.start, newProps.start) &&
    isEqual(prevProps.end, newProps.end)
  );
});
