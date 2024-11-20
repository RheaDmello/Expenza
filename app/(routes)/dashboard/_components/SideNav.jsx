"use client";

import React, { useEffect } from 'react';
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'; // Ensure these are correctly installed and imported
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid, // Ensure this is a valid React component
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank, // Ensure this is a valid React component
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText, // Ensure this is a valid React component
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck, // Ensure this is a valid React component
            path: '/dashboard/upgrade'
        }
    ];

    const path = usePathname();
    
    useEffect(() => {
        console.log(path); // Debugging the current pathname
    }, [path]);

    return (
        <div className='h-screen p-5'>
            <Image 
                src={'/logo.svg'} // Ensure the logo path is correct
                alt='logo'
                width={160}
                height={100}
            />
            <div className='mt-5'>
                {menuList.map((menu) => (
                    <Link href={menu.path} key={menu.id}>
                        <h2 className={`flex gap-2 items-center mb-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md
                            hover:text-primary hover:bg-blue-100 ${path === menu.path ? 'text-primary bg-blue-100' : ''}`}>
                            <menu.icon /> {/* Render the icon as a component */}
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
                <UserButton />
                <span>Profile</span>
            </div>
        </div>
    );
}

export default SideNav;