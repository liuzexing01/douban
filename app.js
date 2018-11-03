//app.js
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
    })
    /**
  * 加载电影
  */
    wx.request({
      url: 'http://127.0.0.1:3000',
      header: {
        "Content-Type": "json"
      },
      success: res => {
        var subjects = res.data;
        this.processSubjects(subjects);
        this.globalData.movies=subjects;
        if (this.moviesReadyCallback) {
          this.moviesReadyCallback(res)
        }
      }      
    })
  },
  globalData: {
    userInfo:null,
    movies:[],
    newMovies:[]
  },
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