

var poker = require("./poker.js");



/**
 * 封装的一个类
 * 手牌与公共牌加起来用于计算牌型的七张牌
 */
var PokerList = {
  createNew : function() {
    var pokerlist = {};
    
    /**
     * 初始化牌数组
     */
    pokerlist.list = new Array(7);
    for (var i = 0; i < pokerlist.list.length;i++) {
      list[i] = poker.Poker.createNew();
    }
    
    /**
     * 设置7张牌
     */
    pokerlist.setList = function(list1) {
      pokerlist.list = list1;
    }
    
    /**
     * 初始化牌型
     */
    pokerlist.cardType = -1;
    
    /**
     * 检查这个牌组有没有特定点数的牌
     */
    pokerlist.hasFigure = function(figure1) {
      for(var i = 0; i < list.length; i++) {
        if(list[i].getFigure() == figure)
           return true;
      }
      return false;
    }
    /**
     * 将牌分成四个花色的子序列，按方梅红黑顺序排列(虽然怎么排并没有影响)
     */
    pokerlist.fourSubList = function() {
      var diamondList = new Array();
      var result = new Array(diamondList, diamondList, diamondList, diamondList)
      for (var i = 0; i < pokerlist.list.length;i++) {
        var suit1 = list[i].getSuit();
        result[suit1].push(list[i]);
      }
      return result;
    }
    pokerlist.hasStraight = function(list1) {
      if(list1.length < 5)
        return false;
      
    }

    return pokerlist;
  },

  /**
   * 判断一组扑克有没有包含这个点数
   */
  hasFigure : function(list1, figure1) {
    for (var i = 0; i < list1.length; i++) {
      if (list1[i].getFigure() == figure1)
        return true;
    }
    return false;
  },

  /**
   * 判断一组扑克有没有顺子
   */
  hasStraight : function(list1) {

  }

}