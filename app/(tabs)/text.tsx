import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';

export default function ScrollingTextComponent() {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [isScrolling, setIsScrolling] = useState(false);
  const { height } = Dimensions.get('window');

  const longText = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. 
  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
  Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. 
  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
  Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. 
  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
  Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. 
  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
  Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
  `;

  const startScroll = () => {
    if (!isScrolling) {
      setIsScrolling(true);
      Animated.timing(scrollAnim, {
        toValue: -height, // Scroll to full height of the screen
        duration: 10000, // Adjust duration as needed
        useNativeDriver: true,
      }).start(() => {
        setIsScrolling(false);
      });
    }
  };

  const restartScroll = () => {
    // Reset to initial position
    scrollAnim.setValue(0);
    setIsScrolling(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.Text 
          style={[
            styles.scrollingText, 
            { 
              transform: [{ translateY: scrollAnim }],
            }
          ]}
        >
          {longText}
        </Animated.Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={startScroll}
          disabled={isScrolling}
        >
          <Text style={styles.buttonText}>Start Scroll</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={restartScroll}
        >
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    height: 200, // Fixed height for visible area
    overflow: 'hidden',
    width: '100%',
  },
  scrollingText: {
    fontSize: 16,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
