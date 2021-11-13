function btnA() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "A";
  } else {
    entrada.textContent = entrada.textContent + "A";
  }
}

function btnB() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "B";
  } else {
    entrada.textContent = entrada.textContent + "B";
  }
}

function btnC() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "C";
  } else {
    entrada.textContent = entrada.textContent + "C";
  }
}

function btnD() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "D";
  } else {
    entrada.textContent = entrada.textContent + "D";
  }
}

function btnE() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "E";
  } else {
    entrada.textContent = entrada.textContent + "E";
  }
}

function btnF() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "F";
  } else {
    entrada.textContent = entrada.textContent + "F";
  }
}

function btnG() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "G";
  } else {
    entrada.textContent = entrada.textContent + "G";
  }
}

function btnH() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "H";
  } else {
    entrada.textContent = entrada.textContent + "H";
  }
}

function btnI() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "I";
  } else {
    entrada.textContent = entrada.textContent + "I";
  }
}

// funciones de botones de operaciones

function btnOpNeg() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = charOpNeg;
  } else {
    entrada.textContent = entrada.textContent + charOpNeg;
  }
}

function btnOpDisy() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = charOpDisy;
  } else {
    entrada.textContent = entrada.textContent + charOpDisy;
  }
}

function btnOpConj() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = charOpConj;
  } else {
    entrada.textContent = entrada.textContent + charOpConj;
  }
}

function btnOpImp() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = charOpImp;
  } else {
    entrada.textContent = entrada.textContent + charOpImp;
  }
}

function btnOpBicond() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = charOpBicond;
  } else {
    entrada.textContent = entrada.textContent + charOpBicond;
  }
}

function btnOpDisyExc() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = charOpDisyExc;
  } else {
    entrada.textContent = entrada.textContent + charOpDisyExc;
  }
}

function btnOpLeftPar() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = "(";
  } else {
    entrada.textContent = entrada.textContent + "(";
  }
}

function btnOpRightPar() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent == "0") {
    entrada.textContent = ")";
  } else {
    entrada.textContent = entrada.textContent + ")";
  }
}

// funciones

function btnFunDEL() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent != "0") {
    if (entrada.textContent.length == 1) {
      entrada.textContent = "0";
    } else {
      entrada.textContent = entrada.textContent.slice(
        0,
        entrada.textContent.length - 1
      );
    }
  }
}

function btnFunAC() {
  const entrada = document.getElementById("entrada");
  entrada.textContent = "0";
}

function btnFunRES() {}
