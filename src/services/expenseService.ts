export type ExpenseFormData = {
  amount: string;
  category: string;
  iconCategory: string;
  colorCategory: string;
  dateE: string;
  notes: string;
  currency: string;
};

const API_URL = "http://localhost:5000/api";

export const getLastBudgetForCategory = async (categoryName: string) => {
  try {
    const response = await fetch(
      `${API_URL}/categories/${categoryName}/budgetCurrent`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch budgetCurrent");
    }

    const data = await response.json();
    return data.budgetCurrent as number | null;
  } catch (error) {
    console.error("Error fetching budgetCurrent:", error);
    return null;
  }
};

export const updateBudgetForCategory = async (
  categoryName: string,
  newBudgetCurrent: number,
) => {
  try {
    const response = await fetch(
      `${API_URL}/categories/${categoryName}/budgetCurrent`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budgetCurrent: newBudgetCurrent }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update budgetCurrent");
    }
  } catch (error) {
    console.error("Error updating budgetCurrent:", error);
  }
};

export const saveExpense = async (formData: ExpenseFormData) => {
  const lastBudget = await getLastBudgetForCategory(formData.category);

  if (lastBudget !== null) {
    const newBudgetCurrent = lastBudget + Number(formData.amount);
    await updateBudgetForCategory(formData.category, newBudgetCurrent);
  }

  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: formData.amount,
      category: formData.category,
      date: formData.dateE,
      notes: formData.notes,
      icon: formData.iconCategory,
      colorCategory: formData.colorCategory,
      currency: formData.currency,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save expense");
  }

  return response.json();
};
