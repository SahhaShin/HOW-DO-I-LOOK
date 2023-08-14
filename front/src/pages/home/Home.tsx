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
				<a
					href={process.env.REACT_APP_FRONT + `/user/log-in`}
					className={styles.button}
				>
					시작하러가기
				</a>
				<button className={styles.button} onClick={scrollToNextSection}>
					둘러보기
				</button>
			</div>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro2.gif')" }}
				ref={scrollRef}
			>
				<button className={styles.button}>Click me</button>
			</div>
			<div className={`${styles.bg} ${styles.section}`} style={{ backgroundImage: "url('/img/intro/mainIntro2.gif')" }}>
				<button className={styles.button}>Click me</button>
			</div>
			<div className={`${styles.bg} ${styles.section}`} style={{ backgroundImage: "url('/img/intro/mainIntro2.gif ')" }}>
				<button className={styles.button}>Click me</button>
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