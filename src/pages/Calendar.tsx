import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

// Replace the placeholder YOUR_CALENDAR_ID with your actual Google Calendar ID
// You can find it in your Google Calendar settings under "Integrate calendar"
const calendarId = "YOUR_CALENDAR_ID_GOES_HERE";

const Calendar: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calendar
        </Typography>
        <Paper sx={{ p: 2 }}>
          {calendarId.includes("YOUR_CALENDAR_ID") ? (
            <Typography variant="h6" color="error" align="center">
              Please replace "YOUR_CALENDAR_ID_GOES_HERE" in the code with your
              actual Google Calendar ID.
            </Typography>
          ) : (
            <iframe
              src={`https://calendar.google.com/calendar/embed?src=${calendarId}`}
              style={{ border: 0, width: "100%", height: "600px" }}
              frameBorder="0"
              scrolling="no"
            ></iframe>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Calendar;
