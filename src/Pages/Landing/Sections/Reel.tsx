import React, { useRef, useState, useEffect } from "react";
import videoFile from '../../../Assets/Video/reel-v1.mp4';
import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react"; // Tabler Icons

const Reel = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => setIsPlaying(true)).catch((err) => console.warn(err));
    }

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handlePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch((err) => console.warn(err));
      }
    }

    if (isMuted) {
      setIsMuted(false);
      video.muted = true;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="reel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handlePlayPause}
    >
      <video ref={videoRef} className="reel__video" muted loop playsInline>
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Cursor */}
      {isHovered && (
        <div
          className="reel__custom-cursor"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        >
          {isPlaying ? (
            <IconPlayerPause size={20} stroke={1.5} color="#ffffff" />
          ) : (
            <IconPlayerPlay size={20} stroke={1.5} color="#ffffff" />
          )}
        </div>
      )}

      {/* Overlay controls */}
      <div className="reel__controls-overlay">
        <div className="reel__controls">
          <button
            className="reel__play-pause-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause(e);
            }}
          >
            {isPlaying ? (
              <IconPlayerPause size={16} stroke={1.5} color="#ffffff" />
            ) : (
              <IconPlayerPlay size={16} stroke={1.5} color="#ffffff" />
            )}
          </button>
          <div className="reel__time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reel;
