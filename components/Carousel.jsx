// ~/instagram-next/components/Carousel.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Carousel.module.scss";

const Carousel = ({ imageUrls, alt, isFirst }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className={styles.carouselSlide}>
            <Image
              src={imageUrl}
              alt={alt}
              width={600}
              height={600}
              loading={isFirst && index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
