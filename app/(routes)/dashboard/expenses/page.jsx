// "use client";

// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { db } from "@/utils/dbConfig"; // Update path as per your project
// import { Expenses, Budgets } from "@/utils/schema"; // Ensure correct schema import
// import { eq, desc } from "drizzle-orm";
// import ExpenseListTable from "./_components/ExpenseListTable"; // Adjust path as needed

// const LatestExpenses = () => {
//   const { user } = useUser();
//   const [expensesList, setExpensesList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       fetchLatestExpenses();
//     }
//   }, [user]);

//   const fetchLatestExpenses = async () => {
//     try {
//       // Fetch the latest expenses for the logged-in user
//       const result = await db
//         .select({
//           id: Expenses.id,
//           name: Expenses.name,
//           amount: Expenses.amount,
//           createdAt: Expenses.createdAt,
//         })
//         .from(Budgets)
//         .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
//         .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
//         .orderBy(desc(Expenses.id));

//       setExpensesList(result);
//     } catch (error) {
//       console.error("Error fetching latest expenses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-10">
//       <h2 className='font-bold text-3xl mb-7'>My Expenses</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : expensesList.length > 0 ? (
//         <ExpenseListTable
//           expensesList={expensesList}
//           refreshData={fetchLatestExpenses} // Optional refresh if deletions are allowed
//         />
//       ) : (
//         <p>No expenses found.</p>
//       )}
//     </div>
//   );
// };

// export default LatestExpenses;


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig"; // Update path as per your project
import { Expenses, Budgets } from "@/utils/schema"; // Ensure correct schema import
import { eq, desc } from "drizzle-orm";
import ExpenseListTable from "./_components/ExpenseListTable"; // Adjust path as needed

const LatestExpenses = () => {
  const { user } = useUser();
  const router = useRouter(); // Initialize useRouter
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLatestExpenses();
    }
  }, [user]);

  const fetchLatestExpenses = async () => {
    try {
      // Fetch the latest expenses for the logged-in user
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));

      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching latest expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className="flex items-center mb-7">
        <button
          className="text-black hover:text-gray-700"
          onClick={() => router.back()} // Navigate to the previous page
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="font-bold text-3xl ml-2">My Expenses</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : expensesList.length > 0 ? (
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={fetchLatestExpenses} // Optional refresh if deletions are allowed
        />
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default LatestExpenses;


