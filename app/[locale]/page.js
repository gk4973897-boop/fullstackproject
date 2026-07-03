import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white">

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl animate-pulse"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">

        <div>
          <h1 className="text-3xl font-extrabold tracking-wide">
            🚀 InternHub
          </h1>
        </div>

        <div className="hidden md:flex gap-6 text-lg">

          <Link
            href="/en/public-space"
            className="hover:text-cyan-400 transition"
          >
            Public Space
          </Link>

          <Link
            href="/en/dashboard"
            className="hover:text-cyan-400 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/en/resume"
            className="hover:text-cyan-400 transition"
          >
            Resume
          </Link>

          <Link
            href="/en/login"
            className="hover:text-cyan-400 transition"
          >
            Login
          </Link>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24">

        <h2 className="text-6xl md:text-7xl font-black leading-tight">

          Build Your <br />

          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">

            Career With InternHub

          </span>

        </h2>

        <p className="mt-8 text-gray-300 max-w-2xl text-lg leading-8">

          Connect with students, create amazing resumes,
          explore opportunities, and grow your professional
          network on one platform.

        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link
            href="/en/login"
            className="rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold shadow-xl transition hover:scale-110 hover:bg-cyan-400"
          >
            🔐 Get Started
          </Link>

          <Link
            href="/en/public-space"
            className="rounded-full border border-white/30 px-8 py-4 text-lg font-bold backdrop-blur-lg transition hover:bg-white/10 hover:scale-110"
          >
            🌍 Explore
          </Link>

        </div>

      </section> 
      {/* Feature Cards */}

      <section className="relative z-10 mt-28 px-6 pb-20">

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Dashboard */}

          <Link
            href="/en/dashboard"
            className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-4 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.4)]"
          >
            <div className="text-6xl transition duration-500 group-hover:scale-125">
              📊
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Dashboard
            </h3>

            <p className="mt-3 text-gray-300">
              View activities, manage your account,
              and track everything from one place.
            </p>
          </Link>

          {/* Resume */}

          <Link
            href="/en/resume"
            className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-4 hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]"
          >
            <div className="text-6xl transition duration-500 group-hover:scale-125">
              📄
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Resume Builder
            </h3>

            <p className="mt-3 text-gray-300">
              Build professional resumes in seconds
              and keep them securely stored.
            </p>
          </Link>

          {/* Public */}

          <Link
            href="/en/public-space"
            className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-4 hover:border-orange-400 hover:shadow-[0_0_35px_rgba(251,146,60,0.4)]"
          >
            <div className="text-6xl transition duration-500 group-hover:scale-125">
              🌍
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Public Space
            </h3>

            <p className="mt-3 text-gray-300">
              Share posts, connect with students,
              and grow your community.
            </p>
          </Link>

          {/* Login */}

          <Link
            href="/en/login"
            className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-4 hover:border-green-400 hover:shadow-[0_0_35px_rgba(34,197,94,0.4)]"
          >
            <div className="text-6xl transition duration-500 group-hover:scale-125">
              🔐
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Login
            </h3>

            <p className="mt-3 text-gray-300">
              Secure authentication using Email
              and OTP verification.
            </p>
          </Link>

        </div>

      </section>
      {/* Why Choose InternHub */}

      <section className="relative z-10 px-6 py-20">

        <div className="mx-auto max-w-6xl text-center">

          <h2 className="text-5xl font-extrabold">
            Why Choose
            <span className="text-cyan-400"> InternHub?</span>
          </h2>

          <p className="mt-5 text-gray-300 text-lg max-w-3xl mx-auto">
            InternHub helps students build resumes, connect with
            the community, discover opportunities and grow their
            professional network — all in one place.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 hover:scale-105 transition">
            <div className="text-5xl">⚡</div>
            <h3 className="mt-5 text-2xl font-bold">
              Fast Experience
            </h3>
            <p className="mt-3 text-gray-300">
              Lightning fast dashboard powered by Next.js and MongoDB Atlas.
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 hover:scale-105 transition">
            <div className="text-5xl">🛡️</div>
            <h3 className="mt-5 text-2xl font-bold">
              Secure
            </h3>
            <p className="mt-3 text-gray-300">
              Secure login with OTP verification and protected user data.
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 hover:scale-105 transition">
            <div className="text-5xl">🌎</div>
            <h3 className="mt-5 text-2xl font-bold">
              Community
            </h3>
            <p className="mt-3 text-gray-300">
              Share posts, connect with others and build your professional profile.
            </p>
          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="relative z-10 px-6">

        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-8 text-center">
            <h3 className="text-5xl font-black text-cyan-400">100+</h3>
            <p className="mt-3 text-gray-300">Students</p>
          </div>

          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-8 text-center">
            <h3 className="text-5xl font-black text-purple-400">50+</h3>
            <p className="mt-3 text-gray-300">Resumes</p>
          </div>

          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-8 text-center">
            <h3 className="text-5xl font-black text-orange-400">250+</h3>
            <p className="mt-3 text-gray-300">Posts</p>
          </div>

          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-8 text-center">
            <h3 className="text-5xl font-black text-green-400">24×7</h3>
            <p className="mt-3 text-gray-300">Available</p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="relative z-10 py-24 text-center">

        <h2 className="text-5xl font-black">
          Ready to Start?
        </h2>

        <p className="mt-5 text-gray-300 text-lg">
          Join InternHub today and build your professional future.
        </p>

        <Link
          href="/en/login"
          className="inline-block mt-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 text-xl font-bold transition hover:scale-110 shadow-2xl"
        >
          🚀 Start Now
        </Link>

      </section>

      {/* Footer */}

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-gray-400">

        <p className="text-lg">
          ❤️ Built with Next.js • MongoDB Atlas • Razorpay
        </p>

        <p className="mt-2">
          © 2026 InternHub. All Rights Reserved.
        </p>

      </footer>

    </main>
  );
}