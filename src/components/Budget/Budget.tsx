import React from "react";
import currencies from "../../utils/currency";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";

interface BudgetSettings {
  currencyCode: string;
  currency: string;
  monthlyBudget: number;
}

const fetchCurrentBudget = async (): Promise<BudgetSettings> => {
  const response = await fetch("http://localhost:5000/api/budget/current");

  if (!response.ok) {
    throw new Error("Failed to fetch current budget");
  }

  const budget = await response.json();
  return {
    currencyCode: budget.currencyCode,
    currency: budget.currency,
    monthlyBudget: budget.budget,
  };
};

const addBudget = async (budgetSettings: BudgetSettings) => {
  const response = await fetch("http://localhost:5000/api/budget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currencyCode: budgetSettings.currencyCode,
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

const updateBudget = async (budgetSettings: BudgetSettings) => {
  const response = await fetch("http://localhost:5000/api/budget", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currencyCode: budgetSettings.currencyCode,
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
  const params = useParams({ strict: false });
  const isUpdate = params.limit !== undefined;
  const queryClient = useQueryClient();
  const { data: currentBudget } = useQuery({
    queryKey: ["budget"],
    queryFn: fetchCurrentBudget,
    enabled: isUpdate,
  });
  const [settings, setSettings] = React.useState<BudgetSettings>({
    currencyCode: "USD",
    currency: "$",
    monthlyBudget: params.limit ? Number(params.limit) : 0,
  });

  React.useEffect(() => {
    if (currentBudget) {
      setSettings(currentBudget);
    }
  }, [currentBudget]);

  const selectedCurrency = currencies.find(
    (currency) => currency.code === settings.currencyCode,
  );

  const resetForm = () => {
    setSettings({
      currencyCode: "USD",
      currency: "$",
      monthlyBudget: 0,
    });
  };

  const { mutate } = useMutation({
    mutationFn: isUpdate ? updateBudget : addBudget,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currency"] });
      await queryClient.invalidateQueries({ queryKey: ["budget"] });
      resetForm();
      navigate({ to: "/" });
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

    if (name === "currencyCode") {
      const selectedCurrency = currencies.find(
        (currency) => currency.code === value,
      );

      setSettings((currentSettings) => ({
        ...currentSettings,
        currency: selectedCurrency?.symbol ?? currentSettings.currency,
        currencyCode: selectedCurrency?.code ?? currentSettings.currencyCode,
      }));
      return;
    }

    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: name === "monthlyBudget" ? Number(value) : value,
    }));
  };

  return (
    <div className="main-block">
      <h2 className="title-h2">
        {isUpdate ? "Update budget" : "Budget Settings"}
      </h2>
      <p className="page-desc">
        Set the currency and spending limit you want to use each month.
      </p>
      <form className="budget-settings" onSubmit={handleSubmit}>
        <div className="budget-settings__field">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currencyCode"
            value={settings.currencyCode}
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
              step="10"
              value={settings.monthlyBudget}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {isUpdate ? "Update budget" : "Save budget settings"}
        </button>
      </form>
    </div>
  );
};

export default Budget;
