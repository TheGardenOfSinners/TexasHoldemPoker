/**
 * 封装的一个类
 * 你的最终牌型类，拥有比大小等功能
 */
var CardType = {
  createNew : function() {
    var cardtype = {};

    /**
     * 初始化牌型类
     * 包括两个参数的初始化，第一个是牌型，共九种，从小到大编号为1-9
     * 第二个是此牌形的特征数组，各种牌型长度各不相同，用于同种牌型比较大小
     */
    cardtype.level = -1;
    cardtype.feature = [];
    
    /**
     * 返回牌型
     */
    cardtype.getLevel = function() {
      return cardtype.level;
    }
    
    /**
     * 返回特征数组
     */
    cardtype.getFeature = function() {
      return cardtype.feature;
    }

    /**
     * 设置这个类
     */
    cardtype.setCardType = function(level1, feature1) {
      cardtype.level = level1;
      cardtype.feature = feature1;
    }

    /**
     * 单张牌的比较规则
     * A>K>Q>...>2
     * 第一张牌大返回1，一样大返回0，第二张牌大返回-1
     */
    cardtype.singleCompare = function(num1,num2) {
      var tmp1 = (num1 + 11) % 13;
      var tmp2 = (num2 + 11) % 13;
      if(tmp1 > tmp2)return 1;
      if(tmp1 == tmp2)return 0;
      if(tmp1 < tmp2)return -1;
    }

    /**
     * 与另一个牌型对象比较大小
     * 本对象大返回1，一样大返回0，另一个打返回-1
     */
    cardtype.compareWithAnother = function(object1) {
      var l1 = cardtype.getLevel(), l2 = object1.getLevel();
      var f1 = cardtype.getFeature(), f2 = object1.getFeature();
      if(l1 > l2) return 1;
      if(l1 < l2) return -1;
      for(var i = 0; i < f1.length; i++) {
        var tmp = cardtype.singleCompare(f1[i],f2[i]);
        if (tmp != 0) return tmp;
      }
      return 0;
    }

    /**
     * 返回封装的对象
     */
    return cardtype;

  }
}


/**
 * 传出参数
 */
module.exports = {
  CardType: CardType,
}