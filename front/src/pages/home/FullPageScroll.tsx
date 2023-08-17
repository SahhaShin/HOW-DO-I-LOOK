import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Dots } from "./Dots";

type PFullPageScroll = {
    onPageChange?: (page: number) => void;
    onLoad?: (limit: number) => void;
} & PropsWithChildren;

export const FullPageScroll: React.FC<PFullPageScroll> = ({
    children,
    onLoad = () => { },
    onPageChange = () => { },
}) => {
    const outerDivRef = useRef<HTMLDivElement>(null);
    const currentPage = useRef<number>(0);
    const canScroll = useRef<boolean>(true);
    const oldTouchY = useRef<number>(0);
    const [_, refresh] = useState<number>(0);

    const scrollDown = () => {
        const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight; // 화면 세로 길이 100vh
        if (outerDivRef.current && pageHeight) {
            outerDivRef.current.scrollTo({
                top: pageHeight * (currentPage.current + 1),
                left: 0,
                behavior: "smooth",
            });
            canScroll.current = false;
            setTimeout(() => {
                canScroll.current = true;
            }, 500);
            if (outerDivRef.current.childElementCount - 1 > currentPage.current)
                currentPage.current++;
        }
   
        onPageChange(currentPage.current);
        refresh((v) => v + 1);
    };

    const scrollUp = () => {
        const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight; // 화면 세로 길이 100vh
        if (outerDivRef.current && pageHeight) {
            outerDivRef.current.scrollTo({
                top: pageHeight * (currentPage.current - 1),
                left: 0,
                behavior: "smooth",
            });
            canScroll.current = false;
            setTimeout(() => {
                canScroll.current = true;
            }, 500);
            if (currentPage.current > 0) currentPage.current--;
        }

        onPageChange(currentPage.current);
        refresh((v) => v + 1);
    };

    const wheelHandler = (e: WheelEvent) => {
        e.preventDefault();
        if (!canScroll.current) return;
        const { deltaY } = e; // +is down -is up

        if (deltaY > 0 && outerDivRef.current) {
            scrollDown();
        } else if (deltaY < 0 && outerDivRef.current) {
            scrollUp();
        }
    }; // wheel Handler

    const scrollHandler = (e: Event) => {
        e.preventDefault();
    };

    const onTouchDown = (e: TouchEvent) => {
        oldTouchY.current = e.changedTouches.item(0)?.clientY || 0;
    };

    const onTouchUp = (e: TouchEvent) => {
        const currentTouchY = e.changedTouches.item(0)?.clientY || 0;
        const isScrollDown: boolean =
            oldTouchY.current - currentTouchY > 0 ? true : false;

        if (isScrollDown) {
            scrollDown();
        } else {
            scrollUp();
        }
    };

    const movePageTo = (index: number) => {
        const num = currentPage.current;
        if (index > num) for (let i = 0; i < index - num; i++) scrollDown();
        else if (index < num) for (let i = 0; i < num - index; i++) scrollUp();
    };

    useEffect(() => {
        const outer = outerDivRef.current;
        if (!outer) return;
        onLoad(outerDivRef.current.childElementCount);
        refresh((v) => v + 1);
        outer.addEventListener("wheel", wheelHandler);
        outer.addEventListener("scroll", scrollHandler);
        outer.addEventListener("touchmove", scrollHandler);
        outer.addEventListener("touchstart", onTouchDown);
        outer.addEventListener("touchend", onTouchUp);
        return () => {
            outer.removeEventListener("wheel", wheelHandler);
            outer.removeEventListener("scroll", scrollHandler);
            outer.removeEventListener("touchmove", scrollHandler);
            outer.removeEventListener("touchstart", onTouchDown);
            outer.removeEventListener("touchend", onTouchUp);
        };
    }, []);


    return (
        <>
            <div
                ref={outerDivRef}
                style={{ height: "100vh", width: "100%", overflowY: "hidden" }}
            >
                {children}
            </div>
            <Dots
                limit={outerDivRef.current?.childElementCount || 0}
                currentIndex={currentPage.current}
                onDotClick={(index: number) => {
                    movePageTo(index);
                    onPageChange(index);
                }}
            />
        </>
    );
};