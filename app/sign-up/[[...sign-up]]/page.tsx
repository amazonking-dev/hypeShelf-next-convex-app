import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <SignUp
          routing="path"
          path="/sign-up"
          afterSignInUrl="/recommendations"
          afterSignUpUrl="/recommendations"
        />
      </div>
    </div>
  );
}
