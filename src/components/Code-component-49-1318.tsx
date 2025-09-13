import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CompanyLogoProps {
  companyName: string;
}

export function CompanyLogo({ companyName }: CompanyLogoProps) {
  return (
    <div className="absolute top-6 right-6">
      <ImageWithFallback
        src="https://via.placeholder.com/64x64/f3f3f5/717182?text=Logo"
        alt={`${companyName} logo`}
        className="w-16 h-16 rounded"
        width={64}
        height={64}
      />
    </div>
  );
}