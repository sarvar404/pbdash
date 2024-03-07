import { keyframes } from '@emotion/react';

import { styled } from '@mui/system';


export const VideoPlayer = ({ videoPath }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <video
      src={videoPath}
      controls
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
    >
      <track kind="captions" />
    </video>
  </div>
);

export const FrameContainer = styled('div')({
  border: '2px solid #97A4B1',
  padding: '10px',
  marginTop: '10px',
  maxWidth: '100%',
});

export const shakeAnimation = keyframes`
    0% { transform: translate(0, 0); }
    20% { transform: translate(-2px, 0); }
    40% { transform: translate(2px, 0); }
    60% { transform: translate(-2px, 0); }
    80% { transform: translate(2px, 0); }
    100% { transform: translate(0, 0); }
  }`;
