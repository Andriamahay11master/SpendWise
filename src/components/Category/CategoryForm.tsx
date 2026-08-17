import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoFastFood } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import { MdEmojiTransportation } from "react-icons/md";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { CiMobile4 } from "react-icons/ci";
import { CiPlane } from "react-icons/ci";

const CategoryForm = () => {
  const [valueRange, setValueRange] = React.useState(0);
  const [icon, setIcon] = React.useState("IoFastFood");
  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setValueRange(newValue);
    // Update CSS variable for gradient background
    const percent = (newValue / 1000) * 100;
    event.target.style.setProperty("--value", `${percent}%`);
  };

  const dataIcon = [
    {
      name: "IoFastFood",
      icon: <IoFastFood />,
    },
    {
      name: "GiPartyPopper",
      icon: <GiPartyPopper />,
    },
    {
      name: "MdEmojiTransportation",
      icon: <MdEmojiTransportation />,
    },
    {
      name: "MdOutlineHealthAndSafety",
      icon: <MdOutlineHealthAndSafety />,
    },
    {
      name: "TiShoppingCart",
      icon: <TiShoppingCart />,
    },
    {
      name: "CiMobile4",
      icon: <CiMobile4 />,
    },
    {
      name: "CiPlane",
      icon: <CiPlane />,
    },
  ];

  const selectIcon = (nameIcon: string) => {
    setIcon(nameIcon);
  };
  return (
    <div className="main-block">
      <form>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input id="categoryName" type="text" placeholder="Category Name" />
        </div>
        <div className="form-group form-icon">
          <div className="form-group-top">
            <label htmlFor="selectIcon">Select Icon:</label>
            <div className="form-icon-value">
              <span>selected:</span>
              <input id="selectIcon" type="text" value={icon} readOnly />
            </div>
          </div>
          <div className="list-icon">
            {dataIcon.map((item, index) => (
              <div
                className={
                  icon === item.name ? "icon-item selected" : "icon-item"
                }
                key={index}
                onClick={() => selectIcon(item.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectIcon(item.name);
                  }
                }}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="selectColor">Select Color:</label>
          <input id="selectColor" type="color" placeholder="Select Color" />
        </div>
        <div className="form-group form-range">
          <div className="form-group-top">
            <label htmlFor="budget">Monthly Budget Limit:</label>
            <span className="currentRangeValue">${valueRange}</span>
          </div>
          <input
            id="budget"
            type="range"
            placeholder="Monthly Budget Limit"
            min="0"
            max="1000"
            step="50"
            value={valueRange}
            onChange={handleRangeChange}
          />
          <div className="range-intervalle-value">
            <p className="range-value">0</p>
            <p className="range-value">1000</p>
          </div>
        </div>
        <div className="form-group form-button">
          <button type="submit" className="btn btn-primary">
            <CiCirclePlus />
            <span className="button-text">Add Category</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
