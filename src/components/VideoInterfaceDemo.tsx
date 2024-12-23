import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../assets/styles/components/VideoInterfaceDemo.css';
import InterfaceDemo from "../assets/videos/platform-demo.webm";

const InterfacePlataformDemo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current, 
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      y: -700,
    });
  }, []);

  return (
    <video
      className="video-plataformDemo"
      src={InterfaceDemo}
      autoPlay
      muted
      loop
      ref={videoRef}
    />
  );
};

export default InterfacePlataformDemo;