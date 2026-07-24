import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { Resume } from "./components/Resume";

const ResumePage = () => (
  <div className="min-h-screen bg-background">
    <Resume />
  </div>
);

// resume.iamgeorge.nl and cv.iamgeorge.nl show the resume at their root, while
// the apex shows Home. Both hosts serve this same bundle, so the choice has to
// be made at runtime from the hostname.
const isResumeHost =
  typeof window !== "undefined" &&
  /^(resume|cv)\./.test(window.location.hostname);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isResumeHost ? <ResumePage /> : <Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  );
}