

var poker = require("./poker.js");
var cardtype = require("./cardtype.js");



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
      pokerlist.list[i] = poker.Poker.createNew();
    }
    
    /**
     * 设置7张牌
     */
    pokerlist.setList = function(list1) {
      pokerlist.list = list1;
      pokerlist.CalculateCardType();
    }
    
    /**
     * 初始化牌型
     */
    pokerlist.cardType = cardtype.CardType.createNew();

    /**
     * 获取牌型
     */
    pokerlist.getCardType = function() {
      return pokerlist.cardType;
    }

    /**
     * 与另一个pokerlist比较牌型
     */
    pokerlist.isBiggerThan = function(another) {
      return pokerlist.getCardType().compareWithAnother(another.getCardType());
    }
    
    /**
     * 检查这个牌组有没有特定点数的牌
     */
    pokerlist.hasFigure = function(figure1) {
      for(var i = 0; i < pokerlist.list.length; i++) {
        if(pokerlist.list[i].getFigure() == figure)
           return true;
      }
      return false;
    }

    /**
     * 将牌分成四个花色的子序列，按方梅红黑顺序排列(虽然怎么排并没有影响)
     * 用于判断同花和同花顺
     */
    pokerlist.fourSubList = function() {
      var result = new Array();
      for (var i = 0; i < 4; i++) {
        var tmpArray = new Array();
        result.push(tmpArray);
      }
      for (var i = 0; i < pokerlist.list.length;i++) {
        var suit1 = pokerlist.list[i].getSuit();
        result[suit1].push(pokerlist.list[i]);
      }
      return result;
    }

    /**
     * 将牌分为13个点数的子序列
     * 用于判断四条葫芦和对子
     */
    pokerlist.figureSubList = function () {
      var result = new Array();
      for (var i = 0; i < 13; i++) {
        var tmpArray = new Array();
        result.push(tmpArray);
      }
      for (var i = 0; i < pokerlist.list.length; i++) {
        var figure1 = pokerlist.list[i].getFigure();
        result[figure1-1].push(pokerlist.list[i]);
      }
      return result;
    }

    /**
     * 判断一组扑克有没有包含这个点数
     */
    pokerlist.hasFigure = function(list1, figure1) {
      for (var i = 0; i < list1.length; i++) {
        if (list1[i].getFigure() == figure1)
          return true;
      }
      return false;
    }

    /**
     * 判断一组扑克有没有顺子
     * 并返回顺子的计算的点数(AKQJ10是A，12345是5),没有顺子则返回-1
     */
    pokerlist.hasStraight = function(list1) {
      if (list1.length < 5) return -1;
      if (pokerlist.hasFigure(list1, poker.pokerCanshu.ACE)) {
        if (pokerlist.hasFigure(list1, poker.pokerCanshu.KING))
          if (pokerlist.hasFigure(list1, poker.pokerCanshu.QUEEN))
            if (pokerlist.hasFigure(list1, poker.pokerCanshu.JACK))
              if (pokerlist.hasFigure(list1, poker.pokerCanshu.TEN))
                return 1;
      }
      for (var i = 13; i >= 5; i--) {
        var flag1 = true;
        for (var j = i; j > i - 5; j--) {
          if (!pokerlist.hasFigure(list1, j)) {
            flag1 = false;
            break;
          }
        }
        if (flag1)
          return i;
      }
      return -1;
    }

    
    /**
     * 判断牌型
     * 返回值为一个数组{type, 特征数组}。用于下一步构建牌型对象
     */
    pokerlist.CalculateCardType = function() {
      if(pokerlist.hasStraighFlush() != -1) {
        var tmpArray = [pokerlist.hasStraighFlush()];
        pokerlist.cardType.setCardType(8,tmpArray);
      } else if (pokerlist.hasFourOfAKind() != null) {
        pokerlist.cardType.setCardType(7, pokerlist.hasFourOfAKind());
      } else if (pokerlist.hasFullHouse() != null) {
        pokerlist.cardType.setCardType(6, pokerlist.hasFullHouse());
      } else if (pokerlist.hasFlush() != null) {
        pokerlist.cardType.setCardType(5, pokerlist.hasFlush());
      } else if (pokerlist.hasStraight(pokerlist.list) != -1) {
        pokerlist.cardType.setCardType(4, [pokerlist.hasStraight(pokerlist.list)]);
      } else if (pokerlist.hasThreeOfAKind() != null) {
        pokerlist.cardType.setCardType(3, pokerlist.hasThreeOfAKind());
      } else if (pokerlist.hasTwoPairs() != null) {
        pokerlist.cardType.setCardType(2, pokerlist.hasTwoPairs());
      } else if (pokerlist.hasOnePair() != null) {
        pokerlist.cardType.setCardType(1, pokerlist.hasOnePair());
      } else {
        pokerlist.cardType.setCardType(0, pokerlist.returnHighCard());
      }
      return;
    }

    /**
     * 判断是否同花顺
     * 并返回同花顺的比大小特征
     */
    pokerlist.hasStraighFlush = function() {
      var tmpArray = pokerlist.fourSubList();
      for(var i = 0; i < 4; i++) {
        var tmp = pokerlist.hasStraight(tmpArray[i]);
        if(tmp != -1) {
          return tmp;
        }
      }
      return -1;
    }

    /**
     * 判断是否有四条
     * 并返回四条的两个特征
     */
    pokerlist.hasFourOfAKind = function() {
      var tmpArray = pokerlist.figureSubList();
      var resultArray = new Array(2);
      if(tmpArray[0].length == 4) {
        resultArray[0] = 1;
        for(var i = 12; i >= 1; i--) {
          if(tmpArray[i].length != 0) {
            resultArray[1] = i+1;
            return resultArray;
          }
        }
      } else {
        for(var i = 12; i >= 1;i--) {
          if(tmpArray[i].length == 4) {
            resultArray[0] = i+1;
            if (tmpArray[0].length != 0) {
              resultArray[1] = 1;
              return resultArray;
            } else {
              for(var j = 12; j >= 1; j--) {
                if(j != resultArray[0] - 1 && tmpArray[j].length != 0) {
                  resultArray[1] = j+1;
                  return resultArray;
                }
              }
            }
          }
        }
        return null;
      }
    }

    /**
     * 判断有没有葫芦
     * 有则返回葫芦两个特征
     */
    pokerlist.hasFullHouse = function() {
      var tmpArray = pokerlist.figureSubList();
      var resultArray = new Array(2);
      if (tmpArray[0].length == 3) {
        resultArray[0] = 1;
        for (var i = 12; i >= 1; i--) {
          if (tmpArray[i].length >= 2) {
            resultArray[1] = i + 1;
            return resultArray;
          }
        }
        return null;
      } else {
        for (var i = 12; i >= 1; i--) {
          if (tmpArray[i].length == 3) {
            resultArray[0] = i + 1;
            if (tmpArray[0].length == 2) {
              resultArray[1] = 1;
              return resultArray;
            } else {
              for (var j = 12; j >= 1; j--) {
                if (j != resultArray[0] - 1 && tmpArray[j].length >= 2) {
                  resultArray[1] = j + 1;
                  return resultArray;
                }
              }
              return null;
            }
          }
        }
        return null;
      }
    }

    /**
     * 判断有没有同花
     * 有的话返回同花的五个特征
     */
    pokerlist.hasFlush = function() {
      var tmpArray = pokerlist.fourSubList();
      for(var i = 0; i < 4; i++) {
        if(tmpArray[i].length >= 5) {
          var tmp = tmpArray[i];
          var resultArray = new Array();
          var flag1 = 5;
          if (pokerlist.hasFigure(tmp, 1)) {
            flag1--;
            resultArray.push(1);
          }
          for(var j = 13; j > 1 && flag1 > 0; j--) {
            if(pokerlist.hasFigure(tmp,j)) {
              flag1--;
              resultArray.push(j);
            }
          }
          return resultArray;
        }
      }
      return null;
    }

    /**
     * 判断有没有三条
     * 有的话返回三条的三个特征
     */
    pokerlist.hasThreeOfAKind = function() {
      var tmpArray = pokerlist.figureSubList();
      var resultArray = new Array(3);
      if (tmpArray[0].length == 3) {
        resultArray[0] = 1;
        var numb = 1;
        for (var i = 12; i >= 1 && numb <= 2; i--) {
          if (tmpArray[i].length != 0) {
            resultArray[numb] = i + 1;
            numb++;
          }
        }
        return resultArray;
      } else {
        for (var i = 12; i >= 1; i--) {
          if (tmpArray[i].length == 3) {
            resultArray[0] = i + 1;
            var numb = 1;
            if (tmpArray[0].length >= 0) {
              resultArray[numb] = 1;
              numb++;
            }
            for (var j = 12; j >= 1 && numb <= 2; j--) {
              if (j != resultArray[0] - 1 && tmpArray[j].length >= 1) {
                resultArray[numb] = j + 1;
                numb++;
              }
            }
            return resultArray;
          }
        }
        return null;
      }
    }

    /**
     * 判断有没有两对
     * 有的话返回两对的三个特征
     */
    pokerlist.hasTwoPairs = function() {
      var tmpArray = pokerlist.figureSubList();
      var resultArray = new Array(3);
      if (tmpArray[0].length == 2) {
        resultArray[0] = 1;
        var flag1 = false;
        for (var i = 12; i >= 1; i--) {
          if (tmpArray[i].length == 2) {
            resultArray[1] = i + 1;
            flag1 = true;
            break;
          }
        }
        if(!flag1)
          return null;
        for(var i = 12; i >= 1; i--) {
          if (i != resultArray[1] - 1 && tmpArray[i].length > 0) {
            resultArray[2] = i + 1;
            return resultArray;
          }
        }
        return null;
      } else {
        for (var i = 12; i >= 1; i--) {
          if (tmpArray[i].length == 2) {
            resultArray[0] = i + 1;
            var flag1 = false;
            for (var j = i - 1; j >= 1; j--) {
              if (tmpArray[j].length == 2) {
                resultArray[1] = j + 1;
                flag1 = true;
                break;
              }
            }
            if (!flag1)
              return null;
            if(tmpArray[0].length ==1) {
              resultArray[2] = 1;
              return resultArray;
            }
            for (var j = 12; j >= 1; j--) {
              if (j != resultArray[1] - 1 && j != resultArray[0] - 1 && tmpArray[j].length > 0) {
                resultArray[2] = j + 1;
                return resultArray;
              }
            }
          }
        }
        return null;
      }
    }

    /**
     * 判断是否有一对
     * 有的话返回一对的四个特征
     */
    pokerlist.hasOnePair = function () {
      var tmpArray = pokerlist.figureSubList();
      var resultArray = new Array(4);
      if (tmpArray[0].length == 2) {
        resultArray[0] = 1;
        var numb = 1;
        for (var i = 12; i >= 1 && numb <= 3; i--) {
          if (tmpArray[i].length == 1) {
            resultArray[numb] = i + 1;
            numb++;
          }
        }
        return resultArray;
      } else {
        for (var i = 12; i >= 1; i--) {
          if (tmpArray[i].length == 2) {
            resultArray[0] = i + 1;
            var numb = 1;
            if(tmpArray[0].length == 1) {
              resultArray[numb] = 1;
              numb++;
            }
            for(var j = 12; j >= 1 && numb <= 3; j--) {
              if (j != resultArray[0] - 1 && tmpArray[j].length > 0) {
                resultArray[numb] = j + 1;
                numb++;
              }
            }
            return resultArray;
          }
        }
        return null;
      }
    }

    /**
     * 返回高牌的五个特征(高牌不需要判断)
     */
    pokerlist.returnHighCard = function () {
      var tmpArray = pokerlist.figureSubList();
      var resultArray = new Array(5);
      var numb = 0;
      if (tmpArray[0].length == 1) {
        resultArray[numb] = 1;
        numb++;
      }
      for (var i = 12; i >= 1 && numb <= 4; i--) {
        if (tmpArray[i].length == 1) {
          resultArray[numb] = i + 1;
          numb++;
        }
      }
      return resultArray;
    }

    /**
     * 返回出构造好的对象
     */
    return pokerlist;
  }

}

/**
 * 传出参数
 */
module.exports = {
  PokerList: PokerList,
}