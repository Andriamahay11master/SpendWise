import { useQuery } from "@tanstack/react-query";

// Fetch Currency
const fetchCurrency = async () => {
  const response = await fetch("http://localhost:5000/api/budget/current");
  return await response.json();
};

const useCurrency = () => {
  const { data: dataCurrency } = useQuery({
    queryKey: ["currency"],
    queryFn: fetchCurrency,
  });
  return dataCurrency?.currency || "$";
};

export default useCurrency;
