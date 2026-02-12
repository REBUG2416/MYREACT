import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Val2026.css';
import roseLine from '../Val2024/assets/rose-line.png';
import Val2026ComingSoon from './Val2026ComingSoon';
import Val2026Loader from './Val2026Loader';

export default function Val2026() {
    const [isLocked, setIsLocked] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPromises, setShowPromises] = useState(false);
    const [hasVisitedTimeline, setHasVisitedTimeline] = useState(false);

    useEffect(() => {
        const targetDate = new Date('2026-02-14T00:00:00').getTime();
        const now = new Date().getTime();
        // Only unlock if time has passed AND we aren't in the middle of a transition
        // But for initial load, we can unlock immediately if date is past
        if (now >= targetDate) {
            // If we want to show loader even on refresh after date, we could add logic here
            // For now, let's keep instant unlock on refresh
            setIsLocked(false);
        }

        // Check if user has visited timeline
        const visited = localStorage.getItem('val2026_timeline_visited') === 'true';
        setHasVisitedTimeline(visited);
    }, []);

    const handleTimerEnd = () => {
        setIsFading(true);
        setTimeout(() => {
            setIsFading(false);
            setIsLocked(false);
            setIsLoading(true);

            // Show loader for 3 seconds then reveal content
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }, 2000); // Wait for 2s fade out
    };

    if (isLoading) {
        return <Val2026Loader />;
    }

    if (isLocked) {
        return (
            <div className={isFading ? 'val2026-fade-out' : ''}>
                <Val2026ComingSoon onTimerEnd={handleTimerEnd} />
            </div>
        );
    }


    return (
        <div className="container" style={{ marginTop: '50px', paddingBottom: '100px' }}>
            <div className='yearDivision'>
                <img src={roseLine} alt="" className="roseline" />
                <span>Valentines Day <span style={{ color: "#e24de2" }}>2026</span></span>
                <img src={roseLine} alt="" className="roseline" />
            </div>

            <div className="val2026-wrapper" data-aos="fade-up">
                <h1 className="val2026-title">Our Infinite Loop</h1>

                <div className="val2026-poem">
                    <p>
                        There is a quiet magic in <span style={{ color: "red" }}>loving</span> you,<br />
                        The kind that returns to me every time.<br />
                        In your presence, the world slows down,<br />
                        And my heart always finds its way back.
                    </p>
                    <p>
                        Your smile feels like morning light,<br />
                        Soft, warm, and endlessly familiar.<br />
                        Your voice is comfort in motion,<br />
                        A place my soul knows without asking.
                    </p>
                    <p>
                        With you, <span style={{ color: "red" }}>love</span> doesn’t rush or fade,<br />
                        It circles gently, steady and true.<br />
                        No matter where the days may wander,<br />
                        We always meet in the same place us.
                    </p>
                    <p>
                        So today, and on all the days after,<br />
                        This truth will remain unchanged:<br />
                        <span className="sc-name">Kebabi</span>, you are my heart’s constant,<br />
                        And <span style={{ color: "red" }}>loving</span> you is our <span style={{ color: "red" }}>infinite loop</span>.
                    </p>
                    <div className="signature">
                        <span style={{ color: "blue" }}>— Kababi</span>
                    </div>
                </div>

                <div className="val2026-interactive" data-aos="zoom-in" data-aos-delay="200">
                    {!showPromises ? (
                        <button className="promise-btn" onClick={() => setShowPromises(true)}>
                            Open My Heart 🩵
                        </button>
                    ) : (
                        <div className="promises-list">
                            <h3>Promises for 2026 & Beyond</h3>
                            <ul>
                                <li>✨ To debug life's errors with you.</li>
                                <li>✨ To compile new memories every day.</li>
                                <li>✨ To never let our spark run low.</li>
                                <li>✨ To love you, infinitely.</li>
                            </ul>
                            <div className="signature">- Forever Yours, Dera</div>
                            <Link to="/val2026/2026-timeline" style={{ textDecoration: 'none' }}>
                                <button className="promise-btn" style={{ fontSize: '1rem', background: 'linear-gradient(135deg, #2c5364, #203a43)', padding: '10px 20px', marginTop: '20px' }}>
                                    🚀 Explore Our Cosmic Timeline
                                </button>
                            </Link>

                        </div>
                    )}
                </div>

                <div style={{ marginTop: '50px', marginBottom: '50px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {hasVisitedTimeline && (
                        <Link to="/val2026/surprise" style={{ textDecoration: 'none' }}>
                            <button className="promise-btn" style={{ fontSize: '1.2rem', background: 'linear-gradient(135deg, #43cea2, #185a9d)' }}>
                                ✨ Cosmic Surprise
                            </button>
                        </Link>
                    )}
                    <Link to="/val2026/be-my-valentine" style={{ textDecoration: 'none' }}>
                        <button className="promise-btn" style={{ fontSize: '1.2rem', background: 'linear-gradient(135deg, #ff9966, #ff5e62)' }}>
                            💝 Be My Valentine
                        </button>
                    </Link>
                </div>
            </div>

            <div className="yearDivision" >
                <img src={roseLine || "/placeholder.svg"} alt="" className="roseline" />
                <span></span>
                <img src={roseLine || "/placeholder.svg"} alt="" className="roseline" />
            </div>

        </div>
    );
}
