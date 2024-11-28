"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function Header() {
  const { user, isSignedIn } = useUser(); 

  return (
    <div className='p-5 flex justify-between items-center shadow-sm'>
      <Image
        src='/golden.png' 
        alt='logo'
        width={200}
        height={100}
      />
      
      {isSignedIn ? (
        <UserButton /> 
      ) : (
        <Link href={'/sign-in'}>
          <Button>Get Started</Button> 
        </Link>
      )}
    </div>
  );
}

export default Header;
