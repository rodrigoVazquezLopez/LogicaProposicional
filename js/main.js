function main() {
  const entrada = document.getElementById("entrada");
  a = tokenizer(entrada.textContent);
  b = shuntingYard(a);
  let index = 0;

  while (index < a.length) {
    alert(a[index].token + " " + a[index].type);
    index++;
  }
  let c = "";
  index = 0;
  while (index < b.length) {
    c = c + b[index].token;
    index++;
  }
  alert(c);
  res = evaluateExpression(b);
  index = 0;
  salida = '';
  while (index < res.length) {
    salida = salida + res[index] + '<br>';
    index++;
  }
  document.getElementById("salida").innerHTML = salida;
}
