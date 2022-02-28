function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const gameData = {
  visible: true,
  secretNum: getRandomInt(99),
  displaySecretNum: "?",
  num: 0,
  numArray: Array.from({length: 100}, (v, i) => i),
  tip: '',
  gameOver: false
}

Page({
  data: gameData,
  init() {
    this.setData(gameData)
  },
  setNum(event) {
    this.setData({num: event.detail.value})
  },
  guess() {
    if (this.data.secretNum > parseInt(this.data.num)) {
      this.setData({tip: 'small'})
    } else if (this.data.secretNum < parseInt(this.data.num)) {
      this.setData({tip: 'big'})
    } else {
      this.setData({tip: 'equal'})
      this.setData({displaySecretNum: this.data.secretNum})
      console.log(this);
      wx.showModal({
        title: '提示',
        content: '要不要再来一局？',
        success: (res) => {
          if (res.confirm) {
            this.init()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  start() {
    this.setData({visible: false})
  }

})