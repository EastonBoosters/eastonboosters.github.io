import React, { useState } from "react";
import { Box, Tab, Tabs, Paper, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`social-tabpanel-${index}`}
      aria-labelledby={`social-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SocialWidget: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="social media tabs"
          centered
        >
          <Tab
            label="Facebook"
            id="social-tab-0"
            aria-controls="social-tabpanel-0"
          />
          <Tab
            label="Instagram"
            id="social-tab-1"
            aria-controls="social-tabpanel-1"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fyour-facebook-page&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="100%"
          height="500"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>
          Instagram embedding requires a third-party service for a full feed.
          For now, you can embed individual posts or link to your profile.
        </Typography>
        {/* Placeholder for Instagram embed */}
      </TabPanel>
    </Paper>
  );
};

export default SocialWidget;
