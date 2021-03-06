import { render } from '@testing-library/react';
import { addDays, differenceInCalendarDays, format } from 'date-fns';
import Calendar from '../Calendar';

const MONDAY_6_12 = new Date('2021-12-06');
const TUES_7_12 = new Date('2021-12-06');
const FRIDAY_31_12 = new Date('2021-12-31');
const calendars = [];

describe('<Calendar />', () => {
  describe('titles', () => {
    describe('day names', () => {
      it('should display all 7 days if displaying more than a week', () => {
        const { baseElement } = render(
          <Calendar
            start={MONDAY_6_12}
            end={FRIDAY_31_12}
            startOfDay={TUES_7_12}
            calendars={calendars}
          />
        );

        const dayNames = Array.from({ length: 7 }, (_, index) =>
          format(addDays(MONDAY_6_12, index), 'E')
        ).join('');
        expect(baseElement).toHaveTextContent(dayNames);
      });

      it('should only display days covered if less than 7', () => {
        const { baseElement } = render(
          <Calendar
            start={TUES_7_12}
            end={addDays(TUES_7_12, 3)}
            startOfDay={TUES_7_12}
            calendars={calendars}
          />
        );
        const dayNames = Array.from({ length: 3 }, (_, index) =>
          format(addDays(TUES_7_12, index), 'E')
        ).join('');
        expect(baseElement).toHaveTextContent(dayNames);
      });
    });

    describe('dates', () => {
      it('should display month for 1st of month and date for the rest', () => {
        const { baseElement } = render(
          <Calendar
            start={new Date('2021-12-01')}
            end={new Date('2021-12-31')}
            startOfDay={TUES_7_12}
            calendars={calendars}
          />
        );
        const expected = Array.from(
          {
            length: differenceInCalendarDays(
              new Date('2021-12-31'),
              new Date('2021-12-02')
            ),
          },
          (_, i) => format(addDays(new Date('2021-12-02'), i), 'dd')
        ).join('');
        expect(baseElement).toHaveTextContent(`Dec${expected}`);
      });
    });
  });
});
