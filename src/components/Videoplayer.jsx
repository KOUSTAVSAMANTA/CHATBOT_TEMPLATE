import React from 'react';
import "./videoplayer.css";

const VideoPlayer = ({ src}) => {
  return (
    <div className="video-container">
      <video className="video" controls>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
