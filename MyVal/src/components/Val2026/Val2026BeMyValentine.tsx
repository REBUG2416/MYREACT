import React, { useState, useEffect, useRef } from 'react';
import './Val2026BeMyValentine.css';

// Configuration from provided config.js
const CONFIG = {
    valentineName: "Kebabi",
    pageTitle: "Will You Be My Valentine? 💝",
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🧸', '🐻']
    },
    questions: {
        first: {
            text: "Do you like me?",
            yesBtn: "Yes",
            noBtn: "No",
            secretAnswer: "I don't like you, I love you! ❤️"
        },
        second: {
            text: "How much do you love me?",
            startText: "This much!",
            nextBtn: "Next ❤️"
        },
        third: {
            text: "Will you be my Valentine on February 14th, 2026? 🌹",
            yesBtn: "Yes!",
            noBtn: "No"
        }
    },
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",
        high: "To infinity and beyond! 🚀💝",
        normal: "And beyond! 🥰"
    },
    celebration: {
        title: "Yay! I'm the luckiest guy in the world! 🎉💝💖💝💓",
        message: "Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💝💋❤️💕"
    },
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    },
    colors: {
        backgroundStart: "#1b2735", // Deep Space Blue
        backgroundEnd: "#090a0f",   // Void Black
        buttonBackground: "linear-gradient(135deg, #ff69b4, #e24de2)", // Cosmic Pink/Purple
        buttonHover: "linear-gradient(135deg, #e24de2, #ff69b4)",
        textColor: "#ffffff"
    },
    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    }
};

const Val2026BeMyValentine: React.FC = () => {
    const [step, setStep] = useState<1 | 2 | 3 | 'celebration'>(1);
    const [loveMeterValue, setLoveMeterValue] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const [floatingElements, setFloatingElements] = useState<{ id: string, content: string, style: React.CSSProperties }[]>([]);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Apply Theme and Initialize Elements
    useEffect(() => {
        // Apply Config Theme to CSS Variables
        if (containerRef.current) {
            const el = containerRef.current;
            el.style.setProperty('--val2026-bg-1', CONFIG.colors.backgroundStart);
            el.style.setProperty('--val2026-bg-2', CONFIG.colors.backgroundEnd);
            el.style.setProperty('--val2026-btn-bg', CONFIG.colors.buttonBackground);
            el.style.setProperty('--val2026-btn-hover', CONFIG.colors.buttonHover);
            el.style.setProperty('--val2026-text', CONFIG.colors.textColor);
            el.style.setProperty('--val2026-float-duration', CONFIG.animations.floatDuration);
            el.style.setProperty('--val2026-float-distance', CONFIG.animations.floatDistance);
            el.style.setProperty('--val2026-bounce-speed', CONFIG.animations.bounceSpeed);
            el.style.setProperty('--val2026-heart-explosion-size', CONFIG.animations.heartExplosionSize.toString());
        }

        const initialElements: { id: string, content: string, style: React.CSSProperties }[] = [];

        // Match original script: Create one element for EACH emoji in the config arrays
        // Hearts
        CONFIG.floatingEmojis.hearts.forEach((heart, index) => {
            initialElements.push({
                id: `heart-${index}`,
                content: heart,
                style: {
                    left: `${Math.random() * 100}vw`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${10 + Math.random() * 20}s`
                }
            });
        });

        // Bears
        CONFIG.floatingEmojis.bears.forEach((bear, index) => {
            initialElements.push({
                id: `bear-${index}`,
                content: bear,
                style: {
                    left: `${Math.random() * 100}vw`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${10 + Math.random() * 20}s`
                }
            });
        });

        setFloatingElements(initialElements);

        // Set Title
        document.title = CONFIG.pageTitle;
    }, []);

    // Music Player Setup
    useEffect(() => {
        if (CONFIG.music.enabled && audioRef.current) {
            audioRef.current.volume = CONFIG.music.volume;
            // Attempt autoplay
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch(() => {
                        console.log("Autoplay prevented by browser");
                        setIsPlaying(false);
                    });
            }
        }
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    // Generic Move Button Handler (matches original functionality)
    const moveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        const width = btn.offsetWidth;
        const height = btn.offsetHeight;

        const x = Math.random() * (window.innerWidth - width);
        const y = Math.random() * (window.innerHeight - height);

        btn.style.position = 'fixed';
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    };

    const handleLoveMeterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoveMeterValue(parseInt(e.target.value));
    };

    const getLoveMessage = () => {
        if (loveMeterValue >= 5000) return CONFIG.loveMessages.extreme;
        if (loveMeterValue > 1000) return CONFIG.loveMessages.high;
        if (loveMeterValue > 100) return CONFIG.loveMessages.normal;
        return null;
    };

    const celebrate = () => {
        setStep('celebration');
        // Trigger heart explosion
        const newHearts: { id: string, content: string, style: React.CSSProperties }[] = [];
        for (let i = 0; i < 50; i++) {
            const content = CONFIG.floatingEmojis.hearts[Math.floor(Math.random() * CONFIG.floatingEmojis.hearts.length)];
            newHearts.push({
                id: `explosion-${Date.now()}-${i}`,
                content,
                style: {
                    left: `${Math.random() * 100}vw`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                    bottom: '0'
                }
            });
        }
        setFloatingElements(prev => [...prev, ...newHearts]);
    };

    const extraLoveMessage = getLoveMessage();
    const isSuperLove = loveMeterValue >= 5000;

    // Calculate slider width extension for visuals
    const sliderStyle = loveMeterValue > 100 ? {
        width: `calc(100% + ${(loveMeterValue - 100) / 9900 * 80}vw)`
    } : {};

    return (
        <div className="val2026-proposal-container" ref={containerRef}>
            {/* Audio Element */}
            <audio ref={audioRef} src={CONFIG.music.musicUrl} loop />

            {/* Music Controls */}
            {CONFIG.music.enabled && (
                <div className="val2026-music-controls">
                    <button className="val2026-music-btn" onClick={toggleMusic}>
                        {isPlaying ? CONFIG.music.stopText : CONFIG.music.startText}
                    </button>
                </div>
            )}

            {/* Floating Background */}
            <div className="val2026-floating-elements">
                {floatingElements.map((el) => (
                    <div key={el.id} className="val2026-floater" style={el.style}>
                        {el.content}
                    </div>
                ))}
            </div>

            <div className="val2026-proposal-card">
                <h1 className="val2026-proposal-title">{CONFIG.valentineName}, my love...</h1>

                {/* Question 1: Do you like me? */}
                {step === 1 && (
                    <div className="val2026-question-section">
                        <h2 className="val2026-question-title">{CONFIG.questions.first.text}</h2>
                        {/* Both Yes and No run away! */}
                        <button className="val2026-cute-btn" onClick={moveButton}>
                            {CONFIG.questions.first.yesBtn}
                        </button>
                        <button className="val2026-cute-btn" onClick={moveButton}>
                            {CONFIG.questions.first.noBtn}
                        </button>

                        {/* Only Secret Answer proceeds */}
                        <div className="val2026-secret-answer">
                            <button className="val2026-cute-btn" onClick={() => setStep(2)}>
                                {CONFIG.questions.first.secretAnswer}
                            </button>
                        </div>
                    </div>
                )}

                {/* Question 2: Love Meter */}
                {step === 2 && (
                    <div className="val2026-question-section">
                        <h2 className="val2026-question-title">{CONFIG.questions.second.text}</h2>
                        <div className="val2026-love-meter">
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                value={loveMeterValue}
                                className="val2026-slider"
                                onChange={handleLoveMeterChange}
                                style={sliderStyle}
                            />
                            <p>
                                <span>{CONFIG.questions.second.startText} ({loveMeterValue}%)</span>
                                {extraLoveMessage && (
                                    <span className={`val2026-extra-love ${isSuperLove ? 'super-love' : ''}`}>
                                        {extraLoveMessage}
                                    </span>
                                )}
                            </p>
                        </div>
                        <button className="val2026-cute-btn" onClick={() => setStep(3)}>
                            {CONFIG.questions.second.nextBtn}
                        </button>
                    </div>
                )}

                {/* Question 3: Final */}
                {step === 3 && (
                    <div className="val2026-question-section">
                        <h2 className="val2026-question-title">{CONFIG.questions.third.text}</h2>
                        <button className="val2026-cute-btn" onClick={celebrate}>
                            {CONFIG.questions.third.yesBtn}
                        </button>
                        <button className="val2026-cute-btn" onClick={moveButton}>
                            {CONFIG.questions.third.noBtn}
                        </button>
                    </div>
                )}

                {/* Celebration */}
                {step === 'celebration' && (
                    <div className="val2026-celebration">
                        <h2 className="val2026-question-title">{CONFIG.celebration.title}</h2>
                        <p className="val2026-celebration-text">{CONFIG.celebration.message}</p>
                        <p className="val2026-celebration-text">{CONFIG.celebration.emojis}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Val2026BeMyValentine;
