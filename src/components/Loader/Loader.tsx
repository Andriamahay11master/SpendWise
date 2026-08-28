interface LoaderProps {
  size?: number;
  color?: string;
}
const Loader = ({ size, color }: LoaderProps) => {
  return (
    <div className="loader-container">
      <div
        className="loader"
        style={{ width: size, height: size, borderColor: color }}
      ></div>
    </div>
  );
};

export default Loader;
