import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import TipsListItem from '../../components/TipsListItem'


export default class TipsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: {},
      error: {
        status: false,
        message: ''
      }
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const url = 'http://test.doctorkitchen.co.kr/api/docsray/tips/'
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          isLoading: false,
          data: res,
        })
      })
      .catch((error) => {
        this.setState({
          error: {
            status: true,
            message: error
          }
        })
      })
  }

  render() {
    const { navigation } = this.props;

    if (this.state.isLoading) {
      return (
        <View style={styles.baseSpace}>
          <ActivityIndicator />
        </View>
      )
    }
    if (this.state.error.status === true) {
      return (
        <View style={styles.baseSpace}>
          <Text>에러가 발생했습니다.</Text>
          <Text>{this.state.error.message}</Text>
        </View>
      )
    }
    return (
      <View style={styles.baseSpace}>
        <FlatList
          data={this.state.data.tips}
          renderItem={(data) => <TipsListItem {...data} navigation={navigation} />}
          keyExtractor={({ id }) => id.toString()}
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