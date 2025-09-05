import { motion } from "framer-motion";
import ThreeScene from "./ThreeScene";
import { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BuyNow from "./BuyNow";

function HomePage() {
  // Refs for scrolling
  const heroRef = useRef(null);
  const modelRef = useRef(null);
  const infoRef = useRef(null);
  const aboutRef = useRef(null);
  const solvingRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const problems = [
    {
      title: "Reduce Manual Intervention",
      description:
        "Empowers drivers with a self-service solution, drastically reducing manual effort and errors.",
    },
    {
      title: "Solving Key Industry Challenges",
      description:
        "Traditional processes are prone to errors and delays. WAKS eliminates manual intervention, handles challenges like language barriers with its multilingual voice AI, and ensures seamless, uninterrupted operation.",
    },
    {
      title: "Innovative Kiosk System",
      description:
        "Our innovative kiosk system empowers drivers with a self-service solution, drastically reducing manual intervention. This isn't just a beautiful object; it's a powerful tool designed to help you accomplish more, effortlessly.",
    },
    {
      title: "Fraud-Proof System",
      description:
        "Ensures data integrity and prevents manual tampering for a secure weighbridge process.",
    },
  ];

  // State for Go to Top button
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="overflow-x-hidden relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => scrollToSection(heroRef)}
          >
            WAKS
          </h1>
          <div className="flex space-x-6 items-center">
            <button onClick={() => scrollToSection(heroRef)} className="hover:text-gray-400">
              Home
            </button>
            <button onClick={() => scrollToSection(modelRef)} className="hover:text-gray-400">
              3D Model
            </button>
            <button onClick={() => scrollToSection(infoRef)} className="hover:text-gray-400">
              Info
            </button>
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-gray-400">
              About
            </button>
            <button onClick={() => scrollToSection(solvingRef)} className="hover:text-gray-400">
              Solving
            </button>
            <Link
              to="/buy"
              className="ml-4 px-4 py-2 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-black px-8 pt-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              WAKS –{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Weighbridge Automation
              </span>{" "}
              KIOSK System
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Self-Service for Truck Drivers – Voice AI, Smart Decisions,
              Fraud-Proof
            </p>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => scrollToSection(infoRef)}
                className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
              >
                Learn More
              </button>
              <Link
                to="/buy"
                className="px-6 py-3 rounded-xl border border-yellow-500 text-yellow-500 font-semibold hover:bg-yellow-500 hover:text-black transition"
              >
                Buy Now
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <img
              src="/product.jpeg"
              alt="WAKS Product"
              className="w-[400px] md:w-[500px] rounded-2xl shadow-2xl hover:scale-105 transform transition duration-500"
            />
          </motion.div>
        </div>
      </section>

<section
  ref={modelRef}
  className="relative h-[90vh] flex justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-black"
>
  {/* Overlay Text */}
  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10 text-center">
    <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-wider drop-shadow-lg">
      Explore the 3D Model
    </h2>
    <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium bg-black/40 px-6 py-2 rounded-full shadow-lg">
      Drag & rotate to interact with the model
    </p>
  </div>

  {/* 3D Scene */}
  <ThreeScene />
</section>




      {/* Info Section */}
      <section
        ref={infoRef}
        className="relative flex flex-col justify-center items-center text-center px-6 py-20 bg-white text-black"
      >
        <motion.h2
          className="text-5xl font-semibold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Why Choose WAKS?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          This is where you explain your product’s features and benefits. Keep
          it short, engaging, and visually appealing.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
          <motion.div
            className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Self-Service Solution</h3>
            <p className="text-gray-700">
              Empowers drivers with a self-service solution, drastically reducing
              manual intervention.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Multilingual Voice AI</h3>
            <p className="text-gray-700">
              Allows drivers to self-generate weigh slips via intuitive input and
              voice commands in local languages.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 sm:col-span-2 sm:w-1/2 sm:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Intelligent Automation</h3>
            <p className="text-gray-700">
              Intelligently auto-detects truck type and uses AI to extract
              supplier information from driver calls.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        ref={aboutRef}
        className="relative flex flex-col justify-center items-center text-center px-6 py-20 bg-black text-white"
      >
        <motion.h2
          className="text-5xl font-semibold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 max-w-4xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          WAKS (Weighbridge Automation Kiosk System) is designed to transform the
          traditional weighbridge process into a fully automated, intelligent, and
          fraud-proof experience. Our mission is to empower truck drivers and
          operators with a self-service kiosk that eliminates manual intervention,
          minimizes errors, and boosts operational efficiency.  
          <br />
          <br />
          With multilingual Voice AI, real-time decision-making, and secure data
          handling, WAKS bridges the gap between innovation and practicality. It is
          not just a product — it’s a step toward smarter, safer, and more reliable
          weighbridge operations for industries worldwide.
        </motion.p>
      </section>

      {/* What Are We Solving Section */}
      <section ref={solvingRef} className="bg-gray-50 py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">What Are We Solving?</h2>
        <div className="flex flex-col gap-20 max-w-6xl mx-auto w-full">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex-shrink-0 w-full md:w-1/3">
                <motion.div
                  className="bg-black text-white rounded-2xl shadow-xl p-8 cursor-pointer"
                  whileHover={{ rotateX: 5, rotateY: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <h3 className="text-2xl font-bold text-center">{problem.title}</h3>
                </motion.div>
              </div>
              <div className="md:w-2/3 text-left">
                <p className="text-gray-700">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} WAKS. All rights reserved.</p>
        <p className="mb-1">Contact Support: support@waks.com</p>
        <p>Email: info@waks.com</p>
      </footer>

      {/* Go to Top Button */}
      {showTopBtn && (
        <button
          onClick={goToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-yellow-500 text-black font-bold shadow-lg hover:bg-yellow-600 transition z-50"
        >
          ↑
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<BuyNow />} />
      </Routes>
    </Router>
  );
}

export default App;
