import { SignInButtonWrapper } from "@/components/ui/SignInButtonWrapper";
import { LatestRecommendations } from "@/components/recommendations/LatestRecommendations";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Branding */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              HypeShelf
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              Collect and share the stuff you&apos;re hyped about.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <SignInButtonWrapper redirectUrl="/recommendations">
              <button className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Sign in to add yours
              </button>
            </SignInButtonWrapper>
          </div>

          {/* Description */}
          <div className="mt-16 max-w-2xl mx-auto">
            <p className="text-gray-500 text-lg leading-relaxed">
              Discover amazing recommendations from friends and share your favorite movies,
              shows, and more. Join our community of enthusiasts and build your personal
              collection of hype-worthy content.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Recommendations Section */}
      <LatestRecommendations limit={8} />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Discover</h3>
            <p className="text-gray-600">
              Find new favorites recommended by people you trust
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Share</h3>
            <p className="text-gray-600">
              Build your personal shelf of recommendations
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Connect</h3>
            <p className="text-gray-600">
              See what your friends are excited about
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
