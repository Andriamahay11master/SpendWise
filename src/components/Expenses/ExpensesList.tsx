import { GiPartyPopper } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { MdEmojiTransportation } from "react-icons/md";

const ExpensesList = ({}) => {
  const dateToday = new Date();
  const dataExpenses = [
    {
      id: "1",
      icon: <IoFastFood />,
      description: "Grocery Shopping",
      valueCategory: "Food",
      colorCategory: "#24d0fb",
      currency: "$",
      dateExpense: "2026-08-15",
      montant: 75.5,
    },
    {
      id: "2",
      icon: <GiPartyPopper />,
      description: "Movie Night",
      valueCategory: "Entertainment",
      colorCategory: "#f5a623",
      currency: "$",
      dateExpense: "2026-08-14",
      montant: 30.0,
    },
    {
      id: "3",
      icon: <MdEmojiTransportation />,
      description: "Gas Refill",
      valueCategory: "Transportation",
      colorCategory: "#f54e42",
      currency: "$",
      dateExpense: "2026-08-14",
      montant: 50.0,
    },
    {
      id: "4",
      icon: <MdEmojiTransportation />,
      description: "Gas Refill",
      valueCategory: "Transportation",
      colorCategory: "#f54e42",
      currency: "$",
      dateExpense: "2026-08-10",
      montant: 50.0,
    },
  ];
  return (
    <div className="main-block">
      <div className="expenses-group">
        <h3 className="title-h3">today</h3>
      </div>
      <div className="expenses-group">
        <h3 className="title-h3">yesterday</h3>
      </div>
      <div className="expenses-group">
        <h3 className="title-h3">this week</h3>
      </div>
    </div>
  );
};

export default ExpensesList;
