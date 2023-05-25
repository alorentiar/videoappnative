import React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoScreen from './VideoScreen';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <VideoScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;