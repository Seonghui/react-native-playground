import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const TipsListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
      <View style={styles.listWrapper}>
        <Image source={{ uri: item.thumbnail }} style={styles.imageSize} />
        <View>
          <Text>{item.title}</Text>
          <Text>{item.excerpt}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listWrapper: {
    flexDirection: 'row'
  },
  imageSize: {
    width: 80,
    height: 80
  }
})

export default TipsListItem;