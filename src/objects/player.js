var poker = require("./poker.js");
var pokerpool = require("./pokerpool.js");
var cardtype = require("./cardtype.js")
var pokerlist = require("./pokerlist.js")

var Player = {
  createNew : function() {
    var player = {};

    /**
     * 初始化player的数据
     * 包括：1.胜率 2.手牌1 3.手牌2 4.游戏状态 5.胜利计数
     */
    player.winRate = 0;
    player.hand1 = poker.Poker.createNew();
    player.hand2 = poker.Poker.createNew();
    player.isReady = false;
    player.count = 0;

    /**
     * 返回胜率
     */
    player.getWinRateWithPercent = function() {
      var result = player.winRate * 100;
      return result.toFixed(2);
    }

    /**
     * 返回手牌1
     */
    player.getHand1 = function() {
      return player.hand1;
    }

    /**
     * 返回手牌2
     */
    player.getHand2 = function() {
      return player.hand2;
    }

    /**
     * 以数组形式返回两张手牌
     */
    player.getTwoCardWithArray = function() {
      var result = new Array(2);
      result[0] = player.getHand1();
      result[1] = player.getHand2();
      return result;
    }

    /**
     * 返回胜利次数
     */
    player.getWinCount = function() {
      return count;
    }
    
    /**
     * 设置胜率
     */
    player.setWinRate = function(rate1) {
      player.winRate = rate1;
    }
    
    /**
     * 设置手牌1
     */
    player.setHand1 = function(num1) {
      player.hand1.setByNum(num1);
    }

    /**
     * 设置手牌2
     */
    player.setHand2 = function(num1) {
      player.hand2.setByNum(num1);
    }
    
    /**
     * 更新玩家的就绪状态
     */
    player.reflashReady = function() {
      if(!player.hand1.isEmpty() && !player.hand2.siEmpty()) {
        player.isReady = true;
      } else {
        player.isReady = false;
      }
    }

    /**
     * 清空所有参数
     */
    player.clearAllFeature = function() {
      player.winRate = 0;
      player.hand1 = poker.Poker.createNew();
      player.hand2 = poker.Poker.createNew();
      player.isReady = false;
      player.count = 0;
    }
    
    /**
     * 胜利一次计数增加。
     */
    player.oneMoreWin = function() {
      player.count = player.count + 1;
    }

    /**
     * 返回封装好的player类
     */
    return player;
  }
}


/**
 * 可传出参数
 */
module.exports = {
  Player: Player,
}
