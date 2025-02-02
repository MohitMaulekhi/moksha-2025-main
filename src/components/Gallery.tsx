'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
});

const Gallery = () => {
  const artistArray = [
    '/assets/gallery/images/artist1.png',
    '/assets/gallery/images/artist2.png',
    '/assets/gallery/images/artist3.png',
    '/assets/gallery/images/artist4.png',
    '/assets/gallery/images/artist5.png',
    '/assets/gallery/images/artist6.png',
    '/assets/gallery/images/artist7.png',
    '/assets/gallery/images/artist8.png',
    '/assets/gallery/images/artist9.png',
    '/assets/gallery/images/artist10.png',
    '/assets/gallery/images/artist11.png',
  ];

  const [currentArtist, setCurrentArtist] = useState(0);

  const crystalBackgroundRef = useRef(null);
  const leftDoor = useRef(null);
  const rightDoor = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArtist((prev) => (prev < artistArray.length - 1 ? prev + 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLDivElement; // Type assertion here
          if (entry.isIntersecting) {
            target.style.animationPlayState = 'running';
          } else {
            target.style.animationPlayState = 'paused';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (crystalBackgroundRef.current) {
      observer.observe(crystalBackgroundRef.current);
    }
    if (leftDoor.current) {
      observer.observe(leftDoor.current);
    }
    if (rightDoor.current) {
      observer.observe(rightDoor.current);
    }

    return () => {
      if (crystalBackgroundRef.current) {
        observer.unobserve(crystalBackgroundRef.current);
      }
      if (leftDoor.current) {
        observer.unobserve(leftDoor.current);
      }
      if (rightDoor.current) {
        observer.unobserve(rightDoor.current);
      }
    };
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = (urls:string[]) => {
      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadImages(artistArray);
  }, [artistArray]);

  const handlePrev = () => {
    setCurrentArtist((prev) => (prev > 0 ? prev - 1 : artistArray.length - 1));
  };

  const handleNext = () => {
    setCurrentArtist((prev) => (prev < artistArray.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      ref={crystalBackgroundRef}
      className="crystal-background flex flex-col items-center justify-center gap-0 relative"
    >
      <div
        className={`text-center pt-24 absolute top-0 left-1/2 transform -translate-x-1/2 text-white text-4xl font-semibold md:text-6xl ${cinzel.className}`}
      >
        Gallery
      </div>
      <div
        className={`h-[20rem] w-[24rem] md:h-[25rem] md:w-[30rem] bg-blend-color-burn bg-no-repeat relative z-30`}
        style={{
          backgroundImage: `url(${artistArray[currentArtist]}), url(/assets/gallery/portal.png)`,
          backgroundSize: '52% 72%, cover',
          backgroundPosition: '50% 55%, center',
        }}
      >
        <div className="scale-105 h-full">
          <div
            className="absolute bg-[url(/assets/gallery/leftDoor.png)] bg-no-repeat h-[14.5rem] w-[6.9rem] md:h-[18rem] md:w-[8.45rem] z-50 top-[15.3%] md:left-[24.2%] left-[24.2%] bg-contain"
            id="leftDoor"
            ref={leftDoor}
          />
          <div
            className="absolute bg-[url(/assets/gallery/rightDoor.png)] bg-no-repeat h-[14.5rem] w-[6.75rem] md:h-[18rem] md:w-[8.45rem] z-50 top-[15.3%] md:right-[22.25%] right-[22.25%] bg-contain"
            id="rightDoor"
            ref={rightDoor}
          />
        </div>
      </div>
      <div className="flex space-x-4 justify-between w-[24rem] md:w-[30rem] px-7">
        <button
          onClick={handlePrev}
          className="bg-cover bg-[url(/assets/gallery/left-arrow.png)] w-[8.5rem] h-[5.5rem]"
        />
        <button
          onClick={handleNext}
          className="bg-cover bg-[url(/assets/gallery/right-arrow.png)] w-[8.5rem] h-[5.5rem]"
        />
      </div>
    </div>
  );
};

export default Gallery;
