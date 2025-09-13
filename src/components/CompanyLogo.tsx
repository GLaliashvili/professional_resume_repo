import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CompanyLogoProps {
  companyName: string;
  logoUrl: string;
}

export function CompanyLogo({ companyName, logoUrl }: CompanyLogoProps) {
  return (
    <div className="absolute top-[20px] right-[24px]">
      <ImageWithFallback
        src={logoUrl}
        alt={`${companyName} logo`}
        className="w-[42px] h-[42px] rounded object-cover"
        width={46}
        height={46}
      />
    </div>
  );
}