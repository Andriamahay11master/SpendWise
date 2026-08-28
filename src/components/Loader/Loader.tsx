import type { CSSProperties } from "react";

interface LoaderProps {
  size?: number;
  color?: string;
}
const Loader = ({ size = 64, color = "#24d0fb" }: LoaderProps) => {
  const loaderStyle = {
    "--loader-size": `${size}px`,
    "--loader-color": color,
  } as CSSProperties;

  return (
    <div className="loader-container" role="status" aria-label="Loading">
      <div className="loader" style={loaderStyle} aria-hidden="true">
        <span className="loader__core" />
        <span className="loader__orbit loader__orbit--one" />
        <span className="loader__orbit loader__orbit--two" />
      </div>
      <span className="loader__label">Loading your finances</span>
    </div>
  );
};

export default Loader;
