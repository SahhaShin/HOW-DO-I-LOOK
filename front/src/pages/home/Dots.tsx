// import styles from "./Dots.module.scss";

type PDot = {
	index: number;
	currentIndex: number;
	onClick: (index: number) => void;
};
const Dot: React.FC<PDot> = ({ index, currentIndex, onClick }) => {
	const selected = index === currentIndex;
	return (
		<div
			style={{
				width: 15,
				height: 15,
				border: "1px solid" + (selected ? " white" : " rgba(0, 0, 0, 0)"),
				borderRadius: 9999,
				margin: "10px 0",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			onClick={() => onClick(index)}
		>
			<div
				style={{
					position: "relative",
					width: 11,
					height: 11,
					borderRadius: 9999,
					backgroundColor: "white",
					cursor: "pointer",
				}}
			></div>
		</div>
	);
};

type TDots = {
	limit: number;
	currentIndex: number;
	onDotClick: (index: number) => void;
};

export const Dots: React.FC<TDots> = ({ limit, currentIndex, onDotClick }) => {
	return (
		<div style={{ position: "fixed", top: 0, left: 100, height: "100%" }}>
			<div
				style={{
					position: "fixed",
					top: 65,
					left: 100 + 8,
					height: "100%",
					width: 1,
					backgroundColor: "white",
				}}
			></div>
			<div
				style={{
					position: "fixed",
					display: "flex",
					flexDirection: "column",
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{Array(limit)
					.fill("")
					.map((_, index) => (
						<Dot
							index={index}
							currentIndex={currentIndex}
							onClick={onDotClick}
						></Dot>
					))}
			</div>
		</div>
	);
};