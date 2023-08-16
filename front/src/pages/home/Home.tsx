import React, { useEffect, useRef } from "react";
import styles from "./Home.module.css";
// import { MainLayout } from "./layout/MainLayout";
import { FullPageScroll } from "./FullPageScroll";
import { useNavigate } from 'react-router-dom';
import { getCookie } from "../../hook/Cookie";
import { useDispatch } from "react-redux";
import { action_user } from "../../store/UserSlice";

function Home() {

	const scrollRef = useRef(null);

	const scrollToNextSection = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const scrollToTopSection = () => {
		if (scrollRef.current) {
			window.scrollTo({ top: 0, behavior: 'smooth' }); // 맨 위로 스크롤
		}
	};

	const dispatch = useDispatch();

	useEffect(() => {
		console.log("페이지 로드");

		//회원정보 가져오기
		const sEmail = getCookie("new_social_user_email");
		const bEmail = getCookie("new_basic_user_email");
		if (!((typeof sEmail == "undefined") || (typeof sEmail === null))) {
			console.log("sEmail");
			dispatch(action_user.GetUserInfo(sEmail));
		} else if (!((typeof bEmail == "undefined") || (typeof bEmail === null))) {
			console.log("bEmail");
			dispatch(action_user.GetUserInfo(bEmail));
		} else {
			//window.location.href = `${process.env.REACT_APP_FRONT}/user/log-in`;
		}
	}, []);

	const navigate = useNavigate();

	const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));

	return (
		// <MainLayout>
		<FullPageScroll>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro1.gif')" }}
			>
				{loginUser == null ? (
					<button
						className={`${styles.button} ${styles.intro1Btn2}`}
					>
						<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>시작하러가기</a>
					</button>
				) : (
					<button
						className={`${styles.button} ${styles.intro1Btn2}`}
						onClick={() => { navigate(`/mypage/${loginUser.id}`) }}
					>
						마이페이지
					</button>
				)}
				<button
					className={`${styles.button} ${styles.intro1Btn}`}
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
				{loginUser == null ? (
					<button
						className={`${styles.button} ${styles.intro2Btn}`}
					>
						<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>Streaming Now</a>
					</button>
				) : (
					<button
						className={`${styles.button} ${styles.intro2Btn}`}
						onClick={() => { navigate(`/livelist`) }}
					>
						Streaming Now
					</button>
				)}
			</div>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro3.gif')" }}
			>
				{loginUser == null ? (
					<button
						className={`${styles.button} ${styles.intro3Btn}`}
					>
						<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>Go Closet Now</a>
					</button>
				) : (
					<button
						className={`${styles.button} ${styles.intro3Btn}`}
						onClick={() => { navigate(`/closet`) }}
					>
						Go Closet Now
					</button>
				)}
			</div>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro4.gif')" }}
			>
				{loginUser == null ? (
					<button
						className={`${styles.button} ${styles.intro4Btn}`}
					>
						<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>Go Feed Now</a>
					</button>
				) : (
					<button
						className={`${styles.button} ${styles.intro4Btn}`}
						onClick={() => { navigate(`/feed`) }}
					>
						Go Feed Now
					</button>
				)}
			</div>
			<div
				className={`${styles.bg} ${styles.section}`}
				style={{ backgroundImage: "url('/img/intro/mainIntro5.gif')" }}
			>
				{loginUser == null ? (
					<button
						className={`${styles.button} ${styles.intro5Btn}`}
					>
						<a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={styles.buttonLink}>Go Ranking Now</a>
					</button>
				) : (
					<button
						className={`${styles.button} ${styles.intro5Btn}`}
						onClick={() => { navigate(`/Ranking`) }}
					>
						Go Ranking Now
					</button>
				)}
				<button
					className={`${styles.button} ${styles.intro5Btn2}`}
					onClick={scrollToTopSection}
				>
					위로 가기
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