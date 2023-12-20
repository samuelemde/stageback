"use client";

import { type SyntheticEvent, useEffect, useState } from "react";
import ArtWorkPlaceholder from "public/images/artwork-placeholder.png";
import Image, { type ImageProps, type StaticImageData } from "next/image";

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
  fallback?: string | StaticImageData;
  src: string | undefined | null;
};

export default function ImageWithFallback({
  fallback = ArtWorkPlaceholder,
  src,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={!error && src ? src : fallback}
      {...props}
    />
  );
}
