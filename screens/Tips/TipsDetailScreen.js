import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, ActivityIndicator } from 'react-native';


export default class TipsDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: {}
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { navigation } = this.props;
    const url = `http://test.doctorkitchen.co.kr/api/docsray/tips/${navigation.getParam('id', null)}`
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          isLoading: false,
          data: res,
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    const deviceWidth = Dimensions.get('window').width;

    if (this.state.isLoading) {
      return (
        <View style={styles.baseSpace}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: this.state.data.thumbnail }} style={{ width: deviceWidth, height: 240 }} />
        <Text>{this.state.data.title}</Text>
        <Text>{this.state.data.excerpt}</Text>
        <Text>{this.state.data.content}</Text>
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