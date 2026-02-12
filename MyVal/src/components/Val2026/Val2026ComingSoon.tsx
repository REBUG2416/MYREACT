import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Val2026ComingSoon.css';

// Define props interface
interface Val2026ComingSoonProps {
    onTimerEnd?: () => void;
}

const Val2026ComingSoon: React.FC<Val2026ComingSoonProps> = ({ onTimerEnd }) => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date('2026-02-14T00:00:00').getTime();

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                // Time reached!
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                if (onTimerEnd) onTimerEnd();
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, [onTimerEnd]);

    return (
        <div className="val2026-coming-soon-container">
            <canvas ref={canvasRef} className="val2026-heart-canvas"></canvas>


            <div className="val2026-stars"></div>
            <div className="val2026-stars2"></div>

            <div className="val2026-coming-soon-content">
                <h1 className="val2026-glow-text">Valentines Day 2026 ? Depends..</h1>

                <div style={{ marginTop: '2rem' }}>
                    <button className="val2026-reveal-btn" onClick={() => navigate('/val2026/be-my-valentine')}>
                        Click and find out?
                    </button>
    
                </div>  

                <p className="val2026-subtitle">Your surprise arrives in...</p>
                <div className="val2026-countdown">
                    <div className="val2026-time-block">
                        <span className="val2026-time">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="val2026-label">Days</span>
                    </div>
                    <div className="val2026-time-separator">:</div>
                    <div className="val2026-time-block">
                        <span className="val2026-time">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="val2026-label">Hours</span>
                    </div>
                    <div className="val2026-time-separator">:</div>
                    <div className="val2026-time-block">
                        <span className="val2026-time">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="val2026-label">Minutes</span>
                    </div>
                    <div className="val2026-time-separator">:</div>
                    <div className="val2026-time-block">
                        <span className="val2026-time">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="val2026-label">Seconds</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Val2026ComingSoon;
