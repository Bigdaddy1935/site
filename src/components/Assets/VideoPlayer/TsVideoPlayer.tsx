import axios from 'axios';
import React, { useEffect } from 'react';

type Props = {
  src: string;
} & React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
const TsVideoPlayer = React.forwardRef(({ src, ...props }: Props, videoRef: any) => {
  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    if (
      'MediaSource' in window &&
      MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
    ) {
      const mediaSource = new MediaSource();
      video.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener('sourceopen', () => {
        const sourceBuffer = mediaSource.addSourceBuffer(
          'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        );
        fetchTsFile(src!).then((data) => {
          sourceBuffer.addEventListener('updateend', () => {
            if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
              mediaSource.endOfStream();
              video.play();
            }
          });
          sourceBuffer.appendBuffer(data);
        });
      });
    } else {
      console.error('Unsupported MIME type or codec: video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    }
  }, [src]);

  const fetchTsFile = async (url: string) => {
    try {
      const response = await axios(url, {
        responseType: 'blob',
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      return new Uint8Array(response.data);
    } catch (error) {
      console.error('Error fetching .ts file:', error);
      throw error;
    }
  };

  return <video ref={videoRef} {...props} />;
});

export default TsVideoPlayer;
