import React, { useState, useEffect } from 'react';
import './Val2026.css';
import roseLine from '../Val2024/assets/rose-line.png';
import Val2026ComingSoon from './Val2026ComingSoon';

export default function Val2026() {
    const [isLocked, setIsLocked] = useState(true);
    const [showPromises, setShowPromises] = useState(false);
    const [hasVisitedTimeline, setHasVisitedTimeline] = useState(false);

    useEffect(() => {
        const targetDate = new Date('2026-02-14T00:00:00').getTime();
        const now = new Date().getTime();
        if (now >= targetDate) {
            setIsLocked(false);
        }

        // Check if user has visited timeline
        const visited = localStorage.getItem('val2026_timeline_visited') === 'true';
        setHasVisitedTimeline(visited);
    }, []);

    if (isLocked) {
        return <Val2026ComingSoon />;
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
                        In twenty-four, I wrote a rhyme,<br />
                        To tell you of a love sublime.<br />
                        In twenty-five, an app I made,<br />
                        A digital bond that will not fade.
                    </p>
                    <p>
                        Now twenty-six is here to see,<br />
                        How deep our roots have grown to be.<br />
                        Like constants in a changing code,<br />
                        You are my home, my safe abode.
                    </p>
                    <p>
                        No matter how the years may drift,<br />
                        Your presence is my greatest gift.<br />
                        So here's a vow for all time through:<br />
                        <span className="sc-name">Kebabi</span>, I will always cherish you.
                    </p>
                </div>

                <div className="val2026-interactive" data-aos="zoom-in" data-aos-delay="200">
                    {!showPromises ? (
                        <button className="promise-btn" onClick={() => setShowPromises(true)}>
                            Open My Heart 💌
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
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '50px', marginBottom: '50px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a href="/val2026/2026-timeline" style={{ textDecoration: 'none' }}>
                        <button className="promise-btn" style={{ fontSize: '1.2rem', background: 'linear-gradient(135deg, #2c5364, #203a43)' }}>
                            🚀 Explore Our Cosmic Timeline
                        </button>
                    </a>
                    {hasVisitedTimeline && (
                        <a href="/val2026/surprise" style={{ textDecoration: 'none' }}>
                            <button className="promise-btn" style={{ fontSize: '1.2rem', background: 'linear-gradient(135deg, #43cea2, #185a9d)' }}>
                                ✨ Cosmic Surprise
                            </button>
                        </a>
                    )}
                    <a href="/val2026/be-my-valentine" style={{ textDecoration: 'none' }}>
                        <button className="promise-btn" style={{ fontSize: '1.2rem', background: 'linear-gradient(135deg, #ff9966, #ff5e62)' }}>
                            💝 Be My Valentine
                        </button>
                    </a>
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
