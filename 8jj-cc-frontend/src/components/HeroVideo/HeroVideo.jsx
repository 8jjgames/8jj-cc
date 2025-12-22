import "./HeroVideo.css";

export default function HeroVideo() {
  return (
    <section className="top-video">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/images/casino.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
