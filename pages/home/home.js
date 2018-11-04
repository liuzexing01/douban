// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    img:[{"img_url":"../../assets/img/lion.jpg"},
      { "img_url": "../../assets/img/wujiandao.jpg" },
      { "img_url": "../../assets/img/boji.jpg" },],
    newMovies:[],
    search:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*传递数组给detail页面*/
    wx.request({
      url: 'http://127.0.0.1:3002',
      header: {
        "Content-Type": "json"
      },
      success: res => {
        var subjects = res.data;
        this.processSubjects(subjects);
        getApp().globalData.newMovies= subjects;
        this.setData({
          newMovies: subjects
        })
      }
    })
  
  },
  jumpDetail: function (e) {
    //拿到点击的index下标
    var index = e.currentTarget.dataset.index
    //将对象转为string
    var movieDetail = JSON.stringify(this.data.newMovies[index])
    wx.navigateTo({
      url: '../detail/detail?movieDetail=' + movieDetail,
    })
  },
  jumpDetail2: function (e) {
    //拿到点击的index下标
    var index = e.currentTarget.dataset.index
    //将对象转为string
    var movieDetail = JSON.stringify(this.data.movies[index])
    wx.navigateTo({
      url: '../detail/detail?movieDetail=' + movieDetail,
    })
  },
  movieInput:function(e) {
    this.setData({
      search: e.detail.value
    })
  },
  searchMovie:function(){
    var data = this.data.search;
    var movies=this.data.movies;
    var newMovies=this.data.newMovies;
    var searchMovie=[]
    for(var m of movies){
      if(m.title.indexOf(data)!=-1){
        searchMovie.push(m)
      }
    }
    for (var m of newMovies) {
      if (m.title.indexOf(data) != -1) {
        searchMovie.push(m)
      }
    }
    searchMovie = JSON.stringify(searchMovie)
    wx.navigateTo({
      url: '../search/search?movie=' + searchMovie,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      movies: getApp().globalData.movies
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
  /**
 * 加载电影
 */
  /**
   * 
   */
  processSubjects: function (subjects) {
    //循环
    for (var i = 0; i < subjects.length; i++) {
      var subject = subjects[i];
      this.processSubject(subject);
    }
  },
  /**
   * 
  */
  processSubject: function (subject) {
    //名称
    var title = subject.title;
    //导演
    var directors = subject.directors;
    var directorStr = "";
    for (var index in directors) {
      directorStr = directorStr + directors[index].name + " / ";
    }
    if (directorStr != "") {
      directorStr = directorStr.substring(0, directorStr.length - 2);
    }
    //主演
    var casts = subject.casts;
    var castStr = "";
    for (var index in casts) {
      castStr = castStr + casts[index].name + " / ";
    }
    if (castStr != "") {
      castStr = castStr.substring(0, castStr.length - 2);
    }
    //类型
    var genres = subject.genres;
    var genresStr = "";
    for (var index in genres) {
      genresStr = genresStr + genres[index] + " / ";
    }
    if (genresStr != "") {
      genresStr = genresStr.substring(0, genresStr.length - 2);
    }
    //年份
    var year = subject.year;
    //评分
    var rating = subject.rating.average;
    //拼接字符串
    var text = "名称：" + title + "\n导演：" + directorStr + "\n主演：" + castStr + "\n类型：" + genresStr + "\n上映年份:" + year + "\n评分:" + rating;
    subject.text = text;
  }
})