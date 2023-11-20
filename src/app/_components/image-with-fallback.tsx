"use client";

import { useState } from "react";
import ArtWorkPlaceholder from "public/images/artwork-placeholder.png";
import Image, { type ImageProps, type StaticImageData } from "next/image";

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
  fallback?: string | StaticImageData;
  src?: string;
};

export default function ImageWithFallback({
  fallback = ArtWorkPlaceholder,
  src,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData | undefined>(
    src,
  );
  const onError = () => setImgSrc(fallback);

  return (
    <Image
      onError={onError}
      src={imgSrc ? imgSrc : fallback}
      alt={alt}
      {...props}
    />
  );
}
