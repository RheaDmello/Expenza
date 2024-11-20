// "use client";

// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
// import EmojiPicker from 'emoji-picker-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useUser } from '@clerk/nextjs';
// import { db } from '@/utils/dbConfig';
// import { Budgets } from '@/utils/schema';
// import { toast } from 'sonner'; 

// function CreateBudget({ refreshData }) {
//   const [emojiIcon, setEmojiIcon] = useState('😊');
//   const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
//   const [name, setName] = useState('');
//   const [amount, setAmount] = useState('');
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const { user } = useUser();

//   const onCreateBudget = async () => {
//     try {
//       const result = await db
//         .insert(Budgets)
//         .values({
//           name: name,
//           amount: parseFloat(amount), 
//           createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous@example.com',
//           icon: emojiIcon,
//         })
//         .returning();

//       if (result) {
//         toast.success('New Budget Created'); 
//         setIsDialogOpen(false); 
//         if (refreshData) refreshData(); 
//       }
//     } catch (error) {
//       console.error('Error creating budget:', error);
//       toast.error('Failed to create budget. Please try again.'); 
//     }
//   };

//   const handleEmojiClick = (emojiData) => {
//     setEmojiIcon(emojiData.emoji);
//     setOpenEmojiPicker(false);
//   };

//   return (
//     <div>
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogTrigger asChild>
//           <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
//             <h2 className="text-3xl">+ </h2>
//             <h2>Create New Budget</h2>
//           </div>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create New Budget</DialogTitle>
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
//                 <Input placeholder="e.g., Food" onChange={(e) => setName(e.target.value)} />
//               </div>

//               <div className="mt-2">
//                 <h2 className="text-black font-medium my-1">Budget Amount</h2>
//                 <Input type="number" placeholder="e.g., 5000" onChange={(e) => setAmount(e.target.value)} />
//               </div>
//             </div>
//           </DialogHeader>
//           <DialogFooter className="sm:justify-start">
//             <DialogClose asChild>
//               <Button disabled={!(name && amount)} onClick={onCreateBudget} className="mt-5 w-full">
//                 Create Budget
//               </Button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default CreateBudget;

"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import EmojiPicker from 'emoji-picker-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { toast } from 'sonner'; 

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUser();

  const onCreateBudget = async () => {
    try {
      const result = await db
        .insert(Budgets)
        .values({
          name: name,
          amount: parseFloat(amount), 
          createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous@example.com',
          icon: emojiIcon,
        })
        .returning();

      if (result) {
        toast.success('New Budget Created'); 
        setIsDialogOpen(false); 
        if (refreshData) refreshData(); 
      }
    } catch (error) {
      console.error('Error creating budget:', error);
      toast.error('Failed to create budget. Please try again.'); 
    }
  };

  const handleEmojiClick = (emojiData) => {
    setEmojiIcon(emojiData.emoji);
    setOpenEmojiPicker(false);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-5 rounded-lg flex flex-col justify-center items-center border-2 border-dashed cursor-pointer hover:shadow-md h-[170px]">
            <h2 className="text-3xl">+ </h2>
            <h2 className="text-lg">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>Please choose an emoji for your budget.</DialogDescription>

            <div className="mt-5">
              <Button variant="outline" className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                {emojiIcon}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-20">
                  <EmojiPicker onEmojiClick={(e) => handleEmojiClick(e)} />
                </div>
              )}
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Name</h2>
                <Input placeholder="e.g., Food" onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input type="number" placeholder="e.g., 5000" onChange={(e) => setAmount(e.target.value)} />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button disabled={!(name && amount)} onClick={onCreateBudget} className="mt-5 w-full">
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
