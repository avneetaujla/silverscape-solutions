import type { SiteImage } from "@/content/mediaCatalog";

type Props = {
  image: SiteImage;
  sizes: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  /** Decorative usage — hidden from assistive tech. */
  decorative?: boolean;
  alt?: string;
};

export function Img({
  image,
  sizes,
  className,
  priority,
  decorative,
  alt,
}: Props) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={decorative ? "" : (alt ?? image.alt)}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      style={
        image.objectPosition
          ? { objectPosition: image.objectPosition }
          : undefined
      }
      className={className}
    />
  );
}
