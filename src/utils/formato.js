// 2720.5 -> "R$ 2.720,50"
export function formatarReais(valor) {
  const [inteiro, centavos] = Number(valor || 0).toFixed(2).split('.');
  const comPontos = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${comPontos},${centavos}`;
}

// "1.234,56" ou "12.50" ou "80" -> número
export function textoParaNumero(texto) {
  const limpo = String(texto).trim();
  if (limpo.includes(',')) {
    return Number(limpo.replace(/\./g, '').replace(',', '.'));
  }
  return Number(limpo);
}
