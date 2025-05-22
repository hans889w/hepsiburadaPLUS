import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingPage = () => {
  const hRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    tl.fromTo(
      hRef.current,
      { x: '-100%', opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        bRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        '<'
      )
      .fromTo(
        plusRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 1 },
        '<'
      )
      .to(
        plusRef.current,
        {
          rotate: 360,
          duration: 1.5,
          repeat: 1,
          ease: 'linear',
        },
        '-=1'
      )
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
    >
      <div className="flex items-center text-[4rem] font-bold space-x-4">
        <div ref={hRef} className="text-orange-500">
          H
        </div>
        <div ref={plusRef} className="text-gray-800 origin-center">
          +
        </div>
        <div ref={bRef} className="text-orange-500">
          B
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
