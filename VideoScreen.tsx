import React, { useRef, useState } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import Video, { OnProgressData } from 'react-native-video';

const videoUrls = [
  'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
  'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
];

const VideoScreen: React.FC = () => {
  const videoRef = useRef<Video>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [source, setSource] = useState({ uri: videoUrls[currentVideoIndex] });

  const switchVideo = () => {
    if (videoRef.current) {
      const videoPlayer = videoRef.current;

      // Pause current video
      setPaused(true);

      // Hide video and show loading indicator
      setIsLoading(true);

      // Switch video URL
      const nextVideoIndex = (currentVideoIndex + 1) % videoUrls.length;
      const videoUrl = videoUrls[nextVideoIndex];

      // Load new video and play
      setCurrentVideoIndex(nextVideoIndex);
      setSource({ uri: videoUrl });
      setIsLoading(false);
      setPaused(false);
    }
  };

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(Math.floor(data.currentTime));
  };

  return (
    <View style={{ flex: 1 }}>
      <Video
        ref={videoRef}
        source={source}
        onProgress={onProgress}
        style={{ flex: 1 }}
        resizeMode="contain"
        controls={true}
        paused={paused}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Switch Video" onPress={switchVideo} />
      )}
    </View>
  );
};

export default VideoScreen;