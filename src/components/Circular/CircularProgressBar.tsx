interface CircularProgressProps {
  value?: number;
  size?: number;
  color?: string;
}
export default function CircularProgress({
  value = 0,
  size = 100,
  color = "#39ff14",
}: CircularProgressProps) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // Keep value between 0 and 100
  const progress = Math.min(Math.max(value, 0), 100);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="circular-progress"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 120 120">
        {/* Background */}
        <circle className="progress-bg" cx="60" cy="60" r={radius} />

        {/* Progress */}
        <circle
          className="progress-bar"
          cx="60"
          cy="60"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            stroke: color,
          }}
        />

        {/* Percentage */}
        <text x="60" y="60" className="progress-text">
          {progress}%
        </text>
      </svg>
    </div>
  );
}
