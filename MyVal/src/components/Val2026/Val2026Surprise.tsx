
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Val2026Surprise.css';
// @ts-ignore
import timelineData from './Timeline.json';
import Val2026ComingSoon from './Val2026ComingSoon';
// @ts-ignore
import bgMusic from './assets/Pink-Sweats-At-My-Worst-(TrendyBeatz.com).mp3';

// Types
type UnlockRule = 'visit_all' | 'quiz';

interface TimelineItem {
    id: string;
    title: string;
    shortText: string;
    image: string;
    secretMessage?: string;
    unlockRule: UnlockRule | string;
    quizQuestion?: string;
    quizOptions?: string[];
    quizAnswer?: number;
}

type Screen = 'cover' | 'timeline' | 'moment' | 'final';

export default function Val2026Surprise() {
    const navigate = useNavigate();
    // State
    const [isLocked, setIsLocked] = useState(true);
    const [currentScreen, setCurrentScreen] = useState<Screen>('cover');
    const [completedItems, setCompletedItems] = useState<string[]>([]);
    const [quizSolved, setQuizSolved] = useState<string[]>([]);
    const [secretsUnlocked, setSecretsUnlocked] = useState<string[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Detailed Moment State
    const [currentMomentIndex, setCurrentMomentIndex] = useState<number>(0);
    const [tapCount, setTapCount] = useState<number>(0);
    const [lastTapTime, setLastTapTime] = useState<number>(0);
    const [isHolding, setIsHolding] = useState<boolean>(false);

    // Popup State
    const [activePopup, setActivePopup] = useState<'none' | 'quiz' | 'secret' | 'tapSecret'>('none');
    const [popupMessage, setPopupMessage] = useState<string>('');
    const [quizFeedback, setQuizFeedback] = useState<{ text: string, color: string } | null>(null);
    const [clickedQuizOption, setClickedQuizOption] = useState<number | null>(null);

    // Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const typewriterRef = useRef<HTMLDivElement>(null);

    // --- Effects ---

    // Date Check
    useEffect(() => {
        const targetDate = new Date('2026-02-14T00:00:00').getTime();
        const now = new Date().getTime();
        if (now <= targetDate) {
            setIsLocked(false);
        }
    }, []);



    // Starfield Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: { x: number, y: number, size: number, speed: number, alpha: number, twinkle: number }[] = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1,
                alpha: Math.random(),
                twinkle: Math.random() * 0.05
            });
        }

        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "white";

            stars.forEach(star => {
                ctx.globalAlpha = star.alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }

                star.alpha += star.twinkle;
                if (star.alpha > 1 || star.alpha < 0.2) star.twinkle *= -1;
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Load State
    useEffect(() => {
        const saved = localStorage.getItem('cosmicState_react');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const loadedCompleted = parsed.completed || [];
                setCompletedItems(loadedCompleted);
                setQuizSolved(parsed.quizSolved || []);
                setSecretsUnlocked(parsed.secretsUnlocked || []);

                // Restore Screen Location
                if (loadedCompleted.length >= timelineData.length) {
                    setCurrentScreen('final');
                } else if (loadedCompleted.length > 0) {
                    setCurrentScreen('timeline');
                }
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }
    }, []);

    // Save State
    useEffect(() => {
        const stateToSave = { completed: completedItems, quizSolved, secretsUnlocked };
        localStorage.setItem('cosmicState_react', JSON.stringify(stateToSave));
    }, [completedItems, quizSolved, secretsUnlocked]);

    // Typewriter
    useEffect(() => {
        let timeoutId: number;

        if (currentScreen === 'cover' && typewriterRef.current) {
            const text = "A journey through time and stardust...";
            let i = 0;
            typewriterRef.current.textContent = "";

            const typeTick = () => {
                if (i < text.length && typewriterRef.current) {
                    typewriterRef.current.textContent += text.charAt(i);
                    i++;
                    timeoutId = window.setTimeout(typeTick, 100);
                }
            };
            timeoutId = window.setTimeout(typeTick, 1000);
        }

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, [currentScreen, isLocked]);

    // Attempt auto-play on mount, with fallback listeners if blocked
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;

            const playAudio = async () => {
                if (audioRef.current && audioRef.current.paused) {
                    try {
                        await audioRef.current.play();
                        setIsPlaying(true);
                        // Remove listeners once playing succeeds
                        document.removeEventListener('click', playAudio);
                        document.removeEventListener('keydown', playAudio);
                        document.removeEventListener('scroll', playAudio);
                        document.removeEventListener('touchstart', playAudio);
                    } catch (err) {
                        console.log("Autoplay prevented, waiting for interaction:", err);
                        setIsPlaying(false);
                        // Add listeners to try again on interaction
                        document.addEventListener('click', playAudio, { once: true });
                        document.addEventListener('keydown', playAudio, { once: true });
                        document.addEventListener('scroll', playAudio, { once: true });
                        document.addEventListener('touchstart', playAudio, { once: true });
                    }
                }
            };

            playAudio();

            return () => {
                document.removeEventListener('click', playAudio);
                document.removeEventListener('keydown', playAudio);
                document.removeEventListener('scroll', playAudio);
                document.removeEventListener('touchstart', playAudio);
            };
        }
    }, []);

    // --- Handlers ---
    const longPressTimer = useRef<number | null>(null);

    const handleStart = () => {
        setCurrentScreen('timeline');
    };

    const handleBackToTimeline = () => {
        setCurrentScreen('timeline');
    };

    const handleUnlockCheck = (item: TimelineItem, index: number) => {
        // Unlock logic: previous item must be completed (or currently index 0)
        const isUnlocked = index === 0 || completedItems.includes(timelineData[index - 1].id);

        if (!isUnlocked) return;

        if (item.unlockRule === 'quiz' && !quizSolved.includes(item.id)) {
            setCurrentMomentIndex(index);
            setActivePopup('quiz');
            setQuizFeedback(null);
            setClickedQuizOption(null);
        } else {
            openMoment(index);
        }
    };

    const openMoment = (index: number) => {
        setCurrentMomentIndex(index);
        setCurrentScreen('moment');
    };

    const handlePressStart = () => {
        const item = timelineData[currentMomentIndex];
        if (item.unlockRule === 'hold_7' && !completedItems.includes(item.id)) {
            setIsHolding(true);
            longPressTimer.current = window.setTimeout(() => {
                // Success!
                setIsHolding(false); // Stop animation
                if (navigator.vibrate) navigator.vibrate(200);
                setSecretsUnlocked(prev => [...prev, `hold_${item.id}`]);
                setPopupMessage("✨ The universe trembled... and accepted your love.");
                setActivePopup('tapSecret');

                // Mark as completed
                setCompletedItems(prev => {
                    if (!prev.includes(item.id)) return [...prev, item.id];
                    return prev;
                });
            }, 7000); // 7 seconds
        }
    };

    const handlePressEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
        setIsHolding(false);
    };

    const handleQuizOption = (optionIdx: number) => {
        const item = timelineData[currentMomentIndex];
        const isCorrect = optionIdx === item.quizAnswer;

        setClickedQuizOption(optionIdx);

        if (isCorrect) {
            setQuizFeedback({ text: "Correct! The stars align...", color: "#0f0" });
            setTimeout(() => {
                setQuizSolved(prev => [...prev, item.id]);

                // Mark as completed immediately for quiz
                if (item.unlockRule === 'quiz') {
                    setCompletedItems(prev => {
                        if (!prev.includes(item.id)) return [...prev, item.id];
                        return prev;
                    });
                }

                setActivePopup('none');
                setPopupMessage("✨ Logic intersects with Love.");
                setActivePopup('tapSecret'); // Show success message
            }, 1500);
        } else {
            setQuizFeedback({ text: "Try again, my love!", color: "#f00" });
        }
    };

    const handleNextMoment = () => {
        // Just navigation now, no free unlocking

        // If we finished everything
        if (completedItems.length >= timelineData.length) {
            if (!secretsUnlocked.includes('visit_all')) {
                setSecretsUnlocked(prev => [...prev, 'visit_all']);
                setPopupMessage("You have collected all the stars. The timeline is yours.");
                setActivePopup('tapSecret');
                localStorage.setItem('val2026_timeline_unlocked', 'true');
            } else {
                localStorage.setItem('val2026_timeline_unlocked', 'true');
                setCurrentScreen('timeline');
            }
            return;
        }

        // Check if we should go to next moment or back to timeline
        // Since we want to force interaction on each, going back to timeline is safer
        // unless next item is already completed?
        // Let's just go back to timeline to show the star collected.
        setCurrentScreen('timeline');
    };

    const handleImageTap = () => {
        const item = timelineData[currentMomentIndex];
        const now = Date.now();

        let newCount = tapCount;
        if (now - lastTapTime < 2000) {
            newCount += 1;
        } else {
            newCount = 1;
        }

        setTapCount(newCount);
        setLastTapTime(now);

        // Triple Tap Logic
        // Triple Tap Logic
        if (newCount === 3) {
            if (item.unlockRule === 'tap_3' && !completedItems.includes(item.id)) {
                // Unlock!
                setSecretsUnlocked(prev => [...prev, `tap_${item.id}`]);
                setTapCount(0);
                setPopupMessage("✨ Three knocks on the door of destiny...");
                setActivePopup('tapSecret');

                // Mark as completed
                setCompletedItems(prev => {
                    if (!prev.includes(item.id)) return [...prev, item.id];
                    return prev;
                });
            }
        }
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play().then(() => setIsPlaying(true));
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    // --- Render Helpers ---

    // --- Render Helpers ---

    if (isLocked) {
        return <Val2026ComingSoon />;
    }

    const currentItem = timelineData[currentMomentIndex];

    return (
        <div id="val2026-surprise-root">
            <canvas ref={canvasRef} className="val2026-sky-canvas"></canvas>
            <div className="val2026-vignette"></div>

            {/* Music Widget */}
            <div className="val2026-music-widget">
                <div className={`val2026-music-visualizer${!isPlaying ? ' val2026-paused' : ''}`}>
                    <div className="val2026-bar"></div>
                    <div className="val2026-bar"></div>
                    <div className="val2026-bar"></div>
                    <div className="val2026-bar"></div>
                </div>
                <button id="musicToggle" onClick={toggleMusic} aria-label="Toggle Music">
                    {!isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    )}
                </button>
                <audio ref={audioRef} src={bgMusic} loop autoPlay preload="auto" />
            </div>

            <div className="val2026-surprise-content">

                {currentScreen === 'cover' && (
                    <section className="val2026-screen val2026-active">
                        <div className="val2026-cover-content">
                            <h1 className="val2026-cover-title val2026-neon-text">Our<br />Timeline</h1>
                            <div ref={typewriterRef} className="val2026-typewriter-text"></div>
                            <button className="val2026-btn-cosmic" onClick={handleStart}>Enter the Galaxy</button>
                        </div>
                    </section>
                )}

                {currentScreen === 'timeline' && (
                    <section className="val2026-screen val2026-active">
                        <h2 className="val2026-section-title">Constellation of Us</h2>
                        <div className="val2026-constellation-grid">
                            {timelineData.map((item: any, index: number) => {
                                // Unlock logic: previous item must be completed (or currently index 0)
                                const isUnlocked = index === 0 || completedItems.includes(timelineData[index - 1].id);
                                const isCompleted = completedItems.includes(item.id);

                                return (
                                    <div
                                        key={item.id}
                                        className={`val2026-card ${isUnlocked ? 'val2026-unlocked' : ''}`}
                                        onClick={() => handleUnlockCheck(item, index)}
                                    >
                                        {isUnlocked ? (
                                            <>
                                                {item.title}
                                                <span style={{
                                                    display: 'block',
                                                    fontSize: '1.5rem',
                                                    marginTop: '10px',
                                                    opacity: isCompleted ? 1 : 0.3,
                                                    filter: isCompleted ? 'none' : 'grayscale(100%)'
                                                }}>
                                                    ⭐
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                LOCKED<br />
                                                <span style={{ fontSize: '0.8em', opacity: 0.7 }}>Complete previous star</span>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="val2026-progress-container val2026-glass-panel">
                            <span className="val2026-progress-label">Orbit Progress</span>
                            <div className="val2026-progress-bar">
                                <div
                                    className="val2026-progress-fill"
                                    style={{ width: `${Math.round((completedItems.length / timelineData.length) * 100)}%` }}
                                ></div>
                            </div>
                            <span className="val2026-progress-percent">
                                {Math.round((completedItems.length / timelineData.length) * 100)}%
                            </span>
                        </div>

                        {completedItems.length >= timelineData.length && (
                            <button
                                className="val2026-btn-cosmic val2026-small"
                                style={{ marginTop: '20px', background: 'rgba(255,255,255,0.1)', border: '1px solid white' }}
                                onClick={() => navigate('/val2026/2026-timeline')}
                            >
                                Return to Cosmic Timeline 🚀
                            </button>
                        )}
                    </section>
                )}

                {currentScreen === 'moment' && currentItem && (
                    <section className="val2026-screen val2026-active">
                        <button className="val2026-btn-back" onClick={handleBackToTimeline}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Return to Orbit
                        </button>

                        <div className="val2026-moment-content val2026-glass-card">
                            <h2 className="val2026-moment-title val2026-neon-text-sm">{currentItem.title}</h2>
                            <div
                                className="val2026-moment-image-container"
                                onClick={handleImageTap}
                                onMouseDown={handlePressStart}
                                onMouseUp={handlePressEnd}
                                onMouseLeave={handlePressEnd}
                                onTouchStart={handlePressStart}
                                onTouchEnd={handlePressEnd}
                            >
                                <div className={`val2026-moment-image ${isHolding ? 'val2026-holding' : ''}`}>
                                    <img src={`/${currentItem.image}`} alt={currentItem.title} draggable="false" />
                                </div>
                                <div className="val2026-tap-hint">
                                    {currentItem.unlockRule === 'tap_3' && "Tap 3 times fast to collect the star ✨"}
                                    {currentItem.unlockRule === 'hold_7' && "Hold for 7 seconds to feel the gravity 🌌"}
                                    {currentItem.unlockRule === 'quiz' && "Answer the question to align the stars ❓"}
                                </div>
                            </div>
                            <p className="val2026-moment-text">{currentItem.shortText}</p>

                            {completedItems.includes(currentItem.id) && (
                                <button className="val2026-btn-cosmic val2026-small" onClick={handleNextMoment}>
                                    {currentItem.id === 'first_dance' ? 'Finish Journey' : 'Next Star →'}
                                </button>
                            )}
                        </div>
                    </section>
                )}

                {currentScreen === 'final' && (
                    <section className="val2026-screen val2026-active">
                        <div className="val2026-final-content">
                            <h1 className="val2026-final-title val2026-neon-text">Happy Valentine's Day Kebabi</h1>
                            <p className="val2026-final-subtitle">You are my universe.</p>
                            <p className="val2026-final-footer">Our journey is just beginning...</p>
                            <button
                                className="val2026-btn-cosmic"
                                onClick={() => {
                                    setCompletedItems([]);
                                    setQuizSolved([]);
                                    setSecretsUnlocked([]);
                                    setCurrentScreen('cover');
                                    localStorage.removeItem('cosmicState_react');
                                }}
                            >
                                Replay Timeline
                            </button>
                        </div>
                    </section>
                )}

            </div>

            {/* Popups */}
            {activePopup === 'quiz' && currentItem && (
                <div className="val2026-popup val2026-active">
                    <div className="val2026-popup-content val2026-glass-panel">
                        <h3 className="val2026-popup-title">Cosmic Knowledge Check</h3>
                        <p className="val2026-quiz-question">{currentItem.quizQuestion || "How well do you know us?"}</p>
                        <div className="val2026-quiz-options">
                            {currentItem.quizOptions?.map((opt: string, idx: number) => (
                                <button
                                    key={idx}
                                    className={`val2026-quiz-btn ${clickedQuizOption === idx
                                        ? (idx === currentItem.quizAnswer ? 'val2026-correct' : 'val2026-wrong')
                                        : ''}`}
                                    onClick={() => handleQuizOption(idx)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {quizFeedback && (
                            <div className="val2026-quiz-feedback" style={{ color: quizFeedback.color }}>
                                {quizFeedback.text}
                            </div>
                        )}
                        <button className="val2026-btn-text" onClick={() => setActivePopup('none')}>Cancel</button>
                    </div>
                </div>
            )}

            {(activePopup === 'secret' || activePopup === 'tapSecret') && (
                <div className="val2026-popup val2026-active">
                    <div className="val2026-popup-content val2026-glass-panel">
                        <div className="val2026-star-icon">✨</div>
                        <h3 className="val2026-popup-title">Stardust Unlocked</h3>
                        <p className="val2026-popup-text">{popupMessage}</p>
                        <button
                            className="val2026-btn-cosmic val2026-small"
                            onClick={(() => {
                                setActivePopup('none');
                                if (activePopup === 'secret') {
                                    setCurrentScreen('final');
                                } else if (activePopup === 'tapSecret' && currentScreen === 'timeline') {
                                    // If we are on timeline (e.g. just finished quiz), go to the moment
                                    setCurrentScreen('moment');
                                }
                            })}
                        >
                            Collect Star
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
