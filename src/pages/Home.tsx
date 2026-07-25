import React from "react";

export default function Home() {
  // Press-and-hold raises the hand on touch. Desktop keeps using :hover; this
  // is the touch equivalent, held for the duration of the press rather than
  // latched by a tap. Mouse users get it too, which costs nothing.
  const [raised, setRaised] = React.useState(false);

  // One-shot attention wave: hand up 1s after load, back down 750ms later.
  // Never repeats — it is a greeting, not an idle loop.
  const [autoWave, setAutoWave] = React.useState(false);
  const timers = React.useRef<number[]>([]);

  const cancelAutoWave = React.useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setAutoWave(false);
  }, []);

  React.useEffect(() => {
    timers.current = [
      window.setTimeout(() => setAutoWave(true), 1000),
      window.setTimeout(() => setAutoWave(false), 1750),
    ];
    // clearing on unmount stops a timer firing into an unmounted component
    return cancelAutoWave;
  }, [cancelAutoWave]);

  // A press during the greeting cancels it outright. Without this the pending
  // 1750ms timer would drop the hand mid-press, or leave it up after release.
  const press = () => {
    cancelAutoWave();
    setRaised(true);
  };

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
      {/* Metallic COMING SOON badge — raised chrome bezel with engraved inner panel.
          It scales like an IMAGE: every dimension below (padding, radius, shadow
          offsets, the gap under it) is expressed in em off this one font-size, so
          shrinking the font shrinks the whole badge uniformly and the aspect ratio
          is fixed by construction. The text can never wrap — see nowrap on the span.
          16.9 is the badge's full width in em, measured from the rendered page; the
          font-size is whatever keeps that width inside the viewport less the 24px
          page padding on each side, capped at the 21px desktop size. Re-measure that
          divisor if the wording, weight, tracking or padding ever changes. */}
      <div
        style={{
          fontSize: "min(21px, calc((100vw - 48px) / 16.9))",
          borderRadius: "9999px",
          padding: "0.238em",
          // Raised outer bezel: bright top, darker bottom
          background:
            "linear-gradient(180deg, #ffffff 0%, #ededed 42%, #cfcfcf 72%, #e6e6e6 100%)",
          // Cast shadow underneath + bezel highlights/lowlights
          boxShadow: [
            "0 1.143em 1.429em -0.476em rgba(0,0,0,0.72)",
            "0 0.381em 0.667em -0.286em rgba(0,0,0,0.55)",
            "inset 0 0.095em 0.095em rgba(255,255,255,0.95)",
            "inset 0 -0.143em 0.19em rgba(0,0,0,0.18)",
          ].join(", "),
          marginBottom: "4.571em",
        }}
      >
        <div
          style={{
            borderRadius: "9999px",
            padding: "0.905em 2.381em",
            // Recessed inner face: darker at top edge to read as engraved
            background:
              "linear-gradient(180deg, #dcdcdc 0%, #f1f1f1 55%, #fcfcfc 100%)",
            boxShadow: [
              "inset 0 0.143em 0.286em rgba(0,0,0,0.30)",
              "inset 0 0.286em 0.476em -0.286em rgba(0,0,0,0.22)",
              "inset 0 -0.095em 0.143em rgba(255,255,255,0.9)",
            ].join(", "),
          }}
        >
          <span
            style={{
              display: "block",
              // no font-size here on purpose: it inherits the fluid one above,
              // which is what keeps every em in this badge on the same scale
              fontWeight: 600,
              letterSpacing: "0.32em",
              paddingLeft: "0.32em",
              whiteSpace: "nowrap",
              color: "#565656",
              // Engraved text: dark glyph with a soft light edge below
              textShadow: "0 0.048em 0 rgba(255,255,255,0.75)",
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
          Hi{" "}
          <span
            className={"avatar-wave" + (raised || autoWave ? " is-raised" : "")}
            aria-hidden="true"
            onPointerDown={press}
            onPointerUp={() => setRaised(false)}
            // cancel fires when the browser steals the gesture (a scroll starts,
            // the app backgrounds); without it the hand would stay up forever
            onPointerCancel={() => setRaised(false)}
            onPointerLeave={() => setRaised(false)}
          >
            <img className="idle" src="/avatar-tb.png" alt="" />
            <img className="wave" src="/avatar-hi-tb.png" alt="" />
          </span>{" "}
          I am George
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
          While my garden is being planted, feel free to check out some of{" "}
          {/* same-tab, and NOT target="_blank" — /projects is part of this site,
              so it should feel like navigating rather than leaving. */}
          <a
            href="/projects"
            style={{ color: "#f8766d", textDecoration: "none" }}
          >
            my projects
          </a>
        </p>
      </div>
    </div>
  );
}
