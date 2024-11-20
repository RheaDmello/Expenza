// "use client"; // Make this a client-side component

// import { SignIn, useSignIn } from '@clerk/nextjs';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Use next/navigation for redirection

// export default function Page() {
//   const { isLoaded, isSignedIn } = useSignIn(); // Get the sign-in state
//   const router = useRouter(); // Next.js router for redirection

//   // Redirect to the dashboard after sign-in
//   useEffect(() => {
//     if (isLoaded && isSignedIn) {
//       console.log('Redirecting to dashboard...'); // Log for debugging
//       router.push('/dashboard'); // Redirect to the dashboard
//     }
//   }, [isLoaded, isSignedIn, router]); // Depend on `isLoaded` and `isSignedIn` for triggering

//   // Display loading state while Clerk is loading
//   if (!isLoaded) {
//     return <div>Loading...</div>; // Show loading state until Clerk is ready
//   }

//   return (
//     <>
//       <section className="bg-white">
//         <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
//           <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
//             <img
//               alt=""
//               // src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
//               src="https://static.vecteezy.com/system/resources/thumbnails/010/786/532/small_2x/note-book-with-pencil-and-office-equipment-on-desktop-photo.jpg"
//               className="absolute inset-0 h-full w-full object-cover opacity-80"
//             />
//             <div className="hidden lg:relative lg:block lg:p-12">
//               <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
//                 Welcome to ExPensify
//               </h2>
//               <p className="mt-4 leading-relaxed text-white/90">
//                Simplify your Expense management with ExPensify
//               </p>
//             </div>
//           </section>

//           <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//             <div className="max-w-xl lg:max-w-3xl">
//               <SignIn />
//             </div>
//           </main>
//         </div>
//       </section>
//     </>
//   );
// }

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
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            //src="https://static.vecteezy.com/system/resources/thumbnails/010/786/532/small_2x/note-book-with-pencil-and-office-equipment-on-desktop-photo.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Expenza
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Simplify your Expense management with ExPensify
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