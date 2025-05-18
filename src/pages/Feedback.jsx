import React, { useState } from "react";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for rating ${rating} stars! Your comment: ${comment}`);
    setRating(0);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-800 to-red-700 p-8 text-white font-sans flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8">Rate Your Swimming Experience</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-8 max-w-lg w-full"
      >
        <label className="block mb-4 font-semibold text-lg">
          How was your experience?
        </label>
        <div className="flex space-x-2 mb-6 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-4xl ${
                star <= rating ? "text-yellow-400" : "text-gray-400"
              } transition-colors`}
              aria-label={`${star} star`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Leave a comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        ></textarea>

        <button
          type="submit"
          className="mt-6 w-full bg-pink-600 hover:bg-pink-700 rounded-lg py-3 font-semibold transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
