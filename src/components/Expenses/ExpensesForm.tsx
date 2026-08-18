import { Link } from "react-router";

const ExpensesForm = () => {
  return (
    <div className="main-block">
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input type="text" name="amoun" id="amount" placeholder="0.00" />
      </div>
      <div className="form-group fomr-category">
        <div className="form-group-top">
          <label htmlFor="category">Category</label>
          <input type="hidden" name="category" id="category" />
          <Link to="/listCategories">View all</Link>
        </div>
        <div className="form-category-list"></div>
      </div>
      <div className="form-group">
        <label htmlFor="dateE">Date</label>
        <input type="date" name="dateE" id="dateE" />
      </div>
      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <input type="text" name="notes" id="notes" />
      </div>
      <div className="form-group form-submit">
        <button className="btn btn-primary">Save Transaction</button>
      </div>
    </div>
  );
};
export default ExpensesForm;
