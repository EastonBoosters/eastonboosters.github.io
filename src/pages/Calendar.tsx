import React from 'react';

const Calendar: React.FC = () => {
  return (
    <div>
      <h1>Calendar</h1>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID"
        style={{ border: 0 }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default Calendar;
