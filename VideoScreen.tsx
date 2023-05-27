import React, {useRef, useState, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import Video, {OnProgressData} from 'react-native-video';

interface VideoInfo {
  url: string;
  seekTime: number;
}

const VideoScreen: React.FC = () => {
  const videoRef = useRef<Video | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoInfos, setVideoInfos] = useState<VideoInfo[]>([
    {
      url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
      seekTime: 0,
    },
    {
      url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      seekTime: 0,
    },
  ]);

  const switchVideo = () => {
    if (videoRef.current) {
      const nextVideoIndex = (currentVideoIndex + 1) % videoInfos.length;
      setCurrentVideoIndex(nextVideoIndex);
      setVideoLoaded(false);
    }
  };

  const onProgress = (data: OnProgressData) => {
    if (!videoLoaded) {
      setVideoLoaded(true);
      const currentTime = Math.floor(data.currentTime || 0);
      const updatedVideoInfos = [...videoInfos];
      updatedVideoInfos[currentVideoIndex].seekTime += currentTime;
      setVideoInfos(updatedVideoInfos);
      console.log(
        'time updated' +
          currentTime +
          ' ' +
          updatedVideoInfos[currentVideoIndex].seekTime,
      );
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (videoLoaded) {
        const seekTime = videoInfos[currentVideoIndex].seekTime;
        videoRef.current.seek(seekTime);
      } else {
        videoRef.current.presentFullscreenPlayer();
      }
    }
  }, [currentVideoIndex, videoInfos, videoLoaded]);

  useEffect(() => {
    return () => {
      // Reset seek times when unmounting the component
      const resetVideoInfos = videoInfos.map(videoInfo => ({
        ...videoInfo,
      }));
      setVideoInfos(resetVideoInfos);
    };
  }, [videoInfos]);

  return (
    <View style={{flex: 1}}>
      {/* <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 20 }}>
        Total Seek Time: {videoInfos[currentVideoIndex].seekTime} seconds
      </Text> */}

      <Video
        ref={ref => (videoRef.current = ref)}
        source={{uri: videoInfos[currentVideoIndex].url}}
        style={{flex: 1}}
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
