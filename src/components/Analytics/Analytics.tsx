import React, { useState } from "react";
import { GiPartyPopper } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { MdEmojiTransportation } from "react-icons/md";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const dataFilter = ["Week", "Month", "Year"];
  const [stateButton, setStateButton] = useState("Week");

  const data = [
    { name: "Transport", value: 325 },
    { name: "Food", value: 425 },
    { name: "Entertainment", value: 350 },
  ];

  const categoryData = [
    {
      nameCategory: "Food",
      iconCategory: <IoFastFood />,
      budgetSpent: 220,
      budgetMax: 500,
      color: "#24d0fb",
      nbTransaction: 15,
    },
    {
      nameCategory: "Entertainment",
      iconCategory: <GiPartyPopper />,
      budgetSpent: 150,
      budgetMax: 400,
      color: "#f5a623",
      nbTransaction: 20,
    },
    {
      nameCategory: "Transportation",
      iconCategory: <MdEmojiTransportation />,
      budgetSpent: 100,
      budgetMax: 250,
      color: "#f54e42",
      nbTransaction: 10,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="main-block page-analytics">
      <h3 className="title-h3">financial insights</h3>
      <h2 className="title-h2">Analytics</h2>
      <div className="filter-analytics">
        {dataFilter.map((item, index) => {
          return (
            <button
              key={index}
              className={
                stateButton === item
                  ? "btn btn-filter active"
                  : "btn btn-filter"
              }
              onClick={() => setStateButton(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="filter-donut">
        <ResponsiveContainer width="100%" aspect={1}>
          <PieChart>
            <Pie
              data={data}
              cx={"50%"}
              cy={"45%"}
              innerRadius={"30%"} // Makes it a donut chart (optional)
              outerRadius={"55%"}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="category-analytics">
        <h3 className="title-h3">Category details</h3>
        <div className="category-analytics-list">
          {categoryData.map((item, index) => {
            return (
              <div className="category-analytics-item" key={index}>
                <div className="category-analytics-top">
                  <div className="category-analytics-top-col">
                    <div className="category-analytics-item-icon">
                      {React.cloneElement(item.iconCategory, {
                        color: item.color,
                      })}
                    </div>
                  </div>
                  <div className="category-analytics-top-col">
                    <div className="category-analytics-item-info">
                      <div className="category-analytics-item-info-col">
                        <p className="category-analytics-item-name">
                          {item.nameCategory}
                        </p>
                        <p className="category-analytics-item-nb-transactions">
                          {item.nbTransaction}
                        </p>
                      </div>
                      <div className="category-analytics-item-info-col">
                        <p className="category-analytics-item-budget">
                          {item.budgetSpent.toFixed(2)}
                        </p>
                        <p className="category-analytics-item-percentage">
                          {Math.round(
                            (item.budgetSpent / item.budgetMax) * 100,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="category-analytics-bottom">
                  <div className="progressBar">
                    <div
                      className="progressBar-fill"
                      style={{
                        width: `${Math.round((item.budgetSpent / item.budgetMax) * 100)}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Analytics;
