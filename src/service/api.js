/**基础链接头*/
const MusicBaseUrl ="http://123.56.221.77/musicApi";

const demo = {
  /**网易云音乐排行版*/
  Music_Ranking_Url: MusicBaseUrl + '/toplist/detail',
  /**网易云音乐排行榜歌曲*/
  Music_Detail_Url: MusicBaseUrl + '/playlist/detail',
  /**网易云音频地址*/
  Music_Mp3_Url: 'https://music.163.com/song/media/outer/url?id={id}.mp3'
}

export { demo };