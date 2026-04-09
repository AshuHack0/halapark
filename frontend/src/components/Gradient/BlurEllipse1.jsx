import EllipseImage1 from "./Ellipse 1.svg";
export default function BlurEllipse1() {
  return (
      <img
        src={EllipseImage1.src}
        className="absolute top-24 left-[200px] w-118 h-118 inset-0"
      />
  );
}