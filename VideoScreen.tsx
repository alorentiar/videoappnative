import React, { useRef, useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import Video, { OnProgressData } from "react-native-video";

const VideoScreen: React.FC = () => {
  const videoRef = useRef<Video | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [totalSeekTime, setTotalSeekTime] = useState(0);

  const videoUrls = [
    "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  ];

  const switchVideo = () => {
    if (videoRef.current) {
      const nextVideoIndex = (currentVideoIndex + 1) % videoUrls.length;
      setCurrentVideoIndex(nextVideoIndex);
      setVideoLoaded(false);
    }
  };

  const onProgress = (data: OnProgressData) => {
    if (!videoLoaded) {
      setVideoLoaded(true);
      const currentTime = Math.floor(data.currentTime || 0);
      setTotalSeekTime((prevTotalSeekTime) => prevTotalSeekTime + currentTime);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (videoLoaded) {
        videoRef.current.seek(totalSeekTime);
      } else {
        videoRef.current.presentFullscreenPlayer();
      }
    }
  }, [videoLoaded]);

  useEffect(() => {
    return () => {
      setTotalSeekTime(0);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 20 }}>
        Total Seek Time: {totalSeekTime} seconds
      </Text>

      <Video
        ref={(ref) => (videoRef.current = ref)}
        source={{ uri: videoUrls[currentVideoIndex] }}
        style={{ flex: 1 }}
        resizeMode="contain"
        controls={true}
        onProgress={onProgress}
        onLoad={() => setVideoLoaded(true)}
        paused={!videoLoaded}
      />

      <Button title="Switch Video" onPress={switchVideo} />
    </View>
  );
};

export default VideoScreen;
