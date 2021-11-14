function main() {
  const entrada = document.getElementById("entrada");
  a = tokenizer(entrada.textContent);
  
  let textA = '<div class="card-token-element"><p class="token-data">';
  let textB = '</p><p class="token-type-data">';
  let textC = '</p></div>';
  let completo = "";
  for(let i = 0; i<a.length; i++) {
    completo = completo + textA + a[i].token + textB + a[i].type + textC;
  }
  document.getElementById("tokenizer").innerHTML = completo;

  b = shuntingYard(a);

  let txtShunting = "";
  for(let i=0;i<b.length; i++) {
    txtShunting = txtShunting + b[i].token;
  }
  document.getElementById("shunting").innerHTML = txtShunting;

  
  res = evaluateExpression(b);
  let inputLabels = res[0];
  let outputLabels = res[1];
  let inputTable = res[2];
  let outputTable = res[3];

  headers = '';
  for(let i =0; i < inputLabels.length; i++) {
    headers = headers + "<th>" + inputLabels[i] + "</th>";
  }
  content = "";
  for(let i = 0; i<inputTable.length; i++) {
    content = content + "<tr>";
    for(let j=0; j<inputTable[i].length;j++) {
      content = content + "<td>" + inputTable[i][j] + "</td>";
    }
    content = content + "</tr>";
  }
  document.getElementById("inputs").innerHTML = headers + content;

  headers = '';
  for(let i =0; i < outputLabels.length; i++) {
    headers = headers + "<th>" + outputLabels[i] + "</th>";
  }
  content = "";
  for(let i = 0; i<outputTable.length; i++) {
    content = content + "<tr>";
    for(let j=0; j<outputTable[i].length;j++) {
      content = content + "<td>" + outputTable[i][j] + "</td>";
    }
    content = content + "</tr>";
  }
  document.getElementById("outputs").innerHTML = headers + content;
}
