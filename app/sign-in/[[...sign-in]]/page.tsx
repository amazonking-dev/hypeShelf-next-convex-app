import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <SignIn
          routing="path"
          path="/sign-in"
          afterSignInUrl="/recommendations"
          afterSignUpUrl="/recommendations"
        />
      </div>
    </div>
  );
}
