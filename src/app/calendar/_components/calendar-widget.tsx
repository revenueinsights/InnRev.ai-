'use client';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { Toolbar } from './toolbar';
import { DateCellWrapper } from './date-cell-wrapper';

const localizer = momentLocalizer(moment);

export function CalendarWidget() {
  return (
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      resourceAccessor="resource"
      view="month"
      components={{
        toolbar: Toolbar,
        dateCellWrapper: DateCellWrapper,
      }}
      className="section-bg p-5 rounded-[30px]"
    />
  );
}
