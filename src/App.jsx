import FxOverlays from './components/FxOverlays'
import CustomCursor from './components/CustomCursor'
import Chrome from './components/Chrome'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import MarqueeDivider from './components/MarqueeDivider'
import Repo from './components/Repo'
import Faq from './components/Faq'
import Contact from './components/Contact'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <>
      {/* full-page texture + custom cursor + fixed OS chrome */}
      <FxOverlays />
      <CustomCursor />
      <Chrome />

      {/* content is pushed below the 36px fixed status bar */}
      <main className="pt-9">
        <Hero />
        <About />
        <Work />
        <MarqueeDivider />
        <Repo />
        <Faq />
        <Contact />
      </main>
    </>
  )
}
