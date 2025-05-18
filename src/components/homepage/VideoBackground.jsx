export default function VideoBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] z-0 overflow-hidden">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/12305943_3840_2160_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
  );
}
