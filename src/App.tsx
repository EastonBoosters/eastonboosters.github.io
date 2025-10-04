import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import About from "./pages/About";
import Merch from "./pages/Merch";
import Photos from "./pages/Photos";
import Contact from "./pages/Contact";
import "./App.css";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/about" element={<About />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
