import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Val2026ComingSoon.css';

const Val2026ComingSoon: React.FC = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Heart Trail Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const hearts: { x: number, y: number, size: number, speedX: number, speedY: number, alpha: number, color: string }[] = [];
        let mouseX = 0;
        let mouseY = 0;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Spawn a new heart
            if (Math.random() > 0.5) { // Limit spawn rate slightly
                hearts.push({
                    x: mouseX,
                    y: mouseY,
                    size: Math.random() * 10 + 5,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: Math.random() * 2 + 1, // Fall down
                    alpha: 1,
                    color: `hsl(${Math.random() * 60 + 300}, 100%, 60%)` // Pink/Purple range
                });
            }
        };

        // Touch support
        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            mouseX = touch.clientX;
            mouseY = touch.clientY;
            hearts.push({
                x: mouseX,
                y: mouseY,
                size: Math.random() * 10 + 5,
                speedX: (Math.random() - 0.5) * 2,
                speedY: Math.random() * 2 + 1,
                alpha: 1,
                color: `hsl(${Math.random() * 60 + 300}, 100%, 60%)`
            });
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < hearts.length; i++) {
                const h = hearts[i];
                ctx.globalAlpha = h.alpha;
                ctx.fillStyle = h.color;

                // Draw Heart
                ctx.beginPath();
                const topCurveHeight = h.size * 0.3;
                ctx.moveTo(h.x, h.y + topCurveHeight);
                // top left curve
                ctx.bezierCurveTo(
                    h.x, h.y,
                    h.x - h.size / 2, h.y,
                    h.x - h.size / 2, h.y + topCurveHeight
                );
                // bottom left curve
                ctx.bezierCurveTo(
                    h.x - h.size / 2, h.y + (h.size + topCurveHeight) / 2,
                    h.x, h.y + (h.size + topCurveHeight) / 2,
                    h.x, h.y + h.size
                );
                // bottom right curve
                ctx.bezierCurveTo(
                    h.x, h.y + (h.size + topCurveHeight) / 2,
                    h.x + h.size / 2, h.y + (h.size + topCurveHeight) / 2,
                    h.x + h.size / 2, h.y + topCurveHeight
                );
                // top right curve
                ctx.bezierCurveTo(
                    h.x + h.size / 2, h.y,
                    h.x, h.y,
                    h.x, h.y + topCurveHeight
                );
                ctx.fill();

                // Update
                h.x += h.speedX;
                h.y += h.speedY;
                h.alpha -= 0.02; // Fade out
            }

            // Remove dead hearts
            for (let i = hearts.length - 1; i >= 0; i--) {
                if (hearts[i].alpha <= 0) {
                    hearts.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);


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
                // Time reached, but this component might still be mounted for a split second
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, []);

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
