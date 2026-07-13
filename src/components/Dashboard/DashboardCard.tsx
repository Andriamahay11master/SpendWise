interface DashboardCardProps {
  typeCard: number;
  title: string;
  currency: string;
  value: number;
  desc: string;
  icon?: React.ReactNode;
  color: string;
  limit?: number;
}

const DashboardCard = ({
  typeCard,
  title,
  currency,
  value,
  desc,
  icon,
  color,
  limit,
}: DashboardCardProps) => {
  return (
    <div className="dashboard-card">
      {icon && <div className="dashboard-icon">{icon}</div>}
      <div className="dashboard-top">
        <h2 className="dashboard-title">{title}</h2>
      </div>
      <div className="dashboard-bottom">
        <p className="dashboard-value" style={{ color: color }}>
          {currency}
          {value.toFixed(2)}
        </p>
        {typeCard === 2 ? (
          <div className="dashboard-progress-info">
            <p className="dashboard-limit">
              {currency}
              {limit?.toFixed(2)}
            </p>
            <div className="dashboard-progress">
              <div
                className="dashboard-progress-bar"
                style={{
                  width: `${(value / limit!) * 100}%`,
                  backgroundColor: color,
                }}
              ></div>
            </div>
            <p className="dashboard-description">{desc}</p>
          </div>
        ) : (
          <p className="dashboard-description-one">{desc}</p>
        )}
      </div>
    </div>
  );
};
export default DashboardCard;
