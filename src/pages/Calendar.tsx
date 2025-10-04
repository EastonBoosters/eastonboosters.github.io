import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const Calendar: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calendar
        </Typography>
        <Paper sx={{ p: 2 }}>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID"
            style={{ border: 0, width: "100%", height: "600px" }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </Paper>
      </Box>
    </Container>
  );
};

export default Calendar;
