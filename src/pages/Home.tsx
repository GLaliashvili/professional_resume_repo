import React from "react";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#222222",
        color: "#e9e9e9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        boxSizing: "border-box",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Metallic COMING SOON badge — raised chrome bezel with engraved inner panel */}
      <div
        style={{
          borderRadius: "9999px",
          padding: "5px",
          // Raised outer bezel: bright top, darker bottom
          background:
            "linear-gradient(180deg, #ffffff 0%, #ededed 42%, #cfcfcf 72%, #e6e6e6 100%)",
          // Cast shadow underneath + bezel highlights/lowlights
          boxShadow: [
            "0 24px 30px -10px rgba(0,0,0,0.72)",
            "0 8px 14px -6px rgba(0,0,0,0.55)",
            "inset 0 2px 2px rgba(255,255,255,0.95)",
            "inset 0 -3px 4px rgba(0,0,0,0.18)",
          ].join(", "),
          marginBottom: "96px",
        }}
      >
        <div
          style={{
            borderRadius: "9999px",
            padding: "19px 50px",
            // Recessed inner face: darker at top edge to read as engraved
            background:
              "linear-gradient(180deg, #dcdcdc 0%, #f1f1f1 55%, #fcfcfc 100%)",
            boxShadow: [
              "inset 0 3px 6px rgba(0,0,0,0.30)",
              "inset 0 6px 10px -6px rgba(0,0,0,0.22)",
              "inset 0 -2px 3px rgba(255,255,255,0.9)",
            ].join(", "),
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "21px",
              fontWeight: 600,
              letterSpacing: "0.32em",
              paddingLeft: "0.32em",
              color: "#565656",
              // Engraved text: dark glyph with a soft light edge below
              textShadow: "0 1px 0 rgba(255,255,255,0.75)",
              fontFamily:
                "'Montserrat', system-ui, -apple-system, sans-serif",
            }}
          >
            COMING SOON
          </span>
        </div>
      </div>

      {/* Intro text */}
      <div
        style={{
          maxWidth: "640px",
          width: "100%",
          lineHeight: 1.7,
          fontSize: "17px",
        }}
      >
        <p style={{ fontWeight: 700, color: "#ffffff", margin: "0 0 28px" }}>
          Hi 👋 I am George
        </p>

        <p style={{ margin: "0 0 20px" }}>
          I'm a 0→1 product leader and a co-founder of{" "}
          <a
            href="https://stackbrowser.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#9a9cf0", textDecoration: "none" }}
          >
            Stack Browser
          </a>
          .
        </p>

        <p style={{ margin: "0 0 28px" }}>
          This page is my digital garden, set to become the space where I'll
          share my thoughts, experiences, and interests such as{" "}
          <em>entrepreneurship</em>, <em>product management</em>, <em>AI</em>,{" "}
          <em>productivity</em>, etc.
        </p>

        <p style={{ margin: 0 }}>
          While my garden is being planted, feel free to visit my{" "}
          <a
            href="https://resume.iamgeorge.nl/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#f8766d", textDecoration: "none" }}
          >
            professional resume
          </a>
        </p>
      </div>
    </div>
  );
}
