var output = "";
var flag = 0;

function tryi() {
     alert("Result:" + eval(prompt("Enter an expression:","")));
}

function Routput() {
    document.getElementById("input-box").value = output;
}

function aaa(a) {
    if (flag === 1) {
        output = "";
        flag = 0;
    }
    if (a == 'CE') output = "";
    else if (a == 'tui') {
        var newoutput = output.substr(0, output.length - 1);
        output = newoutput;
    }
    else if (a == '='){
        var string1 = "";
        try {
            var string = "string1 = " + output;
            eval(string);
            output = string1;
            flag = 1;
            if (isNaN(output)) {
                alert("YOU ENTER WRONG !!");
                output = "";
                flag = 0;
            }
            else if (!isFinite(output)) {
                alert("Infinity !!");
                output = "";
                flag = 0;
            }
        }
        catch (err) {
            alert("YOU ENTER WRONG !!");
            output = "";
            flag = 0;
        }
        
    }
    else output += a;    
    Routput();
}
