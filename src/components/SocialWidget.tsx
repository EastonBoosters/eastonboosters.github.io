import React from "react";
import { Box, Paper } from "@mui/material";

const SocialWidget: React.FC = () => {
  return (
    <Paper>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fyour-facebook-page&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="100%"
          height="500"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </Box>
    </Paper>
  );
};

export default SocialWidget;

