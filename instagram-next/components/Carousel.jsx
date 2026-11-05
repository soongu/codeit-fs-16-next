// ~/instagram-next/components/Carousel.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa6';
import styles from './Carousel.module.scss';

const Carousel = ({ imageUrls, alt, isFirst, onImageDoubleClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeart, setShowHeart] = useState(false);

  // 첫 장보다 앞이나 마지막 장보다 뒤로는 가지 않는다.
  const goToSlide = (index) => {
    if (index < 0 || index >= imageUrls.length) return;
    setCurrentIndex(index);
  };

  // 사진을 두 번 누르면 하트가 0.8초 동안 커졌다 사라진다.
  const handleDoubleClick = () => {
    onImageDoubleClick();
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className={styles.carouselSlide}
            onDoubleClick={handleDoubleClick}>
            <Image
              src={imageUrl}
              alt={alt}
              width={600}
              height={600}
              loading={isFirst && index === 0 ? 'eager' : 'lazy'}
            />
            {showHeart && <FaHeart className={styles.doubleClickHeart} />}
          </div>
        ))}
      </div>

      {imageUrls.length > 1 && (
        <>
          <button
            className={`${styles.carouselButton} ${styles.prev}`}
            onClick={() => goToSlide(currentIndex - 1)}
            style={{ display: currentIndex === 0 ? 'none' : 'flex' }}>
            <FaChevronLeft />
          </button>

          <button
            className={`${styles.carouselButton} ${styles.next}`}
            onClick={() => goToSlide(currentIndex + 1)}
            style={{
              display: currentIndex === imageUrls.length - 1 ? 'none' : 'flex',
            }}>
            <FaChevronRight />
          </button>

          <div className={styles.indicators}>
            {imageUrls.map((_, index) => (
              <span
                key={index}
                className={`${styles.indicator} ${currentIndex === index ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};;;

export default Carousel;
