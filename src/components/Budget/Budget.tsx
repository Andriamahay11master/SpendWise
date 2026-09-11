import React from "react";
import currencies from "../../utils/currency";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

interface BudgetSettings {
  currency: string;
  monthlyBudget: number;
}

const addBudget = async (budgetSettings: BudgetSettings) => {
  const response = await fetch("http://localhost:5000/api/budget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currency: budgetSettings.currency,
      budget: budgetSettings.monthlyBudget,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

const Budget = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = React.useState<BudgetSettings>({
    currency: "USD",
    monthlyBudget: 0,
  });
  const [isSaved, setIsSaved] = React.useState(false);

  const selectedCurrency = currencies.find(
    (currency) => currency.code === settings.currency,
  );

  const resetForm = () => {
    setSettings({
      currency: "USD",
      monthlyBudget: 0,
    });
  };

  const { mutate } = useMutation({
    mutationFn: addBudget,
    onSuccess: () => {
      resetForm();
      navigate({ to: "/transactions" });
      setIsSaved(true);
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(settings);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setIsSaved(false);
    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: name === "monthlyBudget" ? Number(value) : value,
    }));
  };

  return (
    <div className="main-block">
      <h2 className="title-h2">Budget Settings</h2>
      <p className="page-desc">
        Set the currency and spending limit you want to use each month.
      </p>
      <form className="budget-settings" onSubmit={handleSubmit}>
        <div className="budget-settings__field">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={settings.currency}
            onChange={handleChange}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.label} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>
        <div className="budget-settings__field">
          <label htmlFor="monthlyBudget">Monthly budget</label>
          <div className="budget-settings__amount">
            <span aria-hidden="true">{selectedCurrency?.symbol}</span>
            <input
              id="monthlyBudget"
              name="monthlyBudget"
              type="number"
              min="0"
              step="0.01"
              value={settings.monthlyBudget}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Save budget settings
        </button>
        {isSaved && (
          <p className="budget-settings__status" role="status">
            Budget settings saved.
          </p>
        )}
      </form>
    </div>
  );
};

export default Budget;
