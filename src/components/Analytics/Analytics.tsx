import React, { useEffect, useMemo, useState } from "react";
import { PiHeadCircuit } from "react-icons/pi";
import { Link } from "@tanstack/react-router";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { CategoryType } from "../../type/CategoryType";
import useCategoryIcon from "../../context/useCategoryIcon";
import type { TransactionType } from "../../type/TransactionType";
import { GoArrowRight } from "react-icons/go";
import useCurrency from "../../context/useCurrency";

const Analytics = () => {
  const currency = useCurrency();
  const iconMap = useCategoryIcon();
  const dataFilter = ["Week", "Month", "Year"];
  const [stateButton, setStateButton] = useState("Week");
  const [dataCategory, setDataCategory] = useState<CategoryType[]>([]);
  const [dataNbTransactionByCategory, setDataNbTransactionByCategory] =
    useState<TransactionType[]>([]);

  const valPercentageCategory = useMemo(
    () =>
      dataCategory.map((item) => {
        const percentage = (item.budgetCurrent / item.budgetMax) * 100;
        return {
          name: item.name,
          value: Number(percentage.toFixed(2)),
          color: item.color,
        };
      }),
    [dataCategory],
  );

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const categories = await response.json();
        setDataCategory(categories);

        const countsExpensesByCategory = await Promise.all(
          categories.map(async (category: CategoryType) => {
            try {
              const response = await fetch(
                `http://localhost:5000/api/categories/${category.name}/expenses/count`,
              );
              const result = await response.json();
              return {
                referenceCategory: category.name,
                nbTransaction: result.nbTransaction ?? result.count ?? 0,
              };
            } catch (error) {
              console.error(
                `Error fetching number of transactions for category ${category.name}:`,
                error,
              );
              return { referenceCategory: category.name, nbTransaction: 0 };
            }
          }),
        );

        setDataNbTransactionByCategory(countsExpensesByCategory);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, []);
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
              data={valPercentageCategory}
              cx={"50%"}
              cy={"45%"}
              innerRadius={"30%"} // Makes it a donut chart (optional)
              outerRadius={"55%"}
              fill="#8884d8"
              dataKey={"value"}
              label
            >
              {valPercentageCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
          {dataCategory.map((item, index) => {
            const categoryCount =
              dataNbTransactionByCategory.find(
                (entry) => entry.referenceCategory === item.name,
              )?.nbTransaction ?? 0;

            return (
              <div className="category-analytics-item" key={index}>
                <div className="category-analytics-top">
                  <div className="category-analytics-top-col">
                    <div className="category-analytics-item-icon">
                      {React.cloneElement(iconMap[item.icon], {
                        color: item.color,
                      })}
                    </div>
                  </div>
                  <div className="category-analytics-top-col">
                    <div className="category-analytics-item-info">
                      <div className="category-analytics-item-info-col">
                        <p className="category-analytics-item-name">
                          {item.name}
                        </p>
                        <p className="category-analytics-item-nb-transactions">
                          {categoryCount} transactions
                        </p>
                      </div>
                      <div className="category-analytics-item-info-col">
                        <p className="category-analytics-item-budget">
                          {currency} {item.budgetCurrent.toFixed(2)}
                        </p>
                        <p className="category-analytics-item-percentage">
                          {Math.round(
                            (item.budgetCurrent / item.budgetMax) * 100,
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
                        width: `${Math.round((item.budgetCurrent / item.budgetMax) * 100)}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}

          <Link to="/categoryReport" className="btn btn-gray">
            View Detail Report <GoArrowRight />
          </Link>
        </div>
      </div>
      <div className="prediction-analytics">
        <div className="prediction-analytics-top">
          <div className="prediction-col">
            <div className="prediction-icon">
              <PiHeadCircuit />
            </div>
          </div>
          <div className="prediction-col">
            <h3 className="title-h3">Ai Smart Prediction</h3>
            <p>
              Based on your trends, you're on track to save{" "}
              <strong>{currency} 420</strong> more than last month if current
              spending continues
            </p>
          </div>
        </div>
        <div className="prediction-analytics-bottom">
          <Link to="/prediction" className="btn btn-white">
            Set Target
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
