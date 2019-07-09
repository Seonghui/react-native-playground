import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

export default class TipsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: {}
    };
  }

  searchData = () => {
    const { navigation } = this.props;
    const { text } = this.state;
    navigation.navigate('Result', { text: text })
  }

  render() {
    return (
      <View style={styles.baseSpace}>
        <Text>상품 검색</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="검색"
          onChangeText={(text) => this.setState({ text })}
        />
        <Button
          onPress={this.searchData}
          title="검색"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseSpace: {
    flex: 1,
    paddingTop: 20
  }
})