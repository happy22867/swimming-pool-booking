export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-white py-14 px-4 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">
          💡 Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 italic mb-10">
          Dive into comfort, convenience, and confidence 💦
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2 text-indigo-600">Instant Booking</h3>
            <p className="text-gray-600">Book your pool in just a few taps. No waiting, no hassle!</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-2 text-indigo-600">Verified Pools</h3>
            <p className="text-gray-600">Every listing is vetted for safety and hygiene — your comfort, guaranteed!</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-xl font-bold mb-2 text-indigo-600">Affordable Fun</h3>
            <p className="text-gray-600">Experience premium pools without draining your wallet. Dive smart!</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2 text-indigo-600">Local Gems</h3>
            <p className="text-gray-600">Find hidden pool spots near you — curated just for your city!</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2 text-indigo-600">Secure Payments</h3>
            <p className="text-gray-600">Encrypted transactions that keep your data and money safe.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-bold mb-2 text-indigo-600">24/7 Support</h3>
            <p className="text-gray-600">Got questions or issues? We’re just a call or message away!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
