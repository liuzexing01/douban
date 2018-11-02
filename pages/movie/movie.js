// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    num:4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*传递数组给detail页面*/
    
  },
  jumpDetail: function (e) {
    //拿到点击的index下标
    var index = e.currentTarget.dataset.index
      //将对象转为string
      var movieDetail = JSON.stringify(this.data.list[index])
      wx.navigateTo({
      url: '../detail/detail?movieDetail=' + movieDetail,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      list: getApp().globalData.movies
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  timeup:function(){
    var a = this.data.list.sort(function (a, b) {
      var value1 = a.year,
        value2 = b.year;
      return value1 - value2;
    })
    this.setData({
      list: a,
      num:1
    })
  },
  timedown: function () {
    var a= this.data.list.sort(function(a,b){
      var value1 = a.year,
        value2 = b.year;
      return value2 - value1;
    })
    this.setData({
      list: a,
      num: 2
    })
  },
  pup: function () {
    
    var a = this.data.list.sort(function (a, b) {
      var value1 = a.rating.average,
        value2 = b.rating.average;
      return value1 - value2;
    })
    this.setData({
      list: a,
      num: 3
    })
   },
  pdown: function () {
    var a = this.data.list.sort(function (a, b) {
      var value1 = a.rating.average,
        value2 = b.rating.average;
      return value2 - value1;
    })
    this.setData({
      list: a,
      num: 4
    })
   }
})