import { CiCirclePlus } from "react-icons/ci";
const CategoryForm = () => {
  return (
    <div className="main-block">
      <form>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input id="categoryName" type="text" placeholder="Category Name" />
        </div>
        <div className="form-group">
          <label htmlFor="selectIcon">Select Icon:</label>
          <input id="selectIcon" type="text" placeholder="Select Icon" />
        </div>
        <div className="form-group">
          <label htmlFor="selectColor">Select Color:</label>
          <input id="selectColor" type="color" placeholder="Select Color" />
        </div>
        <div className="form-group">
          <label htmlFor="budget">Monthly Budget Limit:</label>
          <input id="budget" type="text" placeholder="Monthly Budget Limit" />
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
