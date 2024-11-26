import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Left Side: Background Image with Text */}
      <div 
        className="relative hidden lg:block bg-cover bg-center"
        style={{ backgroundImage: "url('https://deepdreamgenerator.com/storage/fast_queue/temp_images/101de443a3b23050580323cae0cfdf4bd8f1a078.jpg')" }}
      >
        <div className="absolute bottom-12 left-4 bg-opacity-50 px-3 py-1 rounded text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Sign up 
        </div>
      </div>

      {/* Right Side: SignUp Form */}
      <div className="flex items-center justify-center p-8">
        <SignUp />
      </div>
    </div>
  );
}


