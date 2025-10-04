import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  ImageList,
  ImageListItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Placeholder for photos
const itemData = [
  {
    img: "https://via.placeholder.com/500x300.png?text=Easton+Bears+Mascot",
    title: "Mascot",
  },
  // Add more placeholder images as needed
];

const Photos: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Photos
        </Typography>
        <Paper sx={{ p: 2 }}>
          <ImageList variant="masonry" cols={isMobile ? 1 : 3} gap={8}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Paper>
      </Box>
    </Container>
  );
};

export default Photos;
