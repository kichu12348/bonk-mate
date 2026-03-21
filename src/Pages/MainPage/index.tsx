import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import About from "./components/About";
import Features from "./components/Features";
import Download from "./components/Download";
import Contribute from "./components/Contribute";

function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Download />
      <Contribute />
    </main>
  );
}

export default App;
