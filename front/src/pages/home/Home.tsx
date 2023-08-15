import React, { useRef } from "react";
import styles from "./Home.module.css";
// import { MainLayout } from "./layout/MainLayout";
import { FullPageScroll } from "./FullPageScroll";

function Home() {

	const scrollRef = useRef(null);

	const scrollToNextSection = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		// <MainLayout>
		<FullPageScroll>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro1.gif')" }}
			>
				<button
					className={`${styles.button} ${styles.intro1Btn2}`} // 왼쪽 버튼에 새로운 클래스 추가
					onClick={scrollToNextSection}
				>
					<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>시작하러가기</a>
				</button>
				<button
					className={`${styles.button} ${styles.intro1Btn}`} // 둘러보기 버튼에 새로운 클래스 추가
					onClick={scrollToNextSection}
				>
					둘러보기
				</button>
			</div>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro2.gif')" }}
				ref={scrollRef}
			>
				<button
					className={`${styles.button} ${styles.intro2Btn}`}
				>
					<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>Streaming Now</a>
				</button>
			</div>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro3.gif')" }}
			>
				<button
					className={`${styles.button} ${styles.intro3Btn}`}
				>
					<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>Go Closet Now</a>
				</button>
			</div>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro4.gif')" }}
			>
				<button
					className={`${styles.button} ${styles.intro4Btn}`}
				>
					<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>Go Feed Now</a>
				</button>
			</div>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro5.gif')" }}
			>
				<button
					className={`${styles.button} ${styles.intro5Btn}`}
				>
					<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>Go Ranking Now</a>
				</button>
			</div>
			{/* <div className={`${styles.bg} ${styles.section}`}></div>
			<div className={`${styles.bg} ${styles.section}`}></div>
			<div className={`${styles.bg} ${styles.section}`}></div>
			<div className={`${styles.bg} ${styles.section}`}></div>
			<div className={`${styles.bg} ${styles.section}`}></div> */}
		</FullPageScroll>
		// </MainLayout>
	);
}

export default Home;