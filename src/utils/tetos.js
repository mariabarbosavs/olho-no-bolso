export const AREAS = [
  { id: 'necessidades', nome: 'Necessidades básicas' },
  { id: 'estilo', nome: 'Estilo de vida' },
  { id: 'futuro', nome: 'Construção de futuro' },
];

export const CATEGORIAS = [
  { id: 'moradia', nome: 'Moradia', area: 'necessidades' },
  { id: 'alimentacao', nome: 'Alimentação', area: 'necessidades' },
  { id: 'transporte', nome: 'Transporte/Saúde', area: 'necessidades' },
  { id: 'lazer', nome: 'Lazer e restaurantes', area: 'estilo' },
  { id: 'vestuario', nome: 'Vestuário e beleza', area: 'estilo' },
  { id: 'assinaturas', nome: 'Assinaturas e apps', area: 'estilo' },
  { id: 'livres', nome: 'Gastos livres', area: 'estilo' },
  { id: 'reserva', nome: 'Reserva e investimentos', area: 'futuro' },
  { id: 'metas', nome: 'Metas de curto prazo', area: 'futuro' },
];

// % do salário para cada categoria, por faixa de renda
export const PERCENTUAIS = {
  basica: { moradia: 30, alimentacao: 20, transporte: 5, lazer: 10, vestuario: 3, assinaturas: 7, livres: 5, reserva: 15, metas: 5 },
  media: { moradia: 25, alimentacao: 18, transporte: 7, lazer: 12, vestuario: 4, assinaturas: 8, livres: 6, reserva: 15, metas: 5 },
  confortavel: { moradia: 20, alimentacao: 12, transporte: 8, lazer: 15, vestuario: 5, assinaturas: 10, livres: 5, reserva: 18, metas: 7 },
};

export const NOME_FAIXA = {
  basica: 'Faixa básica',
  media: 'Faixa média',
  confortavel: 'Faixa confortável',
};

export function faixaDoSalario(salario) {
  if (salario <= 3000) return 'basica';
  if (salario <= 7000) return 'media';
  return 'confortavel';
}

export function percentualCategoria(salario, categoriaId) {
  return PERCENTUAIS[faixaDoSalario(salario)][categoriaId];
}

export function tetoCategoria(salario, categoriaId) {
  return (salario * percentualCategoria(salario, categoriaId)) / 100;
}

export function percentualArea(salario, areaId) {
  return CATEGORIAS.filter((c) => c.area === areaId)
    .reduce((soma, c) => soma + percentualCategoria(salario, c.id), 0);
}

// Fixos e parcelados contam todo mês; variáveis só no mês em que foram lançados
export function gastosDoMes(gastos, hoje = new Date()) {
  return gastos.filter((g) => {
    if (g.tipo !== 'variavel') return true;
    const data = new Date(g.data);
    return data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear();
  });
}

export function somar(gastos) {
  return gastos.reduce((soma, g) => soma + g.valor, 0);
}

export function gastoPorCategoria(gastos, categoriaId) {
  return somar(gastos.filter((g) => g.categoria === categoriaId));
}

export function statusUso(percentual) {
  if (percentual > 100) return 'acima';
  if (percentual >= 80) return 'atencao';
  return 'ok';
}

export const CORES_STATUS = { ok: '#2e7d32', atencao: '#f9a825', acima: '#c62828' };
export const NOME_STATUS = { ok: 'OK', atencao: 'Atenção', acima: 'Acima do teto' };
