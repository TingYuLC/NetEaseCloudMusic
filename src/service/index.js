import { demo } from "./api";
import React from "react";

export default class HttpService {
  /**网易云音乐排行榜*/
  getMusicRankingList () {
    const url = demo.Music_Ranking_Url;
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => console.log(error))
    })
  }

  /**网易云音乐排行榜*/
  getMusicDetailList (id) {
    const url = demo.Music_Detail_Url + '?id=' + id;
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => console.log(error))
    })
  }

  /**请求数据=本地加网络*/
  fetchNetData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response)=>response.json())
        .then((responseData)=>{
          resolve(responseData);
        })
        .catch((error)=>{
          reject(error);
        })
        .done();
    })
  }
}