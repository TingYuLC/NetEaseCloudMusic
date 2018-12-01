import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, StatusBar, Animated, Easing, ActivityIndicator } from 'react-native';
import { Slider } from 'react-native-elements'
import { BackImg } from "../common/ImgConfig";
import { SideBar } from "../components";
import { demo } from "../service/api";
import Video from 'react-native-video';
import { screenW } from "../utils";
import Icon from "react-native-vector-icons/Ionicons";

export default class MusicPlayer extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor(props: any) {
    super(props);

    this.state = {
      title: '',
      picUrl: '',
      mp3: '',
      bgColor: '#C60D0D',
      pause: false,
      startTime: '00:00',
      currentTime: 0,
      sliderValue: 0,
      rotateValue: new Animated.Value(0),
      minimumTrackTintColor: '#C60D0D',
      maximumTrackTintColor: "#cccccc",
      thumbTintColor: "#fff"
    }
  }

  componentWillMount () {
    const id = this.props.navigation.getParam('id');
    const name = this.props.navigation.getParam('name');
    const picUrl = this.props.navigation.getParam('picUrl');
    this.startAnimation();
    const url = demo.Music_Mp3_Url.replace('{id}', id);
    this.setState({
      title: name,
      picUrl: picUrl,
      mp3: url
    })
  }

  onLoad = (e) => {
    this.setState({
      duration: e.duration
    })
  }

  onProgress =(data) => {
    let val = parseInt(data.currentTime)
    this.setState({
      sliderValue: val,
      currentTime: data.currentTime
    })

    if (val == this.state.file_duration){
    }
  }  

  formatTime = (time) => {
    if (!time) return this.state.startTime;
    let min = Math.floor(time / 60)
    let second = time - min * 60
    min = min >= 10 ? min : '0' + min
    second = second >= 10 ? second : '0' + second
    return min + ':' + second
  }

  startAnimation() {
    this.state.rotateValue.setValue(0);
    Animated.parallel([
      Animated.timing(this.state.rotateValue, {
          toValue: 1,
          duration: 15000,
          easing: Easing.out(Easing.linear)
      }),
    ]).start(() => this.startAnimation());
  }

  renderPlay = () => {
    const { startTime, currentTime, sliderValue, duration, minimumTrackTintColor, maximumTrackTintColor, thumbTintColor } = this.state;
    const styles = playStyles;

    return <View style={[styles.container, {width: screenW}]}>
      <View style={styles.sliderContainer}>
        <View>
          <Text style={styles.timeStyle}>{this.formatTime(Math.floor(currentTime))}</Text>
        </View>
        <View style={styles.sliderStyle}>
          <Slider
            value={sliderValue}
            maximumValue={duration}
            step={1}
            minimumTrackTintColor={minimumTrackTintColor}
            maximumTrackTintColor={maximumTrackTintColor}
            thumbTintColor={thumbTintColor}
            onValueChange={(value) => {this.setState({currentTime: value})}}
            onSlidingComplete={(value) => this.refs.video.seek(value)}
          />
        </View>
        <View>
          {
            this.formatTime(Math.floor(duration)) === startTime
            ? <ActivityIndicator size="small" color="#fff" /> 
            : <Text style={styles.timeStyle}>{this.formatTime(Math.floor(duration))}</Text>
          }
        </View>
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          onPress={() => {this.setState({pause: !this.state.pause})}}
          style={styles.playStatus}>
          {
            this.state.pause
            ? <Icon name="ios-play" size={30} color={thumbTintColor} />
            : <Icon name="ios-pause" size={25} color={thumbTintColor} />
          }
        </TouchableOpacity>
      </View>
    </View>
  }

  render () {
    const { title, picUrl, mp3, bgColor, pause, rotateValue } = this.state;

    return (
      <View style={styles.container}>
        <Video
          source={{uri: mp3}}
          ref='video'
          volume={1.0}
          paused={pause}
          onProgress={(e) => this.onProgress(e)}
          onLoad={(e) => this.onLoad(e)}
          playInBackground={true}/>
        <SideBar
          backgroundColor={bgColor}
          title={title}
          leftImg={BackImg}
          onLeftPress={() => this.props.navigation.goBack()} />
        <View style={styles.recordContainer}>
          <View style={styles.recordWrapContainer}>
            <Animated.Image source={{uri: picUrl}}
              style={[
                styles.record,
                { 
                  transform: [{
                    rotateZ: rotateValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    })
                  }]
                }
              ]}>
            </Animated.Image>
          </View>
        </View>
        <View style={styles.emptyContainer} />
        {this.renderPlay()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    flexDirection: 'column'
  },
  recordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordWrapContainer: {
    width: 280,
    height: 280,
    borderRadius: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C60D0D'
  },
  record: {
    width:240,
    height: 240,
    borderRadius: 120
  },
  emptyContainer: {
    height: 100
  }
});

const playStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'column'
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginHorizontal: 5
  },
  timeStyle: {
    fontSize: 12,
    color: '#fff'
  },
  sliderStyle: {
    flex: 1,
    marginHorizontal: 5
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  playStatus: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
