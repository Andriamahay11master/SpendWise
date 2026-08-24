const Analytics = () => {
  const dataFilter = ["Week", "Month", "Year"];
  return (
    <div className="main-block page-analytics">
      <h3 className="title-h3">financial insights</h3>
      <h2 className="title-h2">Analytics</h2>
      <div className="filter-analytics">
        {dataFilter.map((item, index) => {
          return (
            <button key={index} className="filter-analytics-item">
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Analytics;
