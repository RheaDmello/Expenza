"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { eq } from 'drizzle-orm';
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; 
import EmojiPicker from "emoji-picker-react"; 
import { toast } from "sonner";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";

const EditBudget = ({ budgetInfo, refreshData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || "😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name || "");
  const [amount, setAmount] = useState(budgetInfo?.amount || "");

  const handleEmojiClick = (event, emojiObject) => {
    setEmojiIcon(emojiObject.emoji);
    setOpenEmojiPicker(false);
  };

  const onUpdateBudget = async () => {
    try {
      const result = await db
        .update(Budgets)
        .set({
          name,
          amount: parseFloat(amount),
          icon: emojiIcon, 
        })
        .where(eq(Budgets.id, budgetInfo?.id))
        .returning();

      if (result) {
        toast.success("Budget updated successfully!");
        setIsDialogOpen(false);
        if (refreshData) refreshData();
      }
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Failed to update budget. Please try again.");
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>Edit your budget details below.</DialogDescription>
            <div className="mt-5">
              <Button
                variant="outline"
                className="text-lg"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-20">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Name</h2>
                <Input
                  placeholder="e.g., Food"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g., 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={!(name && amount)} 
              onClick={onUpdateBudget}
              className="mt-5 w-full"
            >
              Update Budget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;