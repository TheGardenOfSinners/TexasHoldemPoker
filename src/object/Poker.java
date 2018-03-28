package Element;


public class Poker {
    private static final int NODATA = -1;

    /**
     * 扑克牌的花色:方片的数字编号
     */
    private static final int DIAMOND = 0;

    /**
     * 扑克牌的花色:草花的数字编号
     */
    private static final int CLUB = 1;
    
    /**
     * 扑克牌的花色:红心的数字编号
     */
    private static final int HEART = 2;

    /**
     * 扑克牌的花色:黑桃的数字编号
     */
    private static final int SPADE = 3;

    /**
     * 扑克牌的点数:A的数字编号
     */
    private static final int ACE = 1;

    /**
     * 扑克牌的点数:2的数字编号
     */
    private static final int TWO = 2;

    /**
     * 扑克牌的点数:3的数字编号
     */
    private static final int THREE =3;

    /**
     * 扑克牌的点数:4的数字编号
     */
    private static final int FOUR = 4;

    /**
     * 扑克牌的点数:5的数字编号
     */
    private static final int FIVE = 5;

    /**
     * 扑克牌的点数:6的数字编号
     */
    private static final int SIX = 6;

    /**
     * 扑克牌的点数:7的数字编号
     */
    private static final int SEVEN = 7;

    /**
     * 扑克牌的点数:8的数字编号
     */
    private static final int EIGHT = 8;

    /**
     * 扑克牌的点数:9的数字编号
     */
    private static final int NINE =9;

    /**
     * 扑克牌的点数:10的数字编号
     */
    private static final int TEN = 10;

    /**
     * 扑克牌的点数:J的数字编号
     */
    private static final int JACK = 11;

    /**
     * 扑克牌的点数:Q的数字编号
     */
    private static final int QUEEN = 12;

    /**
     * 扑克牌的点数:K的数字编号
     */
    private static final int KING = 13;

    /**
     * 扑克牌的点数数字编号对应的字符串名称
     */
    private final static String[] figureNameArray = new String[]
    {

    	"A","2","3","4","5","6","7","8","9","10","J","Q","K"

    };

    /**
     * 扑克牌的花色数字编号对应的字符串名称
     */
    private final static String[] suitNameArray = new String[]
    {

    	"◆", "♣", "♥", "♠"

    };

    /**
     * 该张扑克牌的花色属性
     */
    private int suit;

    /**
     * 该张扑克牌的点数属性
     */
    private int figure;

    /**
     * 该张扑克牌在一副52张扑克牌中的编号，
     * 其中排序方法为方片(A->K)->草花(A->K)->红心(A->K)->黑桃(A->K)
     * 编号从0开始到51
     */
    private int number;

    /**
     * Poker类的默认构造函数
     * 构造出一个空的poker类，花色属性，点数属性，编号属性全部设为-1
     */
    public Poker() {
		suit = NODATA；
		figure = NODATA；
		number = NODATA；
    }

    /**
     * Poker类的构造函数，通过花色和点数构造
     * @param  inputSuit   输入的花色
     * @param  inputFigure 输入的点数
     */
    public Poker(int inputSuit, int inputFigure) {
    	suit = inputSuit;
    	figure = inputFigure;
    	number = inputSuit * KING + inputFigure - ACE;
    }

    /**
     * Poker类的构造函数，通过编号构造
     * @param  inputNumber 输入的编号
     */
    public Poker(int inputNumber) {
    	number = inputNumber;
    	suit = inputNumber / KING;
    	figure = inputNumber % KING + ACE;
    }

    /**
     * 获取该张poker的花色
     * @return 该张poker的花色数字编号
     */
    public int getSuit() {
    	return suit;
    }

    /**
     * 获取该张poker的点数
     * @return 该张扑克点数的数字编号
     */
    public int getFigure() {
    	return figure;
    }

    /**
     * 获取该张poker在52张扑克牌中的编号
     * @return 该张扑克的数字编号
     */
    public int getNumber() {
    	return number;
    }

    /**
     * 获取花色的字符串形式
     * @return 花色的字符串形式:"◆", "♣", "♥", "♠"中的一种
     */
    public String getSuitSymbol() {
    	return suitNameArray[suit];
    }

    /**
     * 获取该点数的字符串形式
     * @return 点数的字符串形式，如: "A","3","K","10"等
     */
    public String getNumberSymbol() {
    	return figureNameArray[figure-ACE];
    }

    /**
     * 返回该张扑克牌的字符串名称
     * @return 该张扑克牌的字符串名称，如: "◆A","♥10"等
     */
    public String toString() {
    	return getSuitSymbol() + getfigureSymbol();
    }
}
