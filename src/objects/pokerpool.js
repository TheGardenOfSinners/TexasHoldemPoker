

/**
 * 封装的一个类：
 * 发牌员的卡池类
 */
var PokerPool = {
  createNew : function (){
    var pokerPool = {};

    /**
     * 初始化卡池数组为空，即全部牌属于可发状态
     */
    pokerPool.pool = new Array(52);
    var i = 0;
    for (i = 0; i < 52;i++) {
      pokerPool.pool[i] = true;
    }

    /**
     * 发出某张牌(即此牌变为不可发状态)
     */
    pokerPool.popCardByNum = function(num1) {
      pokerPool.pool[num1] = false;
    }

    /**
     * 发出某张牌,输入为花色和点数
     */
    pokerPool.popCardBySF = function(suit1,figure1) {
      var tmp = suit1 * 13 + figure - 1;
      pokerPool.pool[tmp] = false;
    }

    /**
     * 回收某张牌
     */
    pokerPool.recoveryCardByNum = function(num1) {
      pokerPool.pool[num1] = true;
    }

    /**
     * 通过花色和点数回收某张牌
     */
    pokerPool.recoveryCardBySF = function (suit1, figure1) {
      var tmp = suit1 * 13 + figure - 1;
      pokerPool.pool[tmp] = true;
    }

    /**
     * 回收所有牌
     */
    pokerPool.recoveryAll = function() {
      var tmp = 0;
      for(tmp = 0;tmp < 52;tmp++) {
        pokerPool.pool[tmp] = true;
      }
    }

    /**
     * 随机发一张牌
     */
    pokerPool.randomPopCard = function() {
      var tmp = parseInt(52 * Math.random());
      while(!pokerPool.pool[tmp])
        tmp = parseInt(52 * Math.random());
      pokerPool.popCardByNum(tmp);
      var suit1 = Math.floor(tmp/13);
      var figure1 = tmp % 13 + 1;
      return [suit1, figure1];
    }

    /**
     * 测试此牌是否可发
     */
    pokerPool.CardIsAvailable = function(suit1,figure1) {
      var tmp = suit1 * 13 + figure - 1;
      return pokerPool.pool[tmp];
    }

    /**
     * 返回这个封装好的对象
     */
    return pokerPool;
  }
}

/**
 * 可传出参数
 */
module.exports = {
  PokerPool: PokerPool,
}