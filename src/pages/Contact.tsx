import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { config, validateEnv } from "../config/env";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setAlertMessage("");

    const envValidation = validateEnv();
    if (!envValidation.isValid) {
      setStatus("error");
      setAlertMessage(
        "API Gateway URL is not configured. Please contact the site administrator."
      );
      console.error("Missing environment variables:", envValidation.missingVars);
      return;
    }

    try {
      const response = await fetch(config.apiGatewayUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setAlertMessage(
          "Message sent successfully! We will get back to you soon."
        );
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setAlertMessage(
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setAlertMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={status === "loading"}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={status === "loading"}
            />
            <Box sx={{ mt: 2, position: "relative" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={status === "loading"}
              >
                Send Message
              </Button>
              {status === "loading" && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </form>
          {alertMessage && (
            <Alert
              severity={status === "success" ? "success" : "error"}
              sx={{ mt: 2 }}
            >
              {alertMessage}
            </Alert>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Contact;
