import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';

const HomePage = ({ navigation }) => {
  const gif1X = useRef(new Animated.Value(-400)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(gif1X, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/bot.gif')}
        style={[styles.gif, { transform: [{ translateX: gif1X }] }]}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Ben yardımcı asistanınız </Text>
        <Text style={styles.subtitle}>Benimle sohbete başlamak için butona tıklayınız</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Aipage')}
        >
          <Text style={styles.buttonText}>Sohbete Başla</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default HomePage;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#373A40',
  },
  gif: {
    width: 400,
    height: 500,
    position: 'absolute',
    top: height / 2 - 250,
  },
  overlay: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
