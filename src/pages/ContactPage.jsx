import Footer from "../components/homepage/Footer";
import Navbar from "../components/homepage/Navbar";

export default function Contact() {
  return (
    <>
    <Navbar/>
    <div
      className="min-h-screen bg-gradient-to-b from-blue-200 to-indigo-300 py-12 px-4 sm:px-6 md:px-12 font-sans overflow-x-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&family=Roboto&display=swap"
        rel="stylesheet"
      />
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Left Side - Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-900 tracking-tight leading-tight">
              Get in Touch with <span className="text-indigo-600">SwimmingGo</span>
            </h2>
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              Have questions, suggestions, or want to list your pool? Reach out — we're always here to help you make a splash!
            </p>
            <div className="space-y-3 text-gray-700 text-sm md:text-base font-medium">
              <p>
                <strong>📧 Email:</strong>{' '}
                <a
                  href="mailto:support@swimminggo.in"
                  className="underline text-indigo-600 hover:text-indigo-800 transition"
                >
                  support@swimminggo.in
                </a>
              </p>
              <p><strong>📞 Phone:</strong> +91 98765 43210</p>
              <p><strong>📍 Location:</strong> Rajpur Road, Dehradun, India</p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            className="space-y-5 bg-white p-6 md:p-8 rounded-2xl shadow-lg"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-sm font-semibold text-indigo-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-indigo-700 mb-1">Your Email</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-indigo-700 mb-1">Message</label>
              <textarea
                rows="4"
                required
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition resize-none"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-800 hover:shadow-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Embedded Map */}
        <div className="w-full h-64 md:h-72 mt-6 md:mt-8">
          <iframe
            title="SwimmingGo Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.6616319199743!2d78.03219191511776!3d30.316494081780915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929527d36c89d%3A0xc179db0c2f6978b6!2sRajpur%20Road%2C%20Dehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1616586813549!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="rounded-b-3xl border-none shadow-inner"
          ></iframe>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
