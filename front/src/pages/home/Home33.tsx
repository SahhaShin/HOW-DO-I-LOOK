import React, { useRef, useEffect, useState} from "react";
import styled from 'styled-components';
import Search from './pocha.jpg';

const StyledAboutContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    background-color: #000;
    justify-content: space-between;
    align-items: center;
    opacity: 0;
    background-color: #070101;
    &.animation {
        animation-name: opacity;
        animation-duration: 5000ms;
        animation-fill-mode: forwards;

        @Keyframes opacity {
            from {
                opacity: 0;
                transform: translateX(-100%);
            }
            to {
                opacity: 1;
                transfrom: translateX(0%);
            }
        }
    }
`;

const AboutTitle = styled.h2`
    front-size: 1.5rem;
    margin-right: 10px;
    @media ${(props) => props.theme.mobile} {
        font-size: 1.2rem;
    }
    margin-left: 15px;
`;

const StyledAboutImage = styled.img`
    display: flex;
    flex-wrap: wrap;
    @media ${(props) => props.theme.desktop} {
        width: 700px;
    }
    @media ${(props) => props.theme.laptop} {
        width: 600px;
    }
    @media ${(props) => props.theme.tablet} {
        width: 550px;
    }
    @media ${(props) => props.theme.mobile} {
        width: 300px;
    }
    object-fit: contain;
`;

const Home: React.FC = () => {
    const element = useRef<HTMLDivElement | null>(null);
    const [InviewPort, setInviewPort] = useState<boolean>(false);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setInviewPort(true);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5,
        });

        if (element.current) {
            observer.observe(element.current);
        }
    }, []);

    return (
        <div>
            <StyledAboutContainer
                ref={element}
                className={InviewPort ? 'animation' : ''}
            >
                <StyledAboutImage src={Search} alt="메인 이미지" />
                <div>
                    <AboutTitle>
                        아름다움은 진정한 나 자신이 되기로 결심할 때 시작된다.
                    </AboutTitle>
                    <AboutTitle>How do I look에서 시작하세요.</AboutTitle>
                </div>
            </StyledAboutContainer>
        </div>
    );
}

export default Home;