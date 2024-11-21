// "use client"
// import { Button } from '@/components/ui/button'
// import { PenBox } from 'lucide-react'
// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
// import { Input } from 'postcss';

// function EditBudget({budgetInfo}) {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [emojiIcon, setEmojiIcon] = useState('😊');
//     const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
//     const [name, setName] = useState('');

//     const onCreateBudget = async () => {
//         try {
//           const result = await db
//             .insert(Budgets)
//             .values({
//               name: name,
//               amount: parseFloat(amount), 
//               createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous@example.com',
//               icon: emojiIcon,
//             })
//             .returning();
    
//           if (result) {
//             toast.success('New Budget Created'); 
//             setIsDialogOpen(false); 
//             if (refreshData) refreshData(); 
//           }
//         } catch (error) {
//           console.error('Error creating budget:', error);
//           toast.error('Failed to create budget. Please try again.'); 
//         }
//       };

//       const onUpdateBudget=async()=>{

//       }
//   return (
//     <div>
        
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogTrigger asChild>
//         <Button className='flex gap-2'> <PenBox/>Edit</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Update Budget</DialogTitle>
//             <DialogDescription>Please choose an emoji for your budget.</DialogDescription>

//             <div className="mt-5">
//               <Button variant="outline" className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
//                 {emojiIcon}
//               </Button>
//               {openEmojiPicker && (
//                 <div className="absolute z-20">
//                   <EmojiPicker onEmojiClick={(e) => handleEmojiClick(e)} />
//                 </div>
//               )}
//               <div className="mt-2">
//                 <h2 className="text-black font-medium my-1">Budget Name</h2>
//                 <Input placeholder="e.g., Food" value={budgetInfo.name} onChange={(e) => setName(e.target.value)} />
//               </div>

//               <div className="mt-2">
//                 <h2 className="text-black font-medium my-1">Budget Amount</h2>
//                 <Input type="number" placeholder="e.g., 5000" onChange={(e) => setAmount(e.target.value)} />
//               </div>
//             </div>
//           </DialogHeader>
//           <DialogFooter className="sm:justify-start">
//             <DialogClose asChild>
//               <Button disabled={!(name && amount)} onClick={onUpdateBudget()} className="mt-5 w-full">
//                 Update Budget
//               </Button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default EditBudget

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
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Correct import path for Input
import EmojiPicker from "emoji-picker-react"; // Ensure this library is installed and correctly imported
import { toast } from "sonner"; // Toast for notifications
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";

function EditBudget({ budgetInfo, refreshData }) {
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
}

export default EditBudget;
