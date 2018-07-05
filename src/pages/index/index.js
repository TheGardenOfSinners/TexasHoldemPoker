const app = getApp();
var poker = require("../../objects/poker.js");
var pokerpool = require("../../objects/pokerpool.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardsuit: "♥",
    cardnum: "10",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initialData();
    this.dealer = pokerpool.PokerPool.createNew();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
   * 这个程序的发牌员卡池
   * 是pokerpool类
   */
  dealer : {},
  
  /**
   * 初始化交互数据
   */
  initialData: function () {
    var tmpArray1 = new Array(9);
    for(var i = 0;i < 9;i++) {
      tmpArray1[i] = new Array(" ", " ");
    }
    var tmpArray2 = new Array(9);
    for (var i = 0; i < 9; i++) {
      tmpArray2[i] = new Array(" "," ");
    }
    this.setData({
      selectpagehide: false,
      cardnumplay: tmpArray1,
      cardsuitplay: tmpArray2,
      cardnumpd: [" ", " ", " ", " ", " "],
      cardsuitpd: [" ", " ", " ", " ", " "],
      nowChange : -1,
      selectpagehide : true,
    });
  },
  
  /**
   * 
   */

  /**
   * 改编扑克外表
   * 传入参数为需要更改的那张牌的编号
   */
  changeCardShow: function(num) {
    if (num < 18) {
      var tmp1 = this.data.cardnumplay, num1 = parseInt(num / 2), num2 = num % 2;
      console.log(num1);
      console.log(num2);
      tmp1[num1][num2] = 10;
      var tmp2 = this.data.cardsuitplay;
      tmp2[num1][num2] = poker.pokerCanshu.suitNameArray[0];
      this.setData({ cardnumplay: tmp1, cardsuitplay: tmp2 });
      console.log(this.data);
    } else {
      var tmp = num - 18;
      var tmp1 = this.data.cardnumpd;
      var tmp2 = this.data.cardsuitpd;
      tmp1[tmp] = 10;
      tmp2[tmp] = poker.pokerCanshu.suitNameArray[0];
      this.setData({ cardnumpd: tmp1, cardsuitpd: tmp2 });
    }
  },

  /**
   * 选择器1
   */
  selector: function(event) {

    var numToChange = this.data.nowChange;
    this.changeCardShow(numToChange);
    
    this.setData({selectpagehide : true});
  },

  /**
   * 扑克牌点击触发选择器
   */
  playCardevent: function (e) {
    var tmpid = e.currentTarget.id;
    console.log(e);
    console.log(e.currentTarget.class);
    var tmp = this.whichOneToChange(tmpid);
    this.setData({
      selectpagehide: !this.data.selectpagehide,
      nowChange: tmp,
    });
  },

  /**
   * 判断是哪张牌需要变字
   */
  whichOneToChange : function(inputId) {
    if(inputId[1] == 'u'){
      var tmp = 17 + parseInt(inputId[6]);
      return tmp;
    } else if (inputId[0] == 's'){
      var tmp = 10 * parseInt(inputId[6]) + parseInt(inputId[7]);
      return tmp;
    } else{
      var tmp1 = parseInt(inputId[1]);
      var tmp2 = parseInt(inputId[2]);
      return (tmp1-1) * 2 + tmp2 - 1;
    }
  },


})