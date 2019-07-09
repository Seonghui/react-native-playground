import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, ActivityIndicator, Button } from 'react-native';


export default class ProductScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', '상품 정보'),
    };
  };
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
    const url = `http://test.doctorkitchen.co.kr/api/docsray/foods/${navigation.getParam('id', null)}`
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
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="닫기"
        />
        <Image source={{ uri: this.state.data.image }} style={{ width: deviceWidth, height: 240 }} />
        <Text>{this.state.data.name}</Text>
        <Text>{this.state.data.brand}</Text>
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