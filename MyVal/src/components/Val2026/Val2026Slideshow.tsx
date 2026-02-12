import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Val2026Slideshow.css';

// Assets
// @ts-ignore
import img1 from './assets/WhatsApp Image 2026-02-12 at 12.52.55.jpeg';
// @ts-ignore
import img2 from './assets/WhatsApp Image 2026-02-12 at 12.52.58 (1).jpeg';
// @ts-ignore
import img3 from './assets/WhatsApp Image 2026-02-12 at 12.52.58.jpeg';
// @ts-ignore
import img4 from './assets/WhatsApp Image 2026-02-12 at 12.52.59 (1).jpeg';
// @ts-ignore
import img5 from './assets/WhatsApp Image 2026-02-12 at 12.52.59.jpeg';

// @ts-ignore
import vid1 from './assets/WhatsApp Video 2026-02-12 at 12.52.46.mp4';
// @ts-ignore
import vid2 from './assets/WhatsApp Video 2026-02-12 at 12.52.49.mp4';
// @ts-ignore
import vid3 from './assets/WhatsApp Video 2026-02-12 at 12.52.51.mp4';
// @ts-ignore
import vid4 from './assets/WhatsApp Video 2026-02-12 at 12.52.52.mp4';
// @ts-ignore
import vid5 from './assets/WhatsApp Video 2026-02-12 at 12.52.53.mp4';
// @ts-ignore
import vid6 from './assets/WhatsApp Video 2026-02-12 at 12.52.54.mp4';
// @ts-ignore
import vid7 from './assets/WhatsApp Video 2026-02-12 at 12.52.57.mp4';

const slides = [
    { type: 'image', src: img1, caption: 'Looking at you makes me fall in love all over again😍' },
    { type: 'video', src: vid1, caption: 'Loved you since from the day i met you 💖' },
    { type: 'image', src: img2, caption: 'Building our dreams, one line at a time 💻' },
    { type: 'video', src: vid2, caption: 'Adventures in our own universe 🚀' },
    { type: 'image', src: img3, caption: 'You make the simple things beautiful 🌹' },
    { type: 'video', src: vid3, caption: 'Capturing memories in the cosmic flow 🌊' },
    { type: 'image', src: img4, caption: 'My forever Valentine 💝' },
    { type: 'video', src: vid4, caption: 'Having fun with you is the best feeling ever💖' },
    { type: 'image', src: img5, caption: 'Every moment with you is magic ✨' },
    { type: 'video', src: vid5, caption: 'Smiles that outshine the galaxies 🌌' },
    { type: 'video', src: vid6, caption: 'Just us, being perfectly us 🥰' },
    { type: 'video', src: vid7, caption: 'Two hearts, one infinite loop ♾️' },
];

// @ts-ignore
import bgMusic from './assets/ItsAMoney_-_Until_I_Found_You_CeeNaija.com_.mp3';

const Val2026Slideshow: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Auto-advance logic
    useEffect(() => {
        //@ts-ignore
        let interval: NodeJS.Timeout;

        if (isPlaying) {
            const currentSlide = slides[currentIndex];
            const duration = currentSlide.type === 'video' ? 10000 : 5000; // Longer for video placeholder

            interval = setTimeout(() => {
                handleNext();
            }, duration);
        }

        return () => clearTimeout(interval);
    }, [currentIndex, isPlaying]);

    // Handle Music Play/Pause
    const toggleMusic = () => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsMusicPlaying(!isMusicPlaying);
        }
    };

    // Attempt auto-play on mount, with fallback listeners if blocked
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;

            const playAudio = async () => {
                if (audioRef.current && audioRef.current.paused) {
                    try {
                        await audioRef.current.play();
                        setIsMusicPlaying(true);
                        // Remove listeners once playing succeeds
                        document.removeEventListener('click', playAudio);
                        document.removeEventListener('keydown', playAudio);
                        document.removeEventListener('scroll', playAudio);
                    } catch (err) {
                        console.log("Autoplay prevented, waiting for interaction:", err);
                        setIsMusicPlaying(false);
                        // Add listeners to try again on interaction
                        document.addEventListener('click', playAudio, { once: true });
                        document.addEventListener('keydown', playAudio, { once: true });
                        document.addEventListener('scroll', playAudio, { once: true });
                    }
                }
            };

            playAudio();

            return () => {
                document.removeEventListener('click', playAudio);
                document.removeEventListener('keydown', playAudio);
                document.removeEventListener('scroll', playAudio);
            };
        }
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="val2026-slideshow-container" data-aos="fade-up">
            <h2 className="val2026-slideshow-title">Our Cosmic Memories 🌠</h2>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={bgMusic} loop />

            <div
                className="val2026-slideshow-frame"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="val2026-slide-content"
                    >
                        {slides[currentIndex].type === 'image' ? (
                            <img
                                src={slides[currentIndex].src}
                                alt={slides[currentIndex].caption}
                                className="val2026-slide-media"
                            />
                        ) : (
                            <video
                                ref={videoRef}
                                src={slides[currentIndex].src}
                                className="val2026-slide-media"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        )}
                        <div className="val2026-slide-caption">
                            {slides[currentIndex].caption}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <button className="val2026-nav-btn prev" onClick={handlePrev}>‹</button>
                <button className="val2026-nav-btn next" onClick={handleNext}>›</button>
            </div>

            {/* Dots */}
            <div className="val2026-dots-container">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`val2026-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>

            <div className="val2026-music-control" onClick={toggleMusic} style={{ cursor: 'pointer' }}>
                <p>
                    {isMusicPlaying ? '🔊 Playing: Until I Found You 🎶' : '🔇 Tap to Play Our Song 🎵'}
                </p>
            </div>
        </div>
    );
};

export default Val2026Slideshow;
