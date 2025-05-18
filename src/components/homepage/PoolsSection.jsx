export default function PoolsSection() {
  return (
    <section id="pools" className="px-6 py-20 bg-white bg-opacity-90">
      <h3 className="text-3xl font-extrabold text-center text-indigo-800 mb-14">
        Top Pools in Dehradun
      </h3>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((pool) => (
          <div
            key={pool}
            className="rounded-xl overflow-hidden shadow-xl bg-white hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src="image2.jpg"
              alt={`Pool ${pool}`}
              className="w-full h-70 object-cover"
            />
           <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
  <h4 className="text-2xl font-extrabold text-indigo-700 italic mb-2">Pool #{pool}</h4>
  
  <div className="text-gray-600 space-y-2 text-base">
    <p className="italic">
      <span className="font-semibold text-gray-700">Location:</span> Rajpur Road
    </p>
  
    <p className="italic">
      <span className="font-semibold text-gray-700">Entry Fee:</span> ₹150
    </p>
    <p className="italic">
      <span className="font-semibold text-gray-700">Timing:</span> 10 AM - 5 PM
    </p>
    <p className="italic">
      <span className="font-semibold text-gray-700">Available Slots:</span> 10
    </p>
  </div>

  <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300">
     
        Book now
   
  </button>
</div>

          </div>
        ))}
      </div>
    </section>
  );
}
