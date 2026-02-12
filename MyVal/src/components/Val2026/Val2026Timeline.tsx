import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Val2026Timeline.css';
//@ts-ignore
import timelineDataRaw from './Timeline.json';
import Val2026Slideshow from './Val2026Slideshow';
import roseLine from '../Val2024/assets/rose-line.png';

const timelineData = timelineDataRaw as TimelineItem[];

// Type definition for timeline items
interface TimelineItem {
    id: string;
    title: string;
    shortText: string;
    image: string;
    imageType: string;
    secretMessage?: string;
    unlockRule?: string;
    quizQuestion?: string;
    quizOptions?: string[];
    quizAnswer?: number;
}

const Val2026Timeline: React.FC = () => {
    const [showFinalSurprise, setShowFinalSurprise] = useState(false);
    // Check unlock status from localStorage
    const isMasterUnlocked = localStorage.getItem('val2026_timeline_unlocked') === 'true';

    useEffect(() => {
        localStorage.setItem('val2026_timeline_visited', 'true');
    }, []);

    // Get granular progress
    let completedItems: string[] = [];
    try {
        const savedState = localStorage.getItem('cosmicState_react');
        if (savedState) {
            completedItems = JSON.parse(savedState).completed || [];
        }
    } catch (e) {
        console.error("Error reading cosmic state", e);
    }

    return (
        <div className="val2026-timeline-container">
            <div className='yearDivision'>
                <img src={roseLine} alt="" className="roseline" />
                <span>Valentines Day <span style={{ color: "#e24de2" }}>2026</span></span>
                <img src={roseLine} alt="" className="roseline" />
            </div>

            <Link to="/" className="val2026-back-btn">
                ← Back to Galaxy
            </Link>

            <div className="val2026-timeline-content">
                <header className="val2026-timeline-header">
                    <h1 className="val2026-timeline-title">Our Cosmic Timeline</h1>
                    <p className="val2026-timeline-subtitle">Moments written in the stars...</p>
                </header>

                <div className="val2026-timeline">
                    {timelineData.map((item: TimelineItem) => {
                        const isItemUnlocked = isMasterUnlocked || completedItems.includes(item.id);

                        return (
                            <div key={item.id} className="val2026-timeline-item">
                                <div className="val2026-timeline-dot"></div>
                                <div className={`val2026-timeline-card ${!isItemUnlocked ? 'val2026-locked' : ''}`}>
                                    {isItemUnlocked ? (
                                        <>
                                            {/* Unlocked Content */}
                                            <img
                                                src={item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/${item.image}`}
                                                alt={item.title}
                                                className="val2026-card-image"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                                                }}
                                            />
                                            <h3 className="val2026-card-title">{item.title}</h3>
                                            <p className="val2026-card-text">{item.shortText}</p>

                                            {item.secretMessage && (
                                                <div className="val2026-secret-message">
                                                    {item.secretMessage}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {/* Locked Content */}
                                            <div className="val2026-card-locked-overlay">
                                                <span className="val2026-lock-icon">🔒</span>
                                                <h3 className="val2026-card-title">LOCKED MEMORY</h3>
                                                <p className="val2026-card-text">Complete this memory in the Surprise to unlock!</p>
                                                <Link to="/val2026/surprise" className="val2026-unlock-btn">
                                                    Go to Surprise ✨
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            {/* Final Surprise Overlay */}
            {showFinalSurprise && (
                <div className="val2026-final-overlay">
                    <div className="val2026-final-content">
                        <div className="val2026-final-emojis">✨🚀❤️</div>
                        <h1 className="val2026-neon-text">Happy Valentine's Day Kebabi</h1>
                        <p className="val2026-final-subtitle">You are my universe.</p>
                        <p className="val2026-final-footer">Our journey is just beginning...</p>

                        <button
                            className="val2026-btn-cosmic"
                            onClick={() => {
                                localStorage.removeItem('cosmicState_react');
                                localStorage.removeItem('val2026_timeline_unlocked');
                                window.location.reload();
                            }}
                        >
                            Replay Timeline
                        </button>

                        <button
                            className="val2026-btn-text"
                            style={{ marginTop: '20px', display: 'block', marginInline: 'auto' }}
                            onClick={() => setShowFinalSurprise(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {(isMasterUnlocked || (timelineData.length > 0 && completedItems.length >= timelineData.length)) && (<>
                <div style={{ marginTop: '80px', marginBottom: '80px' }}>
                    <Val2026Slideshow />
                </div>

                {/* Final Surprise Button */}
                <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
                    <button
                        className="val2026-btn-cosmic"
                        style={{ background: 'linear-gradient(45deg, #ff00cc, #333399)', boxShadow: '0 0 20px #ff00cc' }}
                        onClick={() => setShowFinalSurprise(true)}
                    >
                        💖 Reveal Final Surprise 💖
                    </button>
                </div>
            </>
            )}

            <div className='yearDivision'>
                <img src={roseLine} alt="" className="roseline" />
                <span></span>
                <img src={roseLine} alt="" className="roseline" />
            </div>
        </div>
    );
};

export default Val2026Timeline;
