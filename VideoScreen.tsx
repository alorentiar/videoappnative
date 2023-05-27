import React, { useRef, useState } from "react";
import { View, Button, Text } from "react-native";
import Video from "react-native-video";

const VideoScreen: React.FC = () => {
  const videoRef = useRef<Video>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [paused, setPaused] = useState(false);

  const videoUrls = [
    "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  ];

  const switchVideo = () => {
    if (videoRef.current) {
      setPaused(true); // Pause the current video
      videoRef.current.seek(seekTime); // Seek to the saved seek time
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
      setVideoLoaded(false);
    }
  };

  const onProgress = (data: any) => {
    if (!videoLoaded) {
      setVideoLoaded(true); // Mark video as loaded once the first progress update is received
    }

    setSeekTime(Math.floor(data.currentTime)); // Update the seek time
  };

  const onLoad = () => {
    if (!videoLoaded) {
      setVideoLoaded(true); // Mark video as loaded when it finishes loading
      setPaused(false); // Start playing the video
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 20 }}>
        Seek Time: {seekTime} seconds
      </Text>

      <Video
        ref={videoRef}
        source={{ uri: videoUrls[currentVideoIndex] }}
        style={{ flex: 1 }}
        resizeMode="contain"
        controls={true}
        paused={paused} // Control the playback state
        onProgress={onProgress}
        onLoad={onLoad}
      />

      <Button title="Switch Video" onPress={switchVideo} />
    </View>
  );
};

export default VideoScreen;
