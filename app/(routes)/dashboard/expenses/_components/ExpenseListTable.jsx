import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData, setBudgetInfo }) {
  const deleteExpense = async (expense) => {
    try {
      // Delete the expense from the database
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        toast("Expense Deleted");

        // Refresh data after deletion
        if (refreshData) {
          await refreshData();
        }

        // Optionally update budget info if needed
        if (setBudgetInfo) {
          const totalSpend = expensesList
            .filter((exp) => exp.id !== expense.id) // Exclude deleted expense
            .reduce((sum, current) => sum + parseFloat(current.amount), 0);
          setBudgetInfo((prev) => ({
            ...prev,
            totalSpend,
          }));
        }
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expense, index) => (
        <div key={expense.id || index} className="grid grid-cols-4 bg-slate-50 p-2">
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{expense.createdAt}</h2>
          <h2>
            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteExpense(expense)} // Delete on click
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;


