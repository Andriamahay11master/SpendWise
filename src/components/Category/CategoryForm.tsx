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
  const [formData, setFormData] = React.useState({
    name: "",
    icon: "IoFastFood",
    color: "",
    budget: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "budget" ? parseInt(value) : value,
    }));
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      budget: newValue,
    }));
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
    setFormData((prevData) => ({
      ...prevData,
      icon: nameIcon,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Category Form Data:", formData);
    // TODO: Send formData to API endpoint
  };

  return (
    <div className="main-block">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            id="categoryName"
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group form-icon">
          <div className="form-group-top">
            <label htmlFor="selectIcon">Select Icon:</label>
            <div className="form-icon-value">
              <span>selected:</span>
              <input
                id="selectIcon"
                type="text"
                name="icon"
                value={formData.icon}
                readOnly
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="list-icon">
            {dataIcon.map((item, index) => (
              <div
                className={
                  formData.icon === item.name ? "icon-item selected" : "icon-item"
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
          <input
            id="selectColor"
            type="color"
            name="color"
            placeholder="Select Color"
            value={formData.color}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group form-range">
          <div className="form-group-top">
            <label htmlFor="budget">Monthly Budget Limit:</label>
            <span className="currentRangeValue">${formData.budget}</span>
          </div>
          <input
            id="budget"
            type="range"
            name="budget"
            placeholder="Monthly Budget Limit"
            min="0"
            max="1000"
            step="50"
            value={formData.budget}
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
