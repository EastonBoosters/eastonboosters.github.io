import React from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";

const Merch: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Merchandise
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography paragraph>
            Support the Easton Bears by purchasing from our official merchandise
            store.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="https://shop.verticalraise.com/shops/maine/easton/easton-bears-boosters"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Store
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Merch;
