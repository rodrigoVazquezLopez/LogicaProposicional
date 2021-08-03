

function btnA() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'A';
    } else {
        entrada.textContent = entrada.textContent + "A";
    }
};

function btnB() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'B';
    } else {
        entrada.textContent = entrada.textContent + "B";
    }
};

function btnC() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'C';
    } else {
        entrada.textContent = entrada.textContent + "C";
    }
};

function btnD() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'D';
    } else {
        entrada.textContent = entrada.textContent + "D";
    }
};

function btnE() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'E';
    } else {
        entrada.textContent = entrada.textContent + "E";
    }
};

function btnF() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'F';
    } else {
        entrada.textContent = entrada.textContent + "F";
    }
};


function btnW() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'W';
    } else {
        entrada.textContent = entrada.textContent + "W";
    }
};

function btnX() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'X';
    } else {
        entrada.textContent = entrada.textContent + "X";
    }
};

function btnY() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'Y';
    } else {
        entrada.textContent = entrada.textContent + "Y";
    }
};

function btnZ() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = 'Z';
    } else {
        entrada.textContent = entrada.textContent + "Z";
    }
};

// funciones de botones de operaciones

function btnOpNeg() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = '\u2310';
    } else {
        entrada.textContent = entrada.textContent + "\u2310";
    }
};

function btnOpDisy() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = '\u2228';
    } else {
        entrada.textContent = entrada.textContent + "\u2228";
    }
};

function btnOpConj() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = '\u2227';
    } else {
        entrada.textContent = entrada.textContent + "\u2227";
    }
};

function btnOpImp() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = '\u2B62';
    } else {
        entrada.textContent = entrada.textContent + "\u2B62";
    }
};

function btnOpBicond() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = '\u2B64';
    } else {
        entrada.textContent = entrada.textContent + "\u2B64";
    }
};

function btnOpDisyExc() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent == '0') {
        entrada.textContent = '\u2295';
    } else {
        entrada.textContent = entrada.textContent + "\u2295";
    }
};

// funciones 

function btnFunDEL() {
    const entrada = document.getElementById('entrada');
    if (entrada.textContent != '0') {
        if (entrada.textContent.length == 1) {
            entrada.textContent = '0';
        } else {
            entrada.textContent = entrada.textContent.slice(0, entrada.textContent.length - 1);
        }
    }
};

function btnFunAC() {
    const entrada = document.getElementById('entrada');
    entrada.textContent = '0';
}

