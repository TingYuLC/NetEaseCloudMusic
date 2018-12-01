import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const screenW = width;
const screenH = height;

export {
  screenW,
  screenH
}
