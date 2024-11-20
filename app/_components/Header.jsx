"use client"; // This is needed for Client-Side rendering in Next.js

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function Header() {
  const { user, isSignedIn } = useUser(); // Get user and sign-in status from Clerk

  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Image
        src={'./logo.svg'}
        alt='logo'
        width={160}
        height={100}
      />
      
      {isSignedIn ? (
        <UserButton /> // Show the user button if the user is signed in
      ) : (
        <Link href={'/sign-in'}>
          <Button>Get Started</Button> 
        </Link>
      )}
    </div>
  );
}

export default Header;
