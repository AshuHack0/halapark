/**
 * Phone artwork for a CMS image.
 *
 * Phones (under 640px) get the admin's optional mobile upload; larger screens,
 * and phones when no mobile image is set, get the image passed as children.
 * The <picture> is display:contents, so the wrapped <img> (next/image `fill`
 * included) lays out exactly as it did without it.
 */
export default function MobilePicture({ mobileSrc, children }) {
  const src = (mobileSrc || "").trim();
  if (!src) return children;
  return (
    <picture className="contents">
      <source media="(max-width: 639px)" srcSet={src} />
      {children}
    </picture>
  );
}
