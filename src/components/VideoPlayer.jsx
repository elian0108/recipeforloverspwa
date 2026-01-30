import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import './VideoPlayer.css';

const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="video-player-container" onClick={togglePlay}>
            <video
                ref={videoRef}
                src={src}
                className="video-element"
                playsInline
                onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying && (
                <div className="play-overlay">
                    <Play size={48} fill="white" color="white" />
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
