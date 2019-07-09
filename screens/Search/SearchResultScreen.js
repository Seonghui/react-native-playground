import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, ActivityIndicator, FlatList, Button, ScrollView, RefreshControl } from 'react-native';
import FoodsListItem from '../../components/FoodsListItem'


export default class SearchResultScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: [],
      total: 0,
      limit: 10,
      offset: 0
    }
  }

  componentDidMount() {
    this.searchData()
  }

  searchData = async () => {
    const { navigation } = this.props;
    const { limit, offset } = this.state;

    const data = navigation.getParam('text', null)
    const url = 'http://test.doctorkitchen.co.kr/api/docsray/search/'
    const form = new FormData;

    form.append('search', data)
    form.append('limit', limit)
    form.append('offset', offset)

    const postdata = await fetch(url, {
      method: 'post',
      body: form,
    })

    const list = await postdata.json()
    this.setState(state => ({
      total: list.total,
      isLoading: false,
      data: [
        ...state.data,
        ...list.foods
      ]
    }))
  }

  onEndReached = () => {
    const { offset, total, limit } = this.state
    if (!(offset >= total - limit)) {
      this.setState({
        offset: this.state.offset + 10
      }, () => {
        this.searchData();
      });
    }
  }

  renderFooter = () => {
    return (
      <ActivityIndicator />
    )
  }

  render() {
    const { navigation } = this.props
    if (this.state.isLoading) {
      return (
        <View style={styles.baseSpace}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View>
        <Text>Result Page</Text>
        <Text>{`total: ${this.state.total}`}</Text>
        <FlatList
          data={this.state.data}
          renderItem={(data) => <FoodsListItem {...data} navigation={navigation} />}
          onEndReachedThreshold={0}
          onEndReached={this.onEndReached}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={this.renderFooter}
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