"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, getTableColumns, sql, desc } from "drizzle-orm";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";


const ExpensesScreen = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const route=useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
  }, [user]);

  /** Get Budget Information */
  const getBudgetInfo = async () => {
    if (!id) {
      console.error("Budget ID (id) is missing.");
      return;
    }

    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("User email is missing.");
      return;
    }

    try {
      const budgetId = parseInt(id, 10);

      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`,
          totalItem: sql`count(${Expenses.id})`,
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
        .where(eq(Budgets.id, budgetId))
        .groupBy(Budgets.id);
      
      setBudgetInfo(result[0]);

      console.log("Budget Info:", result);
      getExpensesList();
    } catch (error) {
      console.error("Error fetching budget info:", error);
    } finally {
      setLoading(false);
    }
  };

  /** Get Expenses List */
  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, id))
      .orderBy(desc(Expenses.id));
    
    setExpensesList(result);
    console.log(result);
  };

/**used to delete budget */
  const deleteBudget=async()=>{
    const deleteExpenseResult=await db.delete(Expenses)
    .where(eq(Expenses.budgetId,id))
    .returning();

    if(deleteExpenseResult){
      const result=await db.delete(Budgets)
      .where(eq(Budgets.id,id))
      .returning();
    }
    toast("Budget Deleted!");
    route.replace('/dashboard/budgets')
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6 gap-5">
        <h2 className="text-2xl font-bold flex justify-between items-center">My Expenses</h2>
              <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button className='flex gap-2' variant='destructive'><Trash/>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your current budget along with expenses and remove your data from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>deleteBudget()}> Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      </div>

      {loading ? (
        <p>Loading...</p>
      ) : budgetInfo ? (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
          <BudgetItem budget={budgetInfo} />
          <AddExpense
            budgetId={id}
            user={user}
            refreshData={getBudgetInfo}
          />
        </div>
      ) : (
        <p>No budget information found.</p>
      )}

      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expense</h2>
        <ExpenseListTable
          expensesList={expensesList}
          setExpensesList={setExpensesList} // Pass the setter function for expenses list
          setBudgetInfo={setBudgetInfo} // Pass the setter for budgetInfo
        />
      </div>
    </div>
  );
};

export default ExpensesScreen;




