import React from "react";
import { createStackNavigator, createAppContainer  } from 'react-navigation';
import { RankingList, MusicList, MusicPlayer } from "../screens";

const StackNavigator = createStackNavigator({
  RankingList,
  MusicList,
  MusicPlayer
}, {
  initialRouteName: 'RankingList'
})

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
