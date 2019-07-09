import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const TipsListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item.id, name: item.name })}>
      <View style={styles.listWrapper}>
        <Image source={{ uri: item.image }} style={styles.imageSize} />
        <View>
          <Text>{item.brand}</Text>
          <Text>{item.name}</Text>
          <Text>{item.id}</Text>
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