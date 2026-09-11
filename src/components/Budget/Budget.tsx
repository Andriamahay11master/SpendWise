import React from "react";

const budgetStorageKey = "spendwise-budget-settings";

const currencies = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥" },
  { code: "CAD", label: "Canadian Dollar", symbol: "CA$" },
];

interface BudgetSettings {
  currency: string;
  monthlyBudget: number;
}

const defaultSettings: BudgetSettings = {
  currency: "USD",
  monthlyBudget: 0,
};

const getStoredSettings = (): BudgetSettings => {
  try {
    const storedSettings = localStorage.getItem(budgetStorageKey);
    if (!storedSettings) return defaultSettings;

    const parsedSettings = JSON.parse(
      storedSettings,
    ) as Partial<BudgetSettings>;
    const currency = currencies.some(
      (item) => item.code === parsedSettings.currency,
    )
      ? parsedSettings.currency!
      : defaultSettings.currency;
    const monthlyBudget = Number(parsedSettings.monthlyBudget);

    return {
      currency,
      monthlyBudget:
        Number.isFinite(monthlyBudget) && monthlyBudget >= 0
          ? monthlyBudget
          : defaultSettings.monthlyBudget,
    };
  } catch {
    return defaultSettings;
  }
};

const Budget = () => {
  const [settings, setSettings] =
    React.useState<BudgetSettings>(getStoredSettings);
  const [isSaved, setIsSaved] = React.useState(false);

  const selectedCurrency = currencies.find(
    (currency) => currency.code === settings.currency,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem(budgetStorageKey, JSON.stringify(settings));
    setIsSaved(true);
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
