import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

const words = ['Reuse', 'Recycle', 'Reduce', 'Renew', 'Rethink'];

const WordCycleAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment current index, and loop back to 0 if exceeds the array length
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      
      // Start animation to fade in the new word
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, // Adjust duration as needed
        useNativeDriver: true,
      }).start(() => {
        // After fade in animation completes, start fade out animation
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000, // Adjust duration as needed
            useNativeDriver: true,
          }).start();
        }, 1000); // Wait for 1 second before starting fade out animation
      });
    }, 2500); // Change word every 3 seconds, adjust interval as needed

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{marginBottom: 40}}>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}>
        <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'green'}}>{words[currentIndex]}</Text>
      </Animated.View>
    </View>
  );
};

export default WordCycleAnimation;
