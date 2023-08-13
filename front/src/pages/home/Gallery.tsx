import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.css";

const Gallery: React.FC = () => {
  const images = [
    "/img/intro/mainIntro11.gif",
    "/img/intro/mainIntro2.gif",
    "/img/intro/mainIntro1.gif",
    // ... (더 많은 이미지 경로 추가)
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= fullHeight - 300) {
      // 스크롤이 아래로 가면 다음 이미지를 보여줍니다.
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.imageContainer} ${
            index === currentIndex ? styles.active : ""
          }`}
        >
          <img src={image} alt={`Image ${index}`} className={styles.image} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
