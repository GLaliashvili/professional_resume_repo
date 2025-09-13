import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CompanyLogoProps {
  companyName: string;
  logoUrl: string;
  companyUrl?: string;
}

export function CompanyLogo({ companyName, logoUrl, companyUrl }: CompanyLogoProps) {
  const logoElement = (
    <div className="absolute top-[20px] right-[24px]">
      <ImageWithFallback
        src={logoUrl}
        alt={`${companyName} logo`}
        className="w-[24px] h-[24px] rounded object-cover transition-all duration-200 ease-in-out hover:brightness-110 hover:opacity-90 hover:rotate-2 hover:shadow-md"
        width={24}
        height={24}
      />
    </div>
  );

  if (companyUrl) {
    return (
      <a
        href={companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Visit ${companyName} website`}
      >
        {logoElement}
      </a>
    );
  }

  return logoElement;
}