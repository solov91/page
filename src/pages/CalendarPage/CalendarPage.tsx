
import { CalendarGrid } from '../../components/Calendar';
import { Monitor } from '../../components/Calendar';
import { Title } from '../../components/Calendar';

import './CalendarPage.scss';

export const CalendarPage = () => {

  return (
    <div className="calendar">
      <div className="calendar__container">
        <Title />
        <Monitor />
        <CalendarGrid />
      </div>
    </div>
  );
};
