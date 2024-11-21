

"use client";

import { SignIn } from '@clerk/nextjs';
import { useSignIn } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { isLoaded, isSignedIn } = useSignIn();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
      router.refresh(); // Force a refresh to ensure the new auth state is recognized
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://deepdreamgenerator.com/storage/fast_queue/temp_images/101de443a3b23050580323cae0cfdf4bd8f1a078.jpg"
            //src="https://static.vecteezy.com/system/resources/thumbnails/010/786/532/small_2x/note-book-with-pencil-and-office-equipment-on-desktop-photo.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Expenza
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Simplify your Expense management with Expenza!
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <SignIn redirectUrl="/dashboard" routing="path" />
          </div>
        </main>
      </div>
    </section>
  );
}