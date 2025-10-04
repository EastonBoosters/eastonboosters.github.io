import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const boardMembers = [
  { name: "President Placeholder", role: "President" },
  { name: "Vice President Placeholder", role: "Vice President" },
  { name: "Secretary Placeholder", role: "Secretary" },
  { name: "Treasurer Placeholder", role: "Treasurer" },
];

const About: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          {/* Add about content here */}
          <Typography>
            The Easton Boosters are dedicated to supporting the students and
            programs of Easton Jr/Sr High School.
          </Typography>
        </Paper>
        <Typography variant="h5" component="h2" gutterBottom>
          Board of Directors
        </Typography>
        <Paper sx={{ p: 2 }}>
          <List>
            {boardMembers.map((member, index) => (
              <ListItem key={index}>
                <ListItemText primary={member.name} secondary={member.role} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
