import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Stats from "@/components/Stats"
import Architecture from "@/components/Architecture"
import CliDemo from "@/components/CliDemo"
import Screenshots from "@/components/Screenshots"
import Comparison from "@/components/Comparison"
import GitHubStars from "@/components/GitHubStars"
import Cta from "@/components/Cta"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Architecture />
      <CliDemo />
      <Screenshots />
      <Comparison />
      <GitHubStars />
      <Cta />
      <Footer />
    </>
  )
}
