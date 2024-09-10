import React, { useEffect, useState } from "react";

// Utility functions for SpendingSummary
const calculateSavingsPercentage = (currentSpending, previousSpending) => {
  if (previousSpending === 0) return 0;
  return ((previousSpending - currentSpending) / previousSpending) * 100;
};

// Utility to normalize date to remove time from the date object
const normalizeDate = (date) => {
  if (!date) return null; // Handle undefined dates for the "All" tab
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// Utility function to filter transactions based on a date range
const filterTransactionsByDateRange = (transactions, startDate, endDate) => {
  if (!startDate || !endDate) return transactions; // Handle "All" tab
  const normalizedStartDate = normalizeDate(startDate);
  const normalizedEndDate = normalizeDate(endDate);

  return transactions.filter((transaction) => {
    const transactionDate = normalizeDate(new Date(transaction.date));
    return (
      transactionDate >= normalizedStartDate &&
      transactionDate <= normalizedEndDate
    );
  });
};

const calculateTotalSpending = (transactions) => {
  return transactions.reduce((total, transaction) => {
    const amount = parseFloat(transaction.amount);
    return amount < 0 ? total + Math.abs(amount) : total;
  }, 0);
};

const calculatePreviousSpending = (transactions, selectedTab) => {
  const today = new Date();
  let startDate, endDate;

  if (selectedTab === "Day") {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    startDate = yesterday;
    endDate = yesterday;
  } else if (selectedTab === "Week") {
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);
    startDate = lastWeekStart;
    endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
  } else if (selectedTab === "Month") {
    const lastMonthStart = new Date(today);
    lastMonthStart.setMonth(today.getMonth() - 1);
    startDate = new Date(
      lastMonthStart.getFullYear(),
      lastMonthStart.getMonth(),
      1
    );
    endDate = new Date(
      lastMonthStart.getFullYear(),
      lastMonthStart.getMonth() + 1,
      0
    );
  } else if (selectedTab === "All") {
    return calculateTotalSpending([]); // Return 0 for previous spending in "All" tab
  }

  const previousTransactions = filterTransactionsByDateRange(
    transactions,
    startDate,
    endDate
  );

  return calculateTotalSpending(previousTransactions);
};

// Utility to format currency
const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toFixed(2)}`;
};

const getStartOfWeek = () => {
  const today = new Date();
  const firstDayOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  firstDayOfWeek.setDate(
    today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
  );
  return firstDayOfWeek;
};

const SpendingSummary = ({ transactions, selectedTab, setSelectedTab }) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [savingsPercentage, setSavingsPercentage] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);

  useEffect(() => {
    let filtered = [];
    const today = new Date();

    // Disconnect the filtering logic from any external date
    if (selectedTab === "Day") {
      filtered = filterTransactionsByDateRange(transactions, today, today);
    } else if (selectedTab === "Week") {
      const startOfWeek = getStartOfWeek();
      filtered = filterTransactionsByDateRange(
        transactions,
        startOfWeek,
        today
      );
    } else if (selectedTab === "Month") {
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      filtered = filterTransactionsByDateRange(
        transactions,
        firstOfMonth,
        today
      );
    } else if (selectedTab === "All") {
      filtered = transactions; // Show all transactions
    }

    // Calculate total spending for the selected tab
    const currentSpending = calculateTotalSpending(filtered);
    setTotalSpending(currentSpending);

    // Calculate previous spending for comparison
    const previousSpending = calculatePreviousSpending(
      transactions,
      selectedTab
    );
    const savings = calculateSavingsPercentage(
      currentSpending,
      previousSpending
    );
    setSavingsPercentage(savings);
  }, [selectedTab, transactions]);

  return (
    <div className="p-10 bg-slate-100 rounded-lg">
      {/* Spending Summary */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
        <button
          className={`p-2 rounded ${
            selectedTab === "Day" ? "bg-indigo-500 text-white" : "bg-slate-300"
          }`}
          onClick={() => setSelectedTab("Day")}
        >
          Day
        </button>
        <button
          className={`p-2 rounded ${
            selectedTab === "Week" ? "bg-indigo-500 text-white" : "bg-slate-300"
          }`}
          onClick={() => setSelectedTab("Week")}
        >
          Week
        </button>
        <button
          className={`p-2 rounded ${
            selectedTab === "Month"
              ? "bg-indigo-500 text-white"
              : "bg-slate-300"
          }`}
          onClick={() => setSelectedTab("Month")}
        >
          Month
        </button>
        <button
          className={`p-2 rounded ${
            selectedTab === "All" ? "bg-indigo-500 text-white" : "bg-slate-300"
          }`}
          onClick={() => setSelectedTab("All")}
        >
          All
        </button>
      </div>

      <div className="p-4 bg-slate-300 shadow-sm rounded">
        {selectedTab === "Day" && (
          <div>
            <h3 className="text-sm font-semibold">Daily</h3>
            <p className="text-sm">
              Today, you have spent {formatCurrency(totalSpending)}.
            </p>
            <p className="text-sm">
              You have saved {savingsPercentage.toFixed(2)}% compared to
              yesterday.
            </p>
          </div>
        )}
        {selectedTab === "Week" && (
          <div>
            <h3 className="text-sm font-semibold">Weekly</h3>
            <p className="text-sm">
              This week, you have spent {formatCurrency(totalSpending)}.
            </p>
            <p className="text-sm">
              You have saved {savingsPercentage.toFixed(2)}% compared to last
              week.
            </p>
          </div>
        )}
        {selectedTab === "Month" && (
          <div>
            <h3 className="text-sm font-semibold">Monthly</h3>
            <p className="text-sm">
              This month, you have spent {formatCurrency(totalSpending)}.
            </p>
            <p className="text-sm">
              You have saved {savingsPercentage.toFixed(2)}% compared to last
              month.
            </p>
          </div>
        )}
        {selectedTab === "All" && (
          <div>
            <h3 className="text-sm font-semibold">All Time</h3>
            <p className="text-sm">
              All time, you have spent {formatCurrency(totalSpending)}.
            </p>
            <p className="text-sm">
              You have saved 0% compared to previous periods.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingSummary;
