import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData, onExpenseAdded = () => {} }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const addNewExpense = async () => {
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      console.error("Invalid amount:", amount);
      toast.error("Please enter a valid amount.");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

   
    if (isNaN(budgetId) || budgetId === "") {
      console.error("Invalid budget ID", budgetId);
      toast.error("Invalid budget ID.");
      setIsSubmitting(false); 
      return;
    }

    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("User email is missing", user);
      toast.error("User email is missing.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: parseFloat(amount), 
          budgetId: budgetId,
          createdAt: moment().format('DD/MM/YYYY'),
        })
        .returning({ insertedId: Budgets.id }); 

      console.log(result);
      if (result) {
        toast("New Expense Added!");
        refreshData(); 
        onExpenseAdded(result); 

       
        setName(""); 
        setAmount(""); 
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>

      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bed Room Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. Rs. 1000"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button
        disabled={!(name && amount) || isSubmitting} 
        onClick={() => addNewExpense()} 
        className="mt-3 w-full"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;

