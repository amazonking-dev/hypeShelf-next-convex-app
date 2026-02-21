import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/lib/convex/client";
import { ToastProvider } from "@/components/ui/Toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "HypeShelf - Collect and share the stuff you're hyped about",
  description: "A shared recommendations hub for friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <ToastProvider>
          <html lang="en">
            <body>
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              <ErrorBoundary>
                <div id="main-content" tabIndex={-1}>
                  {children}
                </div>
              </ErrorBoundary>
            </body>
          </html>
        </ToastProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
