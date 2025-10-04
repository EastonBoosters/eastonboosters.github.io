import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import SocialWidget from "../components/SocialWidget";

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Announcements/News
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          {/* Add announcements/news content here */}
          <Typography>Welcome to the Easton Boosters website!</Typography>
        </Paper>
        <SocialWidget />
      </Box>
    </Container>
  );
};

export default Home;
