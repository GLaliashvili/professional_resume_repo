import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CompanyLogoProps {
  companyName: string;
  logoUrl: string;
  companyUrl?: string;
}

export function CompanyLogo({ companyName, logoUrl, companyUrl }: CompanyLogoProps) {
  const logoElement = (
    <ImageWithFallback
      src={logoUrl}
      alt={`${companyName} logo`}
      className="w-[24px] h-[24px] rounded object-cover transition-all duration-300 ease-in-out hover:opacity-80 hover:shadow-md hover-tilt"
      width={24}
      height={24}
    />
  );

  if (companyUrl) {
    return (
      <a
        href={companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-all duration-300 ease-in-out hover:bg-accent group"
        aria-label={`Visit ${companyName} website`}
      >
        {logoElement}
      </a>
    );
  }

  return logoElement;
}