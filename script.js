const form = document.querySelector("form");
const respostaPre = document.querySelector("pre");
const carros = [];

//evento para o submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const modelo = form.inModelo.value;
  const preco = Number(form.inPreco.value);

  if (isNaN(preco)) {
    alert("Campo Preço só recebe Numeros!!");
    form.inPreco.value = "";
    form.inPreco.focus();
    return;
  }

  carros.push({ modelo, preco });
  form.inModelo.value = "";
  form.inPreco.value = "";
  form.inModelo.focus();
});

//evento para botão listar
form.btnListar.addEventListener("click", () => {
  if (carros.length == 0) {
    alert("Lista de Carros Vazia, Inclua Carros na Lista!!");
    inModelo.focus();
    return;
  }

  const listaCarros = carros.reduce(
    (acc, carro) =>
      acc + carro.modelo + " - R$ " + carro.preco.toFixed(2) + "\n",
    ""
  );

  respostaPre.innerText = `Carros Disponíveis Para Venda\n ${"-".repeat(
    48
  )}\n${listaCarros}\n`;

  inModelo.focus();
});

//evento para o botão filtrar
form.btnFiltrar.addEventListener("click", () => {
  const valorMaximo = Number(prompt("Valor Máximo Que Deseja Filtrar??"));

  if (valorMaximo == 0) {
    alert("Atenção!!...Somente Valores Maiores Que Zero!!");
    inModelo.focus();
    return;
  } else if (isNaN(valorMaximo)) {
    alert("Atenção!!...Somente Numeros Nesse Campo");
    inModelo.focus();
    return;
  }

  const carroFiltro = carros.filter((carro) => carro.preco <= valorMaximo);

  if (carroFiltro.length == 0) {
    alert("Não Existe Veiculos na Faixa de Preço Desejada!!");
    inModelo.focus();
    return;
  }

  let listaFiltro = "";

  listaFiltro = carroFiltro.reduce(
    (acc, carro) =>
      acc + carro.modelo + " - R$ " + carro.preco.toFixed(2) + "\n",
    ""
  );

  respostaPre.innerText = `Carros Disponíveis no valor Máximo de R$${valorMaximo.toFixed(
    2
  )}\n ${"-".repeat(80)}\n${listaFiltro}\n`;

  inModelo.focus();
});

//evento botão simular
form.btnPromo.addEventListener("click", () => {
  const desconto = Number(prompt("Informe o Percentual(%) do Desconto!!"));

  if (desconto == 0) {
    alert("Atenção!!...Informe um Valor de Desconto Maior que Zero!!");
    inModelo.focus();
    return;
  } else if (isNaN(desconto)) {
    alert("Atenção!!...Somente Numeros Nesse Campo!!");
    inModelo.focus();
    return;
  }

  const valorComDesconto = carros.map((aux) => ({
    modelo: aux.modelo,
    preco: aux.preco - (aux.preco * desconto) / 100
  }));

  let listaDesconto = valorComDesconto.reduce(
    (acc, carro) =>
      acc + carro.modelo + " - R$ " + carro.preco.toFixed(2) + "\n",
    ""
  );

  respostaPre.innerText = `Desconto Promocional de ${desconto}%\n ${"-".repeat(
    48
  )}\n${listaDesconto}\n`;

  inModelo.focus();
});
