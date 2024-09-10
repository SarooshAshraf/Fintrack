// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// // Utility functions (same as before)
// const formatDate = (date) => {
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// const normalizeDate = (date) => {
//   const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//   return newDate;
// };

// const filterTransactionsByDateRange = (transactions, selectedDate) => {
//   const firstOfMonth = new Date(
//     selectedDate.getFullYear(),
//     selectedDate.getMonth(),
//     1
//   );
//   const normalizedSelectedDate = normalizeDate(selectedDate);

//   return transactions.filter((transaction) => {
//     const transactionDate = normalizeDate(new Date(transaction.date));
//     return (
//       transactionDate >= firstOfMonth &&
//       transactionDate <= normalizedSelectedDate
//     );
//   });
// };

// const calculateTotalSpending = (transactions) => {
//   return transactions.reduce((total, transaction) => {
//     const amount = parseFloat(transaction.amount);
//     return amount < 0 ? total + Math.abs(amount) : total;
//   }, 0);
// };

// const predictFutureSpending = (currentSpending, daysElapsed, totalDays) => {
//   const averageDailySpending = currentSpending / daysElapsed;
//   const remainingDays = totalDays - daysElapsed;
//   const predictedSpending = [];

//   for (let i = 1; i <= remainingDays; i++) {
//     predictedSpending.push(averageDailySpending * i);
//   }

//   return predictedSpending;
// };

// const formatCurrency = (amount) => `$${parseFloat(amount).toFixed(2)}`;

// // Utility function to calculate the percentage saved
// const calculateSavingsPercentage = (currentSpending, previousSpending) => {
//   if (previousSpending === 0) return 0; // Avoid division by zero
//   return ((previousSpending - currentSpending) / previousSpending) * 100;
// };

// // Utility function to get spending for the previous day, week, month
// const calculatePreviousSpending = (transactions, selectedTab) => {
//   const today = new Date();
//   let previousTransactions = [];

//   if (selectedTab === "Day") {
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);
//     previousTransactions = filterTransactionsByDateRange(
//       transactions,
//       yesterday
//     );
//   } else if (selectedTab === "Week") {
//     const lastWeekStart = new Date(today);
//     lastWeekStart.setDate(today.getDate() - 7);
//     previousTransactions = filterTransactionsByDateRange(
//       transactions,
//       lastWeekStart
//     );
//   } else if (selectedTab === "Month") {
//     const lastMonthStart = new Date(
//       today.getFullYear(),
//       today.getMonth() - 1,
//       1
//     );
//     previousTransactions = filterTransactionsByDateRange(
//       transactions,
//       lastMonthStart
//     );
//   }

//   return calculateTotalSpending(previousTransactions);
// };

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const [selectedDateTransactions, setSelectedDateTransactions] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTab, setSelectedTab] = useState("Day");
//   const [savingsPercentage, setSavingsPercentage] = useState(0);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userid = localStorage.getItem("userid");

//     if (token && userid) {
//       axios
//         .get(`http://localhost:3000/api2/transactions/${userid}`)
//         .then((response) => {
//           setTransactions(response.data);
//           setFilteredTransactions(
//             filterTransactionsByDateRange(response.data, new Date())
//           );
//         })
//         .catch((error) => {
//           console.error("There was an error fetching the data!", error);
//         });
//     } else {
//       console.error("No token or user ID found");
//     }
//   }, []);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     const filtered = filterTransactionsByDateRange(transactions, date);
//     setFilteredTransactions(filtered);

//     // Filter transactions by the selected date
//     const filteredBySelectedDate = transactions.filter((transaction) => {
//       const transactionDate = normalizeDate(new Date(transaction.date));
//       const selectedNormalizedDate = normalizeDate(date);
//       return transactionDate.getTime() === selectedNormalizedDate.getTime();
//     });

//     setSelectedDateTransactions(filteredBySelectedDate);
//   };

//   useEffect(() => {
//     const currentSpending = calculateTotalSpending(filteredTransactions);
//     const previousSpending = calculatePreviousSpending(
//       transactions,
//       selectedTab
//     );
//     const savings = calculateSavingsPercentage(
//       currentSpending,
//       previousSpending
//     );
//     setSavingsPercentage(savings);
//   }, [filteredTransactions, selectedTab]);

//   const today = new Date();
//   const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

//   const totalSpending = calculateTotalSpending(
//     filterTransactionsByDateRange(transactions, selectedDate)
//   );

//   // Calculate predicted transactions for the rest of the month
//   const totalDaysInMonth = new Date(
//     selectedDate.getFullYear(),
//     selectedDate.getMonth() + 1,
//     0
//   ).getDate();
//   const daysElapsed = selectedDate.getDate();
//   const totalActualSpending = calculateTotalSpending(
//     filterTransactionsByDateRange(transactions, selectedDate)
//   );
//   const predictedSpending = predictFutureSpending(
//     totalActualSpending,
//     daysElapsed,
//     totalDaysInMonth
//   );
//   const predictedTransactions = predictedSpending.map((amount, index) => ({
//     date: formatDate(
//       new Date(
//         selectedDate.getFullYear(),
//         selectedDate.getMonth(),
//         selectedDate.getDate() + index + 1
//       )
//     ),
//     amount: amount,
//   }));

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//   };

//   return (
//     <div className="p-6 bg-white text-black">
//       <h1 className="text-xl lg:text-2xl font-bold mb-4">
//         User Financial Dashboard
//       </h1>

//       <div className="p-10 bg-slate-100 rounded-lg">
//         {/* Spending Summary */}
//         <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
//           <button
//             className={`p-2 rounded ${
//               selectedTab === "Day"
//                 ? "bg-indigo-500 text-white"
//                 : "bg-slate-300"
//             }`}
//             onClick={() => handleTabChange("Day")}
//           >
//             Day
//           </button>
//           <button
//             className={`p-2 rounded ${
//               selectedTab === "Week"
//                 ? "bg-indigo-500 text-white"
//                 : "bg-slate-300"
//             }`}
//             onClick={() => handleTabChange("Week")}
//           >
//             Week
//           </button>
//           <button
//             className={`p-2 rounded ${
//               selectedTab === "Month"
//                 ? "bg-indigo-500 text-white"
//                 : "bg-slate-300"
//             }`}
//             onClick={() => handleTabChange("Month")}
//           >
//             Month
//           </button>
//           <button
//             className={`p-2 rounded ${
//               selectedTab === "All"
//                 ? "bg-indigo-500 text-white"
//                 : "bg-slate-300"
//             }`}
//             onClick={() => handleTabChange("All")}
//           >
//             All
//           </button>
//         </div>

//         <div className="p-4 bg-slate-300 shadow-sm rounded">
//           {selectedTab === "Day" && (
//             <div>
//               <h3 className="text-sm font-semibold">Daily</h3>
//               <p className="text-sm">
//                 Today, you have spent {formatCurrency(totalSpending)}.
//               </p>
//               <p className="text-sm">
//                 You have saved {savingsPercentage.toFixed(2)}% compared to
//                 yesterday.
//               </p>
//             </div>
//           )}
//           {selectedTab === "Week" && (
//             <div>
//               <h3 className="text-sm font-semibold">Weekly</h3>
//               <p className="text-sm">
//                 This week, you have spent {formatCurrency(totalSpending)}.
//               </p>
//               <p className="text-sm">
//                 You have saved {savingsPercentage.toFixed(2)}% compared to last
//                 week.
//               </p>
//             </div>
//           )}
//           {selectedTab === "Month" && (
//             <div>
//               <h3 className="text-sm font-semibold">Monthly</h3>
//               <p className="text-sm">
//                 This month, you have spent {formatCurrency(totalSpending)}.
//               </p>
//               <p className="text-sm">
//                 You have saved {savingsPercentage.toFixed(2)}% compared to last
//                 month.
//               </p>
//             </div>
//           )}
//           {selectedTab === "All" && (
//             <div>
//               <h3 className="text-sm font-semibold">All Time</h3>
//               <p className="text-sm">
//                 All time, you have spent {formatCurrency(totalSpending)}.
//               </p>
//               <p className="text-sm">
//                 You have saved 0% compared to previous periods.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Graph and Table in a Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:max-w-6xl">
//         <div className="w-full h-64 md:h-72 lg:h-80 bg-white shadow-sm rounded p-4">
//           <h3 className="text-lg font-semibold mb-4">
//             Monthly Insights (Actual vs Predicted)
//           </h3>
//           {filteredTransactions.length > 0 ? (
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="date"
//                   tickFormatter={(tick) => {
//                     const date = new Date(tick);
//                     return formatDate(date); // Format it to your desired format
//                   }}
//                 />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value) => formatCurrency(value)}
//                   labelFormatter={(label) => formatDate(new Date(label))}
//                 />
//                 <Line
//                   type="monotone"
//                   data={filteredTransactions} // Use filtered transactions based on date range
//                   dataKey="amount"
//                   stroke="#8884d8"
//                   name="Actual"
//                 />
//                 <Line
//                   type="monotone"
//                   data={predictedTransactions} // Use predicted spending data
//                   dataKey="amount"
//                   stroke="#82ca9d"
//                   name="Predicted"
//                   strokeDasharray="5 5"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <p>No data for the selected date range.</p>
//           )}
//         </div>

//         <div className="w-full h-64 md:h-72 lg:h-80 bg-white shadow-sm rounded p-4">
//           <div className="mb-4 flex flex-col sm:flex-row items-center">
//             <h3 className="flex-1 text-lg font-semibold mb-4">
//               Today's Transactions
//             </h3>
//             <label className="text-sm font-medium text-gray-700 mr-4 mb-4">
//               Select Date:
//             </label>
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange}
//               dateFormat="yyyy-MM-dd"
//               className="border rounded-md mb-4 bg-white text-black"
//             />
//           </div>

//           <div className="overflow-y-auto h-64 md:h-72 lg:h-80">
//             {filteredTransactions.length > 0 ? (
//               <table className="min-w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="p-2 border">Date</th>
//                     <th className="p-2 border">Amount</th>
//                     <th className="p-2 border">Merchant</th>
//                     <th className="p-2 border">Category</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedDateTransactions.map((transaction) => (
//                     <tr key={transaction.transactionId} className="border-b">
//                       <td className="p-2 border">
//                         {formatDate(transaction.date)}
//                       </td>
//                       <td className="p-2 border">
//                         {formatCurrency(Math.abs(transaction.amount))}
//                       </td>
//                       <td className="p-2 border">{transaction.merchant}</td>
//                       <td className="p-2 border">{transaction.category}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No transactions found for this date.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SpendingSummary from "./SpendingsSummary.jsx";

// Utility functions for Dashboard
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const normalizeDate = (date) => {
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return newDate;
};

const filterTransactionsByDateRange = (transactions, selectedDate) => {
  const firstOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const normalizedSelectedDate = normalizeDate(selectedDate);

  return transactions.filter((transaction) => {
    const transactionDate = normalizeDate(new Date(transaction.date));
    return (
      transactionDate >= firstOfMonth &&
      transactionDate <= normalizedSelectedDate
    );
  });
};

const calculateTotalSpending = (transactions) => {
  return transactions.reduce((total, transaction) => {
    const amount = parseFloat(transaction.amount);
    return amount < 0 ? total + Math.abs(amount) : total;
  }, 0);
};

const predictFutureSpending = (currentSpending, daysElapsed, totalDays) => {
  const averageDailySpending = currentSpending / daysElapsed;
  const remainingDays = totalDays - daysElapsed;
  const predictedSpending = [];

  for (let i = 1; i <= remainingDays; i++) {
    predictedSpending.push(averageDailySpending * i);
  }

  return predictedSpending;
};

const formatCurrency = (amount) => `$${parseFloat(amount).toFixed(2)}`;

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedDateTransactions, setSelectedDateTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState("Day");
  const [savingsPercentage, setSavingsPercentage] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");

    if (token && userid) {
      axios
        .get(`http://localhost:3000/api2/transactions/${userid}`)
        .then((response) => {
          setTransactions(response.data);
          const today = new Date();

          // Filter transactions for today's date
          const filteredByDate = filterTransactionsByDateRange(response.data, today);
          setFilteredTransactions(filteredByDate);

          const filteredByToday = response.data.filter((transaction) => {
            const transactionDate = normalizeDate(new Date(transaction.date));
            return transactionDate.getTime() === normalizeDate(today).getTime();
          });
          
          setSelectedDateTransactions(filteredByToday);
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    } else {
      console.error("No token or user ID found");
    }
  }, []);
   
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filtered = filterTransactionsByDateRange(transactions, date);
    setFilteredTransactions(filtered);

    const filteredBySelectedDate = transactions.filter((transaction) => {
      const transactionDate = normalizeDate(new Date(transaction.date));
      const selectedNormalizedDate = normalizeDate(date);
      return transactionDate.getTime() === selectedNormalizedDate.getTime();
    });

    setSelectedDateTransactions(filteredBySelectedDate);
  };
  
  const totalSpending = calculateTotalSpending(filteredTransactions);

  const totalDaysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const daysElapsed = selectedDate.getDate();
  const totalActualSpending = calculateTotalSpending(filteredTransactions);
  const predictedSpending = predictFutureSpending(
    totalActualSpending,
    daysElapsed,
    totalDaysInMonth
  );
  const predictedTransactions = predictedSpending.map((amount, index) => ({
    date: formatDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + index + 1
      )
    ),
    amount: amount,
  }));

  return (
    <div className="p-6 bg-white text-black">
      <h1 className="text-xl lg:text-2xl font-bold mb-4">
        User Financial Dashboard
      </h1>

      {/* Spending Summary */}
      <SpendingSummary
        transactions={transactions}
        filteredTransactions={filteredTransactions}
        selectedTab={selectedTab}
        totalSpending={totalSpending}
        setSelectedTab={setSelectedTab}
        savingsPercentage={savingsPercentage}
        setSavingsPercentage={setSavingsPercentage}
      />

      {/* Graph and Table in a Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:max-w-6xl">
        <div className="w-full h-64 md:h-72 lg:h-80 bg-white shadow-sm rounded p-4">
          <h3 className="text-lg font-semibold mb-4">
            Monthly Insights (Actual vs Predicted)
          </h3>
          {filteredTransactions.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(tick) => {
                    const date = new Date(tick);
                    return formatDate(date); // Format it to your desired format
                  }}
                />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  labelFormatter={(label) => formatDate(new Date(label))}
                />
                <Line
                  type="monotone"
                  data={filteredTransactions} // Use filtered transactions based on date range
                  dataKey="amount"
                  stroke="#8884d8"
                  name="Actual"
                />
                <Line
                  type="monotone"
                  data={predictedTransactions} // Use predicted spending data
                  dataKey="amount"
                  stroke="#82ca9d"
                  name="Predicted"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No data for the selected date range.</p>
          )}
        </div>

        <div className="w-full h-64 md:h-72 lg:h-80 bg-white shadow-sm rounded p-4">
          <div className="mb-4 flex flex-col sm:flex-row items-center">
            <h3 className="flex-1 text-lg font-semibold mb-4">
              Today's Transactions
            </h3>
            <label className="text-sm font-medium text-gray-700 mr-4 mb-4">
              Select Date:
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="border rounded-md mb-4 bg-white text-black"
            />
          </div>

          <div className="overflow-y-auto h-64 md:h-72 lg:h-80">
            {selectedDateTransactions.length > 0 ? (
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Merchant</th>
                    <th className="p-2 border">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDateTransactions.map((transaction) => (
                    <tr key={transaction.transactionId} className="border-b">
                      <td className="p-2 border">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="p-2 border">
                        {formatCurrency(Math.abs(transaction.amount))}
                      </td>
                      <td className="p-2 border">{transaction.merchant}</td>
                      <td className="p-2 border">{transaction.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No transactions found for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


