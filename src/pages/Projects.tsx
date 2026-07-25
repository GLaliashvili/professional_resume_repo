import React from "react";
import { projects, placeholderCount } from "../data/projects";

/**
 * /projects — a grid of project cards.
 *
 * Styles live in src/index.css under .projects-*, not inline like Home.tsx does.
 * The grid needs hover gating and responsive columns, and neither is expressible
 * inline. Content comes from src/data/projects.ts; nothing in here changes when
 * the list does.
 */
export default function Projects() {
  return (
    <div className="projects-page">
      <div className="projects-shell">
        <header className="projects-header">
          <a className="projects-back" href="/">
            ← back
          </a>
          <h1 className="projects-title">Projects</h1>
          <p className="projects-intro">
            Things I've built, and things I'm still building.
          </p>
        </header>

        <div className="projects-grid">
          {projects.map((p) => (
            <a
              key={p.slug}
              className="project-card"
              href={p.href}
              // internal links stay in this tab; /balancetheory is a static file
              // served outside the router, so it is a plain anchor either way
              {...(p.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <img
                className="project-card-image"
                src={p.image}
                alt=""
                loading="lazy"
              />
              <div className="project-card-body">
                <h2 className="project-card-name">{p.name}</h2>
                <p className="project-card-description">{p.description}</p>
              </div>
            </a>
          ))}

          {/* Inert on purpose: a div, not a link, so there is nothing to hover,
              click or tab to. They only exist to say more is coming. */}
          {Array.from({ length: placeholderCount }, (_, i) => (
            <div className="project-card project-card-empty" key={`empty-${i}`}>
              <span>more coming soon</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
