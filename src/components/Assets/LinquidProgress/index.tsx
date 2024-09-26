import React from 'react';
import './LiquidProgressBar.css';

interface LiquidProgressBarProps {
  progress: number; // Progress value from 0 to 100
}

const LiquidProgressBar: React.FC<LiquidProgressBarProps> = ({ progress = 0 }) => {
  return (
    <div className="progress" data-value={progress}>
      <div className="progress-inner">
        <div className="progress-label">
          <strong>{Math.floor(progress * 10) / 10}%</strong>
          <span>پیشرفت</span>
        </div>
        <div style={{top : `calc(100% - ${progress}*1%)`}} className={`progress-indicator`}></div>
        <div style={{top : `calc(100% - ${progress}*1%)`}} className={`progress-indicator`}></div>
      </div>
    </div>
  );
};

export default LiquidProgressBar;
