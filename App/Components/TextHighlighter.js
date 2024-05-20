import React, { useState, useEffect } from 'react';
import View, { Text,  StyleSheet } from 'react-native';

const TextHighlighter = ({ text, readingSpeed = 300 }) => {
  const words = text.split(' ');
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (highlightIndex < words.length - 1) {
        setHighlightIndex(highlightIndex + 1);
      }
    }, readingSpeed);

    return () => clearTimeout(timer);
  }, [highlightIndex, words.length, readingSpeed]);

  return (
    <View style={styles.container}>
      {words.map((word, index) => (
        <Text
          key={index}
          style={[
            styles.word,
            index === highlightIndex ? styles.highlighted : undefined
          ]}
        >
          {word + (index < words.length - 1 ? ' ' : '')}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  word: {
    fontSize: 18,
  },
  highlighted: {
    backgroundColor: 'yellow',
  },
});

export default TextHighlighter;



<TextHighlighter text={Text} readingSpeed={400} />