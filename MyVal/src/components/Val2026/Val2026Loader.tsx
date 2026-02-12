import React from 'react';
import './Val2026Loader.css';

const Val2026Loader: React.FC = () => {
    return (
        <div className="val2026-loader-container">
            <div className="val2026-orbit-spinner">
                <div className="val2026-orbit"></div>
                <div className="val2026-orbit-2"></div>
                <div className="val2026-heart-core">💖</div>
            </div>
            <p className="val2026-loader-text">Aligning our stars...</p>
        </div>
    );
};

export default Val2026Loader;
