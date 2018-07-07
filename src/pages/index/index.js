const app = getApp();
var poker = require("../../objects/poker.js");
var pokerpool = require("../../objects/pokerpool.js");

var poker = require("../../objects/poker.js");
var pokerpool = require("../../objects/pokerpool.js");
var cardtype = require("../../objects/cardtype.js");
var pokerlist = require("../../objects/pokerlist.js");
var player = require("../../objects/player.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initialData();
    this.initialObject();
//    this.testForUs();
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
   * 供开发人员使用的测试类
   */
  testForUs : function() {
    
    this.dealer.popCardByNum(0);
    this.publicCardInPage[0].setByNum(0);
    console.log(this.publicCardInPage[0].toString());
    
    this.dealer.popCardByNum(12);
    this.publicCardInPage[1].setByNum(12);
    console.log(this.publicCardInPage[1].toString());

    this.dealer.popCardByNum(11);
    this.publicCardInPage[2].setByNum(11);
    console.log(this.publicCardInPage[2].toString());
    
    this.dealer.popCardByNum(10);
    this.publicCardInPage[3].setByNum(10);
    console.log(this.publicCardInPage[3].toString());

    this.dealer.popCardByNum(9);
    this.publicCardInPage[4].setByNum(9);
    console.log(this.publicCardInPage[4].toString());

    this.allPlayerArray[0].setHand(3,0);
    this.allPlayerArray[0].setHand(1,1);
    this.dealer.popCardByNum(3);
    this.dealer.popCardByNum(1);
    console.log(this.allPlayerArray[0].getHand(0).toString());
    console.log(this.allPlayerArray[0].getHand(1).toString());
    this.allPlayerArray[1].setHand(7, 0);
    this.allPlayerArray[1].setHand(20, 1);
    this.dealer.popCardByNum(7);
    this.dealer.popCardByNum(20);
    console.log(this.allPlayerArray[1].getHand(0).toString());
    console.log(this.allPlayerArray[1].getHand(1).toString());
    var totalTimes = this.counterTimeWhen5([0, 1], this.publicCardInPage, 0);
    console.log(totalTimes);
    console.log(this.allPlayerArray[0].getWinCount());
    console.log(this.allPlayerArray[1].getWinCount());
    console.log(this.allPlayerArray[0]);
    console.log(this.allPlayerArray[1]);
  },

  /**
   * 这个程序的发牌员卡池
   * 是pokerpool类
   */
  dealer : {},

  /**
   * 九个玩家的类
   */
  allPlayerArray : [],

  /**
   * 公共牌已定义张数
   */
  alreadyPublicCard : 0,

  /**
   * 五张公共牌的类
   */
  publicCardInPage : [],
  
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
    var tmpArray3 = new Array(5);
    for(var i = 0; i < 5; i++) {
      tmpArray3[i] = "poker";
    }
    var tmpArray4 = new Array(9);
    for(var i = 0; i < 9; i++) {
      tmpArray4[i] = ["poker leftp", "poker rightp"];
    }
    this.setData({
      cardnumplay: tmpArray1,
      cardsuitplay: tmpArray2,
      cardnumpd: [" ", " ", " ", " ", " "],
      cardsuitpd: [" ", " ", " ", " ", " "],
      nowChange : -1,
      calculateHidden: true,
      selectpagehide : true,
      pokerstylepd :tmpArray3,
      pokerstyleplay : tmpArray4,
      winRateForPlayers: [
        "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%"
      ],
      randomcard: false,
    });
  },
  
  /**
   * 初始化用于计算的页面类
   */
  initialObject : function() {
    this.dealer = pokerpool.PokerPool.createNew();
    for(var i = 0;i < 9; i++) {
      this.allPlayerArray[i] = player.Player.createNew();
      if(i < 5)
        this.publicCardInPage[i] = poker.Poker.createNew();
    }
    this.alreadyPublicCard = 0;
  },
  
  /**
   * 计算各个玩家的胜率
   */
  calculateAllPlayerRate: function() {
    var participant = new Array();
    for(var i = 0; i < 9; i++) {
      this.allPlayerArray[i].refleshWinCount();
      if (this.allPlayerArray[i].isReady)
        participant.push(i);
    }
    var totalTime = 0;
    switch (this.alreadyPublicCard) {
      case 3:
        this.showLoading();
        totalTime = this.counterTimeWhen3(participant, this.publicCardInPage, 0);
        this.cancelLoading();
        break;
      case 4:
        this.showLoading();
        totalTime = this.counterTimeWhen4(participant, this.publicCardInPage, 0);
        this.cancelLoading();
        break;
      case 5:
        this.showLoading();
        totalTime = this.counterTimeWhen5(participant, this.publicCardInPage, 0);
        this.cancelLoading();
        break;
      default:
        ;
    }
    var winRateArray = new Array(9);
    for(var i = 0; i < 9; i++) {
      var tmpRate = this.allPlayerArray[i].getWinCount() / totalTime;
      this.allPlayerArray[i].setWinRate(tmpRate);
      var tmpRate1 = tmpRate * 100;
      winRateArray[i] = tmpRate1.toFixed(2) + "%";
    }
    this.setData({
      winRateForPlayers: winRateArray,
    });
  },

  /**
   * 未指定公共牌时的计数器
   */
  counterTimeWhen0: function (participant, inputPublic, startNum) {
    var total = 0;
    for (var i0 = startNum; i0 < 52; i0++) {
      if (this.dealer.CardIsAvailableByNum(i0)) {
        this.dealer.popCardByNum(i0);
        inputPublic[0].setByNum(i0);
        for (var i1 = i0+1; i1 < 52; i1++) {
          if (this.dealer.CardIsAvailableByNum(i1)) {
            this.dealer.popCardByNum(i1);
            inputPublic[1].setByNum(i1);
            for (var i2 = i1 + 1; i2 < 52; i2++) {
              if (this.dealer.CardIsAvailableByNum(i2)) {
                this.dealer.popCardByNum(i2);
                inputPublic[2].setByNum(i2);
                for (var i = i2 + 1; i < 52; i++) {
                  if (this.dealer.CardIsAvailableByNum(i)) {
                    this.dealer.popCardByNum(i);
                    inputPublic[3].setByNum(i);
                    for (var j = i + 1; j < 52; j++) {
                      if (this.dealer.CardIsAvailableByNum(j)) {
                        this.dealer.popCardByNum(j);
                        inputPublic[4].setByNum(j);
                        total += this.counterTimeWhen5(participant, inputPublic, j + 1);
                        inputPublic[4].clearItself();
                        this.dealer.recoveryCardByNum(j);
                      }
                    }
                    inputPublic[3].clearItself();
                    this.dealer.recoveryCardByNum(i);
                  }
                }
                inputPublic[2].clearItself();
                this.dealer.recoveryCardByNum(i2);
              }
            }
            inputPublic[1].clearItself();
            this.dealer.recoveryCardByNum(i1);
          }
        }

        inputPublic[0].clearItself();
        this.dealer.recoveryCardByNum(i0);
      }
    }
    return total;
  },


  /**
   * 一张公共牌时的计数器
   */
  counterTimeWhen1: function (participant, inputPublic, startNum) {
    var total = 0;
    for (var i1 = startNum; i1 < 52; i1++) {
      if (this.dealer.CardIsAvailableByNum(i1)) {
        this.dealer.popCardByNum(i1);
        inputPublic[1].setByNum(i1);
        for (var i2 = i1 + 1; i2 < 52; i2++) {
          if (this.dealer.CardIsAvailableByNum(i2)) {
            this.dealer.popCardByNum(i2);
            inputPublic[2].setByNum(i2);
            for (var i = i2 + 1; i < 52; i++) {
              if (this.dealer.CardIsAvailableByNum(i)) {
                this.dealer.popCardByNum(i);
                inputPublic[3].setByNum(i);
                for (var j = i + 1; j < 52; j++) {
                  if (this.dealer.CardIsAvailableByNum(j)) {
                    this.dealer.popCardByNum(j);
                    inputPublic[4].setByNum(j);
                    total += this.counterTimeWhen5(participant, inputPublic, j + 1);
                    inputPublic[4].clearItself();
                    this.dealer.recoveryCardByNum(j);
                  }
                }
                inputPublic[3].clearItself();
                this.dealer.recoveryCardByNum(i);
              }
            }
            inputPublic[2].clearItself();
            this.dealer.recoveryCardByNum(i2);
          }
        }
        inputPublic[1].clearItself();
        this.dealer.recoveryCardByNum(i1);
      }
    }
    return total;
  },

  /**
   * 两张公共牌时的计数器
   */
  counterTimeWhen2: function (participant, inputPublic, startNum) {
    var total = 0;
    for (var i2 = startNum; i2 < 52; i2++) {
      if (this.dealer.CardIsAvailableByNum(i2)) {
        this.dealer.popCardByNum(i2);
        inputPublic[2].setByNum(i2);
        for (var i = i2 + 1; i < 52; i++) {
          if (this.dealer.CardIsAvailableByNum(i)) {
            this.dealer.popCardByNum(i);
            inputPublic[3].setByNum(i);
            for (var j = i + 1; j < 52; j++) {
              if (this.dealer.CardIsAvailableByNum(j)) {
                this.dealer.popCardByNum(j);
                inputPublic[4].setByNum(j);
                total += this.counterTimeWhen5(participant, inputPublic, j + 1);
                inputPublic[4].clearItself();
                this.dealer.recoveryCardByNum(j);
              }
            }
            inputPublic[3].clearItself();
            this.dealer.recoveryCardByNum(i);
          }
        }
        inputPublic[2].clearItself();
        this.dealer.recoveryCardByNum(i2);
      }
    }
    return total;
  },

  /**
   * 指定了三张公共牌时的计数器
   */
  counterTimeWhen3: function (participant, inputPublic, startNum) {
    var total = 0;
    for (var i = startNum; i < 52; i++) {
      if (this.dealer.CardIsAvailableByNum(i)) {
        this.dealer.popCardByNum(i);
        inputPublic[3].setByNum(i);
        for(var j = i + 1; j < 52;j++) {
          if (this.dealer.CardIsAvailableByNum(j)) {
            this.dealer.popCardByNum(j);
            inputPublic[4].setByNum(j);
            total += this.counterTimeWhen5(participant, inputPublic, j + 1);
            inputPublic[4].clearItself();
            this.dealer.recoveryCardByNum(j);
          }
        }
        inputPublic[3].clearItself();
        this.dealer.recoveryCardByNum(i);
      }
    }
    return total;
  },

  /**
   * 指定了四张公共牌时的计数器
   */
  counterTimeWhen4: function (participant, inputPublic, startNum) {
    var total = 0;
    for (var i = startNum; i < 52; i++) {
      if (this.dealer.CardIsAvailableByNum(i)) {
        this.dealer.popCardByNum(i);
        inputPublic[4].setByNum(i);
        total += this.counterTimeWhen5(participant, inputPublic, i + 1);
        inputPublic[4].clearItself();
        this.dealer.recoveryCardByNum(i);
      }
    }
    return total;
  },

  /**
   * 指定了五张公共牌时的计数器
   */
  counterTimeWhen5: function (participant, inputPublic) {
    var nowPokerList = pokerlist.PokerList.createNew();
    var countTotal = 0;
    var tmpArray = this.allPlayerArray[participant[0]].getTwoCardWithArray().concat(inputPublic);
    var winArray = new Array();
    winArray.push(participant[0]);
    nowPokerList.setList(tmpArray);
    for(var i = 1; i < participant.length; i++) {
      var tmpList = pokerlist.PokerList.createNew();
      var tmpArray2 = this.allPlayerArray[participant[i]].getTwoCardWithArray().concat(inputPublic);
      tmpList.setList(tmpArray2);
      if (tmpList.isBiggerThan(nowPokerList) >= 0) {
        if (tmpList.isBiggerThan(nowPokerList) == 1) {
          winArray = new Array();
          nowPokerList = tmpList;
        }
        winArray.push(participant[i]);
      }
    }
    for (var j = 0; j < winArray.length; j++) {
      this.allPlayerArray[winArray[j]].oneMoreWin();
    }
    countTotal++;
    return countTotal;
  },

  /**
   * 改编扑克类
   * 传入参数为需要更改的那张牌的编号以及更改的目标
   */
  changeCardObject: function (num, cardNum) {

    if (num < 18) {
      var num1 = parseInt(num / 2), num2 = num % 2;
      if (this.allPlayerArray[num1].getHand(num2).isEmpty()) {
        this.dealer.popCardByNum(cardNum);
        this.allPlayerArray[num1].setHand(cardNum, num2);
      } else {
        var num3 = this.allPlayerArray[num1].getHand(num2).getNum();
        this.dealer.recoveryCardByNum(num3);
        this.dealer.popCardByNum(cardNum);
        this.allPlayerArray[num1].setHand(cardNum, num2);
      }

    } else {
      var tmp = num - 18;
      if (this.publicCardInPage[tmp].isEmpty()) {
        this.dealer.popCardByNum(cardNum);
        this.publicCardInPage[tmp].setByNum(cardNum);
        var i = 4
        for(i = 4; i >= 0;i--) {
          if(!this.publicCardInPage[i].isEmpty())
            break;
        }
        this.alreadyPublicCard = i+1;
        console.log(this.alreadyPublicCard);
      } else {//把新牌派发之前把旧牌回收
        var num3 = this.publicCardInPage[tmp].getNum();
        this.dealer.recoveryCardByNum(num3);
        this.dealer.popCardByNum(cardNum);
        this.publicCardInPage[tmp].setByNum(cardNum);
      }
    }
    this.readyToCalculate();
    this.canRandom();
  },


  /**
   * 改编扑克外表
   * 传入参数为需要更改的那张牌的编号以及更改的目标
   */
  changeCardShow: function(num, cardNum) {
    if (num < 18) {
      var tmp1 = this.data.cardnumplay, num1 = parseInt(num / 2), num2 = num % 2;
      tmp1[num1][num2] = poker.pokerCanshu.figureNameArrayByNum[cardNum];
      var tmp2 = this.data.cardsuitplay;
      tmp2[num1][num2] = poker.pokerCanshu.suitNameArrayByNum[cardNum];
      var tmp3 = this.data.pokerstyleplay;
      if (parseInt(cardNum / 13) == 2 || parseInt(cardNum / 13) == 0) {
        if (num2 == 0)
          tmp3[num1][num2] = "poker leftp red";
        else
          tmp3[num1][num2] = "poker rightp red";
      } else {
        if (num2 == 0)
          tmp3[num1][num2] = "poker leftp";
        else
          tmp3[num1][num2] = "poker rightp";
      }
      this.setData({ cardnumplay: tmp1, cardsuitplay: tmp2, pokerstyleplay: tmp3});
    } else {
      var tmp = num - 18;
      var tmp1 = this.data.cardnumpd;
      var tmp2 = this.data.cardsuitpd;
      tmp1[tmp] = poker.pokerCanshu.figureNameArrayByNum[cardNum];
      tmp2[tmp] = poker.pokerCanshu.suitNameArrayByNum[cardNum];
      var tmp3 = this.data.pokerstylepd;
      if (parseInt(cardNum / 13) == 2 || parseInt(cardNum / 13) == 0) {
        tmp3[tmp] = "poker red";
      } else {
        tmp3[tmp] = "poker";
      }
      this.setData({ cardnumpd: tmp1, cardsuitpd: tmp2, pokerstylepd: tmp3});
    }
  },

  /**
   * 置空一张卡牌
   * 置空按钮的点击事件
   */
  cleanACard: function () {
    var numToChange = this.data.nowChange;
    if(numToChange < 18) {
      var tmp1 = this.data.cardnumplay, num1 = parseInt(numToChange / 2), num2 = numToChange % 2;
      tmp1[num1][num2] = " ";
      var tmp2 = this.data.cardsuitplay;
      tmp2[num1][num2] = " ";
      this.setData({ cardnumplay: tmp1, cardsuitplay: tmp2 });
      if (!this.allPlayerArray[num1].getHand(num2).isEmpty()) {
        var tmpNum = this.allPlayerArray[num1].getHand(num2).getNum();
        this.dealer.recoveryCardByNum(tmpNum);
        this.allPlayerArray[num1].cleanHand(num2);
      }
      
    } else {
      var tmp = numToChange - 18;
      var tmp1 = this.data.cardnumpd;
      var tmp2 = this.data.cardsuitpd;
      tmp1[tmp] = " ";
      tmp2[tmp] = " ";
      this.setData({ cardnumpd: tmp1, cardsuitpd: tmp2 });
      if (!this.publicCardInPage[tmp].isEmpty()) {
        var tmpNum = this.publicCardInPage[tmp].getNum();
        this.dealer.recoveryCardByNum(tmpNum);
        this.publicCardInPage[tmp].clearItself();
        if (tmp == this.alreadyPublicCard - 1) {
          var i = 4
          for (i = 4; i >= 0; i--) {
            if (!this.publicCardInPage[i].isEmpty())
              break;
          }
          this.alreadyPublicCard = i + 1;
        }
        
      }
      
    }
    this.setData({
      selectpagehide: true,
      winRateForPlayers: [
        "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%"
      ],
    });
    this.readyToCalculate();
    this.canRandom();
  },

  /**
   * 返回主界面 不做任何选择
   * 返回的点击事件
   */
  goBackToIndex : function() {
    this.setData({ selectpagehide: true });
    this.readyToCalculate();
    this.canRandom();
  },

  /**
   * 选择器点击事件
   */
  selector: function(e) {
    var tmpId = e.currentTarget.id;
    var tmp = this.whichOneToChange(tmpId);
    if (this.dealer.CardIsAvailableByNum(tmp)) {
      var numToChange = this.data.nowChange;
      this.changeCardShow(numToChange, tmp);
      this.changeCardObject(numToChange, tmp);
      this.setData({
        selectpagehide: true,
        winRateForPlayers: [
          "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%"
        ],
      });
    }
  },

  /**
   * 扑克牌点击触发选择器
   */
  playCardevent: function (e) {
    var tmpid = e.currentTarget.id;
    var tmp = this.whichOneToChange(tmpid);
    if (tmp - 18 <= this.alreadyPublicCard) {//此部目的为 让公共牌按顺序指定，不可越过去
      this.setData({
        selectpagehide: !this.data.selectpagehide,
        nowChange: tmp,
      });
    }
    
  },

  /**
   * 判断是哪张牌需要变字
   */
  whichOneToChange : function(inputId) {
    if(inputId[1] == 'u'){
      var tmp = 17 + parseInt(inputId[6]);
      return tmp;
    } else if (inputId[0] == 's'){
      var tmp = parseInt(inputId.substring(6,inputId.length));
      return tmp;
    } else{
      var tmp1 = parseInt(inputId[1]);
      var tmp2 = parseInt(inputId[2]);
      return (tmp1-1) * 2 + tmp2 - 1;
    }
  },

  /**
   * 判断是否弹出计算选项
   */
  readyToCalculate : function() {
    var pdNum = this.alreadyPublicCard;
    if(pdNum >= 3) {
      for(var i = 0; i < pdNum;i++) {
        if (this.publicCardInPage[i].isEmpty()) {
          this.setData({calculateHidden: true,});
          return;
        }
      }
    } else {
      this.setData({ calculateHidden: true, });
      return;
    }
    for(var i = 0; i < 9; i++) {
      if (this.allPlayerArray[i].isOnlyOne()) {
        this.setData({ calculateHidden: true, });
        return;
      }
    }
    var num = 0;
    for(var i = 0;i < 9; i++) {
      if (this.allPlayerArray[i].isReady)
        num++;
    }
    if(num < 2) {
      this.setData({ calculateHidden: true, });
      return;
    }
    this.setData({ calculateHidden: false, });
  },

  /**
   * 判断是否开启随机发牌功能
   */
  canRandom: function() {
    var pdNum = this.alreadyPublicCard;
    if (pdNum < 5) {
      if(pdNum == 1 || pdNum == 2) {
        this.setData({ randomcard: true, });
        return;
      }
      for (var i = 0; i < pdNum; i++) {
        if (this.publicCardInPage[i].isEmpty()) {
          this.setData({ randomcard : true, });
          return;
        }
      }
    } else {
      this.setData({ randomcard: true, });
      return;
    }
    for (var i = 0; i < 9; i++) {
      if (this.allPlayerArray[i].isOnlyOne()) {
        this.setData({ randomcard: true, });
        return;
      }
    }
    this.setData({ randomcard:false, });
    return;
  },

  /**
   * 清空数据
   * 清空按钮的点击事件
   */
  clearAll : function() {
    this.initialData();
    this.initialObject();
  },

  /**
   * 随机发牌点击事件
   */
  randomNext: function() {
    var tmpArray1 = this.data.cardnumpd;
    var tmpArray2 = this.data.cardsuitpd;
    if (this.alreadyPublicCard == 0) {
      for(var i = 0; i < 3; i++) {
        var tmpNum = this.dealer.randomPopCard();
        this.publicCardInPage[i].setByNum(tmpNum);
        tmpArray2[i] = poker.pokerCanshu.suitNameArrayByNum[tmpNum];
        tmpArray1[i] = poker.pokerCanshu.figureNameArrayByNum[tmpNum];
        var tmp3 = this.data.pokerstylepd;
        if (parseInt(tmpNum / 13) == 2 || parseInt(tmpNum / 13) == 0) {
          tmp3[i] = "poker red";
        } else {
          tmp3[i] = "poker";
        }
      }
      this.setData({
        cardnumpd: tmpArray1,
        cardsuitpd: tmpArray2,
        winRateForPlayers: [
          "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%"
        ],
        pokerstylepd: tmp3,
      });
      this.alreadyPublicCard = 3;
    } else if (this.alreadyPublicCard == 3) {
      var tmpNum = this.dealer.randomPopCard();
      this.publicCardInPage[3].setByNum(tmpNum);
      tmpArray2[3] = poker.pokerCanshu.suitNameArrayByNum[tmpNum];
      tmpArray1[3] = poker.pokerCanshu.figureNameArrayByNum[tmpNum];
      var tmp3 = this.data.pokerstylepd;
      if (parseInt(tmpNum / 13) == 2 || parseInt(tmpNum / 13) == 0) {
        tmp3[3] = "poker red";
      } else {
        tmp3[3] = "poker";
      }
      this.setData({
        cardnumpd: tmpArray1,
        cardsuitpd: tmpArray2,
        winRateForPlayers: [
          "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%"
        ],
        pokerstylepd: tmp3,
      });
      this.alreadyPublicCard = 4;
    } else if (this.alreadyPublicCard == 4) {
      var tmpNum = this.dealer.randomPopCard();
      this.publicCardInPage[4].setByNum(tmpNum);
      tmpArray2[4] = poker.pokerCanshu.suitNameArrayByNum[tmpNum];
      tmpArray1[4] = poker.pokerCanshu.figureNameArrayByNum[tmpNum];
      var tmp3 = this.data.pokerstylepd;
      if (parseInt(tmpNum / 13) == 2 || parseInt(tmpNum / 13) == 0) {
        tmp3[4] = "poker red";
      } else {
        tmp3[4] = "poker";
      }
      this.setData({
        cardnumpd: tmpArray1,
        cardsuitpd: tmpArray2,
        winRateForPlayers: [
          "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%", "0.00%"
        ],
        pokerstylepd: tmp3,
      });
      this.alreadyPublicCard = 5;
    }
    this.canRandom();
    this.readyToCalculate();
  },
  
  /**
   * 出线loading标签
   */
  showLoading: function () {
    wx.showToast({
      title: '计算中',
      icon: 'loading',
      duration: 20000
    });
  },

  /**
   * 隐藏loading标签
   */
  cancelLoading: function () {
    wx.hideToast();
  }


})