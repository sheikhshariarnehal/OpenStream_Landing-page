"use client"

import { Download, Zap, Shield, Star, Play, Tv, Film, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const handleAppDownload = () => {
    window.open("https://cloudstream-apk.com/wp-content/uploads/2025/04/4.5.2_(cloudstream-apk.com).apk", "_blank")
  }

  const handleRepoInstall = () => {
    window.location.href = "cloudstreamrepo://raw.githubusercontent.com/nehalDIU/nehal-CloudStream/master/repo.json"
  }

  const copyRepoUrl = () => {
    navigator.clipboard.writeText("https://raw.githubusercontent.com/nehalDIU/nehal-CloudStream/master/repo.json")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/a927b1ee-784d-494a-aa80-cf7a062d2523/web/BD-en-20250714-TRIFECTA-perspective_90a16610-d777-44e5-b344-bf7bfac84bd9_large.jpg"
            alt="Netflix Style Streaming Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge className="bg-red-600/20 text-red-300 border-red-500/30 text-sm px-4 py-2 backdrop-blur-sm">
                    🎬 Premium OTT Platform
                  </Badge>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Your Ultimate
                    <span className="block bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                      Streaming Hub
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                    Access unlimited movies, series, and anime from top OTT servers like{" "}
                    <span className="text-red-400 font-semibold">Netflix</span>,{" "}
                    <span className="text-blue-400 font-semibold">Prime Video</span>,{" "}
                    <span className="text-purple-400 font-semibold">Disney+</span> and premium BDix servers.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-500/30">
                      ✨ Totally Free
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                      🚫 No Ads
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                      🔥 HD Quality
                    </Badge>
                  </div>
                </div>

                {/* Platform Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <Film className="h-8 w-8 text-red-400 mb-2" />
                    <div className="text-white font-semibold text-sm">Movies</div>
                    <div className="text-gray-400 text-xs">Latest Releases</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <Tv className="h-8 w-8 text-blue-400 mb-2" />
                    <div className="text-white font-semibold text-sm">TV Series</div>
                    <div className="text-gray-400 text-xs">Binge Watch</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <Play className="h-8 w-8 text-purple-400 mb-2" />
                    <div className="text-white font-semibold text-sm">Anime</div>
                    <div className="text-gray-400 text-xs">Sub & Dub</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <Gamepad2 className="h-8 w-8 text-green-400 mb-2" />
                    <div className="text-white font-semibold text-sm">Live TV</div>
                    <div className="text-gray-400 text-xs">24/7 Channels</div>
                  </div>
                </div>

                {/* Main CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAppDownload}
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold shadow-2xl shadow-red-500/25"
                  >
                    <Download className="mr-3 h-6 w-6" />
                    Download App
                  </Button>

                  <Button
                    onClick={handleRepoInstall}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl shadow-purple-500/25"
                  >
                    <Zap className="mr-3 h-6 w-6" />
                    Connect Server
                  </Button>
                </div>
              </div>

              {/* Right Content - Feature Cards */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:from-white/15 hover:to-white/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Premium Servers</h3>
                        <p className="text-gray-300 text-sm">Netflix • Prime • Disney+ • Hulu</p>
                      </div>
                    </div>
                    <p className="text-gray-200 text-sm">
                      Access content from major OTT platforms with high-quality streaming and fast loading times.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:from-white/15 hover:to-white/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">BDix Servers</h3>
                        <p className="text-gray-300 text-sm">ICC FTP • DFlix FTP • Local Servers</p>
                      </div>
                    </div>
                    <p className="text-gray-200 text-sm">
                      Lightning-fast local servers for seamless streaming with minimal buffering and data usage.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:from-white/15 hover:to-white/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Zero Cost</h3>
                        <p className="text-gray-300 text-sm">Free Forever • No Subscriptions</p>
                      </div>
                    </div>
                    <p className="text-gray-200 text-sm">
                      Enjoy unlimited entertainment without any subscription fees, ads, or hidden charges.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Quick Setup Guide */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Streaming in{" "}
                <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                  60 Seconds
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Simple setup process to access thousands of movies, series, and anime
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-sm hover:from-blue-600/30 hover:to-blue-800/30 transition-all duration-300">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Download className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Download & Install</h3>
                  <p className="text-blue-100 mb-8 leading-relaxed">
                    Get the latest Cloudstream APK and install it on your Android device. Enable "Unknown Sources" in
                    settings if prompted.
                  </p>
                  <Button
                    onClick={handleAppDownload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                  >
                    Download APK (Latest)
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Connect Server</h3>
                  <p className="text-purple-100 mb-8 leading-relaxed">
                    One-click installation to connect to our premium content servers with access to all major OTT
                    platforms and BDix servers.
                  </p>
                  <Button
                    onClick={handleRepoInstall}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                  >
                    Connect Server
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Server Logos */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">Supported Platforms & Servers</h3>
                <p className="text-gray-400">Premium streaming sources and high-speed local servers</p>
              </div>

              <div id="servers-section" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {/* OTT Platforms */}
                <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.71.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z" />
                      </svg>
                    </div>
                    <h4 className="text-red-300 font-bold text-sm mb-1">NETFLIX</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 hover:from-blue-600/30 hover:to-blue-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.008 0C5.383 0 0 5.383 0 12.008S5.383 24 12.008 24 24 18.625 24 12.008 18.625 0 12.008 0zm6.136 16.504c-.237.362-.565.557-.925.557-.349 0-.694-.186-.925-.557L12.008 9.65l-4.286 6.854c-.231.371-.576.557-.925.557-.36 0-.688-.195-.925-.557a1.052 1.052 0 0 1 .004-1.204l4.711-7.533c.463-.738 1.382-.738 1.845 0l4.711 7.533c.348.557.348 1.064.001 1.204z" />
                      </svg>
                    </div>
                    <h4 className="text-blue-300 font-bold text-sm mb-1">PRIME VIDEO</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 hover:from-purple-600/30 hover:to-purple-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.988-5.366 11.988-11.99C24.005 5.367 18.641.001 12.017.001zM9.624 6.174l2.8 4.333-2.8 4.333H5.96l2.8-4.333L5.96 6.174h3.664zm8.393 0L15.22 10.507l2.797 4.333h-3.664l-2.8-4.333 2.8-4.333h3.664z" />
                      </svg>
                    </div>
                    <h4 className="text-purple-300 font-bold text-sm mb-1">DISNEY+</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 hover:from-orange-600/30 hover:to-orange-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
                      </svg>
                    </div>
                    <h4 className="text-orange-300 font-bold text-sm mb-1">HULU</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-600/20 to-pink-700/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-6 hover:from-pink-600/30 hover:to-pink-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                    </div>
                    <h4 className="text-pink-300 font-bold text-sm mb-1">MOVIEBOX</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                {/* BDix Servers */}
                <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 hover:from-green-600/30 hover:to-green-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                    </div>
                    <h4 className="text-green-300 font-bold text-sm mb-1">ICC FTP</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 hover:from-cyan-600/30 hover:to-cyan-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                        />
                      </svg>
                    </div>
                    <h4 className="text-cyan-300 font-bold text-sm mb-1">DFLIX FTP</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-700/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-6 hover:from-indigo-600/30 hover:to-indigo-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                    <h4 className="text-indigo-300 font-bold text-sm mb-1">CIRCLE FTP</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                {/* Anime Servers */}
                <div className="bg-gradient-to-br from-violet-600/20 to-violet-700/20 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-6 hover:from-violet-600/30 hover:to-violet-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-violet-300 font-bold text-sm mb-1">HIANIME</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-600/20 to-rose-700/20 backdrop-blur-sm border border-rose-500/30 rounded-2xl p-6 hover:from-rose-600/30 hover:to-rose-700/30 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-rose-300 font-bold text-sm mb-1">9ANIME</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features-section" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Premium Features</h2>
              <p className="text-xl text-gray-300">Everything you need for the ultimate streaming experience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">4K Quality</h3>
                  <p className="text-gray-300 text-sm">Ultra HD streaming with crystal clear picture quality</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Fast Servers</h3>
                  <p className="text-gray-300 text-sm">Multiple high-speed servers for buffer-free streaming</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <Download className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Offline Download</h3>
                  <p className="text-gray-300 text-sm">Download content for offline viewing anytime</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Ad-Free</h3>
                  <p className="text-gray-300 text-sm">Enjoy uninterrupted streaming without any advertisements</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Common questions about our streaming platform</p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              <div className="border border-gray-300 rounded">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium text-gray-900">How do I use the direct server connection?</h3>
                    <svg
                      className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700">
                      Click the "Connect Server" button on our homepage. This will automatically open Cloudstream and
                      connect to our content servers. Make sure Cloudstream is installed first.
                    </p>
                  </div>
                </details>
              </div>

              <div className="border border-gray-300 rounded">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium text-gray-900">What if the direct connection doesn't work?</h3>
                    <svg
                      className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 mb-3">
                      You can manually add our repository URL in Cloudstream settings:
                    </p>
                    <div className="bg-gray-100 p-3 rounded border mb-3">
                      <code className="text-sm text-gray-800">
                        https://raw.githubusercontent.com/nehalDIU/nehal-CloudStream/master/repo.json
                      </code>
                    </div>
                    <p className="text-gray-700">
                      Go to Cloudstream Settings → Extensions → Add Repository → Paste URL → Save
                    </p>
                  </div>
                </details>
              </div>

              <div className="border border-gray-300 rounded">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium text-gray-900">Is this platform safe to use?</h3>
                    <svg
                      className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700">
                      Yes, our platform is safe. We don't host content directly - we provide access to existing servers.
                      No personal data is collected, no ads or malware. Always download Cloudstream from official
                      sources.
                    </p>
                  </div>
                </details>
              </div>

              <div className="border border-gray-300 rounded">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium text-gray-900">Which devices are supported?</h3>
                    <svg
                      className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 mb-2">Supported devices:</p>
                    <ul className="text-gray-700 ml-4">
                      <li>• Android devices (Android 5.0+)</li>
                      <li>• Android TV and TV boxes</li>
                      <li>• Windows PC (via emulator)</li>
                      <li>• Chromecast support</li>
                    </ul>
                    <p className="text-gray-600 text-sm mt-2">Note: iOS devices are not supported.</p>
                  </div>
                </details>
              </div>

              <div className="border border-gray-300 rounded">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium text-gray-900">How often are servers updated?</h3>
                    <svg
                      className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 mb-2">Update schedule:</p>
                    <ul className="text-gray-700 ml-4">
                      <li>• Movies: 24-48 hours after release</li>
                      <li>• TV Shows: 2-6 hours after airing</li>
                      <li>• Anime: 1-3 hours after airing</li>
                      <li>• Servers: Continuously monitored</li>
                    </ul>
                  </div>
                </details>
              </div>

              <div className="border border-gray-300 rounded">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium text-gray-900">Can I download content for offline viewing?</h3>
                    <svg
                      className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700">
                      Yes! Cloudstream supports downloading movies, TV episodes, and anime for offline viewing. Choose
                      from multiple quality options and manage downloads within the app.
                    </p>
                  </div>
                </details>
              </div>

              <div className="border border-gray-300 rounded">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium text-gray-900">What video qualities are available?</h3>
                    <svg
                      className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 mb-2">Available qualities:</p>
                    <ul className="text-gray-700 ml-4">
                      <li>• 4K Ultra HD (2160p)</li>
                      <li>• Full HD (1080p)</li>
                      <li>• HD (720p)</li>
                      <li>• SD (480p)</li>
                    </ul>
                    <p className="text-gray-600 text-sm mt-2">Quality depends on source and internet speed.</p>
                  </div>
                </details>
              </div>

              <div className="border border-gray-300 rounded">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium text-gray-900">Are subtitles available?</h3>
                    <svg
                      className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 mb-2">Subtitle features:</p>
                    <ul className="text-gray-700 ml-4">
                      <li>• Multiple languages available</li>
                      <li>• Sub and dub versions for anime</li>
                      <li>• Customizable appearance</li>
                      <li>• Auto-sync functionality</li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>

            {/* Support Section */}
            <div className="mt-12 text-center">
              <div className="border border-gray-300 rounded p-6 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-2">Need more help?</h3>
                <p className="text-gray-600 mb-4">Contact our support team for additional assistance.</p>
                <div className="space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 p-0 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-full"
                    onClick={() => window.open("https://github.com/nehalDIU/nehal-CloudStream/issues", "_blank")}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-full"
                    onClick={() => window.open("https://discord.gg/cloudstream", "_blank")}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.076.076 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 bg-gray-800 hover:bg-blue-500 text-gray-400 hover:text-white rounded-full"
                    onClick={() => window.open("https://t.me/cloudstream", "_blank")}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-.902-.46-.902-.46" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent mb-3">
                    CloudStream Hub
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Your ultimate destination for unlimited movies, series, and anime streaming. Access premium content
                    from top OTT platforms completely free.
                  </p>
                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Global Service
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    24/7 Available
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-full transition-colors"
                    onClick={() => window.open("https://github.com/nehalDIU/nehal-CloudStream", "_blank")}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-full transition-colors"
                    onClick={() => window.open("https://discord.gg/cloudstream", "_blank")}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.076 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 bg-gray-800 hover:bg-blue-500 text-gray-400 hover:text-white rounded-full transition-colors"
                    onClick={() => window.open("https://t.me/cloudstream", "_blank")}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-full transition-colors"
                    onClick={() => window.open("https://www.youtube.com/@cloudstream", "_blank")}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 bg-gray-800 hover:bg-blue-400 text-gray-400 hover:text-white rounded-full transition-colors"
                    onClick={() => window.open("https://twitter.com/cloudstream", "_blank")}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={handleAppDownload}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download App
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleRepoInstall}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Connect Server
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => document.querySelector("#faq-section")?.scrollIntoView({ behavior: "smooth" })}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      FAQ
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        document.querySelector("#features-section")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Features
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => document.querySelector("#servers-section")?.scrollIntoView({ behavior: "smooth" })}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                      Servers
                    </button>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => window.open("https://github.com/nehalDIU/nehal-CloudStream/issues", "_blank")}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Report Issue
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => window.open("https://github.com/nehalDIU/nehal-CloudStream/wiki", "_blank")}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Documentation
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => window.open("https://discord.gg/cloudstream", "_blank")}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                      Community Chat
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => window.open("https://github.com/nehalDIU/nehal-CloudStream/releases", "_blank")}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                        />
                      </svg>
                      Updates
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        window.open(
                          "https://github.com/nehalDIU/nehal-CloudStream/blob/master/TROUBLESHOOTING.md",
                          "_blank",
                        )
                      }
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Troubleshooting
                    </button>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Get notified about new features, server updates, and important announcements.
                </p>
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const email = e.target.email.value
                    if (email) {
                      alert("Thank you for subscribing! We'll keep you updated.")
                      e.target.reset()
                    }
                  }}
                >
                  <div className="flex">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-l-none"
                    >
                      Subscribe
                    </Button>
                  </div>
                </form>
                <p className="text-gray-500 text-xs mt-2">We respect your privacy. Unsubscribe at any time.</p>

                {/* App Badges */}
                <div className="mt-6">
                  <p className="text-gray-400 text-sm mb-3">Download our app:</p>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={handleAppDownload}
                      className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
                    >
                      <svg className="w-6 h-6 text-green-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.523 15.3414c-.27-.168-.626-.168-.896 0s-.27.439 0 .606l.896-.606zm-2.746-2.909c.27.168.626.168.896 0s.27-.439 0-.606l-.896.606zm.896-1.414c.27-.168.27-.439 0-.606s-.626-.168-.896 0l.896.606zm-2.746 2.909c-.27.168-.27.439 0 .606s.626.168.896 0l-.896-.606z" />
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-400">GET IT ON</div>
                        <div className="text-sm font-semibold text-white">Android APK</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                  <p className="text-gray-400 text-sm">© 2024 CloudStream Hub. All rights reserved.</p>
                  <div className="flex space-x-4 text-sm">
                    <button
                      onClick={() =>
                        window.open("https://github.com/nehalDIU/nehal-CloudStream/blob/master/PRIVACY.md", "_blank")
                      }
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </button>
                    <button
                      onClick={() =>
                        window.open("https://github.com/nehalDIU/nehal-CloudStream/blob/master/TERMS.md", "_blank")
                      }
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </button>
                    <button
                      onClick={() =>
                        window.open("https://github.com/nehalDIU/nehal-CloudStream/blob/master/LICENSE", "_blank")
                      }
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      License
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    All Systems Operational
                  </div>
                  <div className="text-gray-400 text-sm">v4.5.2</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                  <div>
                    <h5 className="text-white font-medium mb-2">Open Source</h5>
                    <p className="text-gray-400 text-sm">
                      CloudStream is open source and community-driven. Contribute on GitHub.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Free Forever</h5>
                    <p className="text-gray-400 text-sm">
                      No subscriptions, no ads, no hidden fees. Always free for everyone.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Global Community</h5>
                    <p className="text-gray-400 text-sm">
                      Join thousands of users worldwide enjoying unlimited streaming.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
