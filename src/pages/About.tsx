import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

interface BoardMember {
  name: string;
  role: string;
  bio?: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Ryan Bugbee",
    role: "President",
    bio: "The President role is the main leadership role in the boosters, if you see Ryan at the Easton high school or Junior High School Soccer or Basketball games feel free to ask him about the boosters!",
  },
  {
    name: "Nicole King",
    role: "Vice President",
    bio: "The Vice President is our second leadership position. Nicole is often at both Soccer and Basketball games cheering on the Bears.",
  },
  {
    name: "Jillian Cote",
    role: "Secretary",
    bio: "The Secretary keeps the boosters organized and moving forward. Jillian is also often at the High School Soccer and BasketBall games.",
  },
  {
    name: "Kathy Gundy",
    role: "Treasurer",
    bio: "The treasurer keeps track of all of our expenses and net assets. Kathy is also normally seen at both High School and Jr High soccer games and coaching the Cheerleaders at Basketball and other events.",
  },
];

const About: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography>
            The Easton Boosters are dedicated to supporting the students and
            programs of Easton Jr/Sr High School. Our mission is to foster a
            community of support for academic, athletic, and extracurricular
            activities, ensuring every student has the opportunity to succeed.
          </Typography>
        </Paper>
        <Typography variant="h5" component="h2" gutterBottom>
          Board of Directors
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {boardMembers.map((member, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {member.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {member.role}
                  </Typography>
                  <Typography variant="body2">{member.bio}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
