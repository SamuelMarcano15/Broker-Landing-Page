import React from 'react';
import '../assets/styles/components/VideoPlayer.css';
import HeroBg from "../assets/videos/hero-bg.mp4"

const VideoPlayer = () => {
    return (
      <video
        className="video-player"
        src={HeroBg}
        autoPlay
        playsInline
        muted
        loop
      />
    );
  };
  
  export default VideoPlayer;