import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import HomeScreen from '../screens/Home/HomeScreen';
import RankingScreen from '../screens/Ranking/RankingScreen';
import TipsScreen from '../screens/Tips/TipsScreen';
import TipsDetailScreen from '../screens/Tips/TipsDetailScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import SearchResultScreen from '../screens/Search/SearchResultScreen';
import ProductScreen from '../screens/Product/ProductScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: '홈'
    }
  },
  Details: {
    screen: TipsDetailScreen,
    navigationOptions: {
      headerTitle: '꿀팁 상세'
    }
  }
})

const TipsStack = createStackNavigator({
  Tips: {
    screen: TipsScreen,
    navigationOptions: {
      headerTitle: '꿀팁'
    }
  },
  Details: {
    screen: TipsDetailScreen,
    navigationOptions: {
      headerTitle: '꿀팁 상세'
    }
  }
})

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      headerTitle: '검색'
    }
  },
  Result: {
    screen: SearchResultScreen,
    navigationOptions: {
      headerTitle: '검색 결과'
    }
  }
})

const Tabs = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: '홈'
    }
  },
  Ranking: {
    screen: RankingScreen,
    navigationOptions: {
      tabBarLabel: '랭킹'
    }
  },
  Tips: {
    screen: TipsStack,
    navigationOptions: {
      tabBarLabel: '꿀팁'
    }
  },
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: '검색'
    }
  }
})

const Root = createStackNavigator(
  {
    Tabs: Tabs,
    ProductDetail: {
      screen: ProductScreen
    },
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export default Root
