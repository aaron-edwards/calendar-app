import { Grid, Typography, useTheme } from '@mui/material';
import { addDays, differenceInCalendarDays, format, isEqual } from 'date-fns';
import React from 'react';

type Props = {
  start: Date;
  end: Date;
};

export function Calendar({ start, end }: Props) {
  const columns = Math.min(7, differenceInCalendarDays(end, start));
  const theme = useTheme();
  const borderColour =
    theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 200];
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
              borderBottom: `2px solid ${borderColour}`,
              borderLeft: index > 0 ? `1px solid ${borderColour}` : undefined,
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
