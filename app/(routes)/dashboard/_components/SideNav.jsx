"use client";

import React, { useEffect } from 'react';
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'; 
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid, 
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank, 
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText, 
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Goals',
            icon: ShieldCheck, 
            path: '/dashboard/goals'
        }
    ];

    const path = usePathname();
    
    useEffect(() => {
        console.log(path); 
    }, [path]);

    return (
        <div className='h-screen p-5'>
            <Image 
                src={'/golden.png'} 
                alt='logo'
                width={200}
                height={100}
            />
            <div className='mt-5'>
                {menuList.map((menu) => (
                    <Link href={menu.path} key={menu.id}>
                        <h2 className={`flex gap-2 items-center mb-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md
                            hover:text-primary hover:bg-blue-100 ${path === menu.path ? 'text-primary bg-blue-100' : ''}`}>
                            <menu.icon /> 
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