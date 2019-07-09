import React, { Component } from 'react';
import {
  Text,
  Button,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import TipsListItem from '../../components/TipsListItem'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      isLoading: true,
      ranking: {
        isLoading: true,
        data: {}
      },
      tips: {
        isLoading: true,
        data: {}
      },
      error: {
        status: false,
        message: ''
      }
    }
  }

  componentDidMount() {
    this.fetchRankingData()
    this.fetchTipsData()
  }

  fetchRankingData = async () => {
    const url = 'http://test.doctorkitchen.co.kr/api/docsray/foods/categories/?is_main=true'
    const getData = await fetch(url)
    const data = await getData.json()
    this.setState({
      ranking: {
        isLoading: false,
        data: data.categories
      }
    })
  }

  fetchTipsData = async () => {
    const url = 'http://test.doctorkitchen.co.kr/api/docsray/tips/?is_main=true'
    const getData = await fetch(url)
    const data = await getData.json()
    this.setState({
      tips: {
        isLoading: false,
        data: data.tips
      }
    })
  }

  renderRankingItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.listWrapper}>
          <Image source={{ uri: item.image }} style={styles.imageSize} />
          <View>
            <Text>{item.name}</Text>
            <Text>{item.excerpt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  onRefresh = () => {
    const { tips, ranking } = this.state;
    this.setState({
      isRefreshing: true
    });
    if (!tips.isLoading && !ranking.isLoading) {
      setTimeout(() => {
        // refresh 하면 fetch 함수들 실행
        this.fetchRankingData()
        this.fetchTipsData()

        this.setState({
          isRefreshing: false
        });
      }, 1000);
    }
  }

  render() {
    const { navigation } = this.props;
    const { tips, ranking } = this.state;

    if (tips.isLoading && ranking.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor="#0000ff"
            title="로딩중이지롱"
            titleColor="#000"
          />
        }
      >
        <View>
          <Text>닥터키친과 함께하는 건강 장보기</Text>
          <Button
            title="상품 검색"
            onPress={() => this.props.navigation.navigate('Search')} />
        </View>
        <View>
          <Text>카테고리별 영영소 순위</Text>
          <FlatList
            data={ranking.data}
            renderItem={this.renderRankingItem}
            keyExtractor={({ id }) => id.toString()}
          />
          <Button
            title="자세히 보기"
            onPress={() => this.props.navigation.navigate('Ranking')} />
        </View>
        <View>
          <FlatList
            data={tips.data}
            renderItem={(data) => <TipsListItem {...data} navigation={navigation} />}
            keyExtractor={({ id }) => id.toString()}
          />
          <Button
            title="자세히 보기"
            onPress={() => this.props.navigation.navigate('Tips')} />
        </View>
      </ScrollView>
    )
  }
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