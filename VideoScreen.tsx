import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const VideoScreen = () => {
  const videoRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const videos = [
    {
      uri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    },
    {
      uri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    },
  ];

  const switchVideo = () => {
    if (videoRef.current) {
      setPaused(true);
      setSeekTime(currentTime);
      setVideoIndex(prevIndex => (prevIndex === 0 ? 1 : 0));
    }
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onPlaybackResume = () => {
    setSeekTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={videos[videoIndex]}
        style={styles.video}
        onProgress={onProgress}
        onPlaybackResume={onPlaybackResume}
        resizeMode="contain"
        controls
        paused={paused}
      />
      <Button
        title="Switch Video"
        onPress={switchVideo}
        disabled={!videoRef.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16), // Assuming 16:9 aspect ratio
  },
});

export default VideoScreen;
