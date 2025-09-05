import { useNavigate } from "react-router-dom";

function BuyNow() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          {/* Logo / WAKS */}
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            WAKS
          </h1>

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
          >
            Home
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center items-center px-6 py-28 gap-12">
        {/* Left: Product Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/product.jpeg" // replace with your product image path
            alt="WAKS Kiosk System"
            className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 flex flex-col items-start text-left space-y-6">
          <h1 className="text-5xl font-bold">WAKS Kiosk System</h1>
          <p className="text-lg text-gray-300">
            Experience the future of weighbridge automation with WAKS.  
            Secure, multilingual, and fraud-proof.
          </p>

          <div className="text-3xl font-bold text-yellow-400">₹xxxxxx</div>
          <p className="text-sm text-gray-400">*Price per unit (taxes extra)</p>

          {/* Units Input */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">Units:</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-24 px-3 py-2 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-600 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;
