"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardInfo from "./_components/CardInfo";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@/utils/dbConfig";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

export default function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(${Expenses.amount})`,
          totalItem: sql`COUNT(${Expenses.id})`,
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
      getAllExpenses();
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };


  /**Used to get all expenses belonging to the user */
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
   
  }

  const capitalizeFirstLetter = (str) => {
    if (!str) return null;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">
        Hi, {capitalizeFirstLetter(user?.username) || "there"}!
      </h2>
      <p className="text-gray-500">
        Here's what's happening with your money. Let's manage your expenses!
      </p>
      <CardInfo budgetList={budgetList} />

      {/* Layout for chart and budgets */}
      <div className="mt-12 flex flex-col md:flex-row gap-8">
        {/* Left side: Chart */}
        <div className="flex-1">
          <BarChartDashboard budgetList={budgetList} />
        
        <ExpenseListTable
        expensesList={expensesList}
        refreshData={()=>getBudgetList()}/></div>

        {/* Right side: Budgets */}
        <div className="flex-1 flex flex-col space-y-5">
          <h2 className="font-bold text-lg">Latest Budget</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
