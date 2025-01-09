function abrirModal() {
  document.getElementById('modal-content').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal-content').style.display = 'none';
}

function enviar(event) {
  event.preventDefault();

  const formNfs = document.getElementById('form-nfs');
  const formInputs = formNfs.querySelectorAll('input');

  const dict = new Map();


  formInputs.forEach(input => {
      if (input.name === 'itens-vendidos') {
          dict.set(input.name, input.value.trim()); 
      } else {
          const valor = parseFloat(input.value.replace(',', '.')) || 0; 
          dict.set(input.name, valor);
      }
  });

  const valorVenda = dict.get('valor-venda');


  if (!valorVenda || isNaN(valorVenda)) {
      alert("Por favor, preencha corretamente o campo 'Valor da Venda'.");
      return;
  }


  function calculoImposto(impostoPercentual) {
      return (impostoPercentual / 100) * valorVenda;
  }


  const resultadosMap = new Map();
  let somaImpostos = 0;

  dict.forEach((valor, chave) => {
      if (chave !== 'valor-venda' && chave !== 'itens-vendidos') {
          const impostoCalculado = calculoImposto(valor);
          resultadosMap.set(chave, impostoCalculado);
          somaImpostos += impostoCalculado;
      }
  });


  const valorLiquido = valorVenda - somaImpostos;


  const nfsEDiv = document.getElementById('nfs-e');
  nfsEDiv.innerHTML = `
      <p><strong>Itens Vendidos:</strong> ${dict.get('itens-vendidos') || 'Não informado'}</p>
      <p><strong>Valor da Venda:</strong> R$ ${valorVenda.toFixed(2).replace('.', ',')}</p>
      <p><strong>Total de Impostos:</strong> R$ ${somaImpostos.toFixed(2).replace('.', ',')}</p>
      <p><strong>Valor Líquido:</strong> R$ ${valorLiquido.toFixed(2).replace('.', ',')}</p>
      <h4>Detalhamento dos Impostos:</h4>
      <ul>
          ${Array.from(resultadosMap)
              .map(
                  ([chave, valor]) =>
                      `<li>${chave.toUpperCase()}: R$ ${valor.toFixed(2).replace('.', ',')}</li>`
              )
              .join('')}
      </ul>
  `;

  abrirModal();
}

