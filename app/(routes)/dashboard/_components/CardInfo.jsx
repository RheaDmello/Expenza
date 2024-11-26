import { index } from 'drizzle-orm/mysql-core';
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    if (budgetList && Array.isArray(budgetList) && budgetList.length > 0) {
      console.log('budgetList has changed:', budgetList);
      CalculateCardInfo();
    } else {
      console.log('budgetList is empty or invalid:', budgetList);
    }
  }, [budgetList]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    console.log('Calculating total budget and total spend:');

    budgetList.forEach((element, index) => {
      console.log(`Element ${index}:`, element);

      const amount = parseFloat(element.amount);
      const spend = parseFloat(element.totalSpend) || 0;

      if (isNaN(amount) || isNaN(spend)) {
        console.error(`Invalid data at index ${index}:`, element);
      }

      totalBudget_ += amount;
      totalSpend_ += spend;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);

    console.log('Total Budget Calculated:', totalBudget_);
    console.log('Total Spend Calculated:', totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">Rs. {totalBudget}</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Amount Spent</h2>
              <h2 className="font-bold text-2xl">Rs. {totalSpend}</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. of Budgets</h2>
              <h2 className="font-bold text-2xl">{budgetList.length}</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
