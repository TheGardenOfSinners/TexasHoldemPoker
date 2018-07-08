
/**
 * 扑克花色和点数对应的字符表和数字编号表
 */
const pokerCanshu = {
  NODATA : -1,

  /**
   * 扑克牌的花色:方片的数字编号
   */
  DIAMOND : 0,

  /**
   * 扑克牌的花色:草花的数字编号
   */
  CLUB : 1,
    
  /**
   * 扑克牌的花色:红心的数字编号
   */
  HEART : 2,

  /**
   * 扑克牌的花色:黑桃的数字编号
   */
  SPADE : 3,

  /**
   * 扑克牌的点数:A的数字编号
   */
  ACE : 1,

  /**
   * 扑克牌的点数:2的数字编号
   */
  TWO : 2,

  /**
   * 扑克牌的点数:3的数字编号
   */
  THREE :3,

  /**
   * 扑克牌的点数:4的数字编号
   */
  FOUR : 4,

  /**
   * 扑克牌的点数:5的数字编号
   */
  FIVE : 5,

  /**
   * 扑克牌的点数:6的数字编号
   */
  SIX : 6,

  /**
   * 扑克牌的点数:7的数字编号
   */
  SEVEN : 7,

  /**
   * 扑克牌的点数:8的数字编号
   */
  EIGHT : 8,

  /**
   * 扑克牌的点数:9的数字编号
   */
  NINE : 9,

  /**
   * 扑克牌的点数:10的数字编号
   */
  TEN : 10,

  /**
   * 扑克牌的点数:J的数字编号
   */
  JACK : 11,

  /**
   * 扑克牌的点数:Q的数字编号
   */
  QUEEN : 12,

  /**
   * 扑克牌的点数:K的数字编号
   */
  KING : 13,

  /**
   * 扑克点数对应的字符编号
   */
  figureNameArray : ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],

  /**
   * 扑克花色对应的字符编码
   */
  suitNameArray: ["♦", "♣", "♥", "♠"],

  /**
   * 扑克编号对应的点数字符
   */
  figureNameArrayByNum : [
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
  ],

  /**
   * 扑克编号对应的花色字符
   */
  suitNameArrayByNum: [
    "♦", "♦", "♦", "♦", "♦", "♦", "♦", "♦", "♦", "♦", "♦", "♦", "♦",
    "♣", "♣", "♣", "♣", "♣", "♣", "♣", "♣", "♣", "♣", "♣", "♣", "♣",
    "♥", "♥", "♥", "♥", "♥", "♥", "♥", "♥", "♥", "♥", "♥", "♥", "♥",
    "♠", "♠", "♠", "♠", "♠", "♠", "♠", "♠", "♠", "♠", "♠", "♠", "♠"
  ],
}


/**
 * 封装的一个类
 * 扑克类
 */
var Poker = {
  createNew: function () {
  　var poker = {};

    /**
     * 扑克的花色初始化为空
     */       
    poker.suit = pokerCanshu.NODATA;

    /**
     * 扑克的点数初始化为空
     */
    poker.figure = pokerCanshu.NODATA;

    /**
     * 设置花色
     */
    poker.setSuit = function (suit1) {
      poker.suit = suit1;
    }

    /**
     * 设置点数
     */
    poker.setFigure = function (figure1) {
      poker.figure = figure1;
    }
    
    /**
     * 通过编号设置点数和花色
     */
    poker.setByNum = function (num1) {
      poker.suit = parseInt(num1 / 13);
      poker.figure = num1 % 13 + 1;
    }

    /**
     * 获取花色
     */
    poker.getSuit = function () {
      return poker.suit;
    }

    /**
     * 获取点数
     */
    poker.getFigure = function () {
      return poker.figure;
    }

    /**
     * 获取在52张牌中的编号
     */
    poker.getNum = function() {
      return poker.suit * 13 + poker.figure - 1;
    }

    /**
     * 判断次类是否为空
     */
    poker.isEmpty = function () {
      if(poker.suit == -1)
        return true;
      else if (poker.figure == -1)
        return true;
      else
        return false;
    }

    /**
     * 获取花色的字符
     */
    poker.suitToString = function () {
      return pokerCanshu.suitNameArray[poker.suit];
    }

    /**
     * 获取点数的字符
     */
    poker.figureToString = function () {
      return pokerCanshu.figureNameArray[poker.figure - 1];
    }
    
    /**
     * 获取字符型式
     */
    poker.toString = function() {
      return poker.suitToString() + poker.figureToString();
    }

    /**
     * 清空此牌
     */
    poker.clearItself = function() {
      poker.suit = pokerCanshu.NODATA;
      poker.figure = pokerCanshu.NODATA;
    }

    /**
     * 返回出构造好的对象
     */
    return poker;
  }
};

/**
 * 传出参数
 */
module.exports = {
  Poker: Poker,
  pokerCanshu: pokerCanshu,
}