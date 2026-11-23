import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_PERFIL = '@perfil';
const CHAVE_GASTOS = '@gastos';

export async function carregarPerfil() {
  const json = await AsyncStorage.getItem(CHAVE_PERFIL);
  return json ? JSON.parse(json) : null;
}

export async function salvarPerfil(perfil) {
  await AsyncStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
}

export async function carregarGastos() {
  const json = await AsyncStorage.getItem(CHAVE_GASTOS);
  return json ? JSON.parse(json) : [];
}

export async function salvarGastos(gastos) {
  await AsyncStorage.setItem(CHAVE_GASTOS, JSON.stringify(gastos));
}

const CHAVE_USUARIO = '@usuario';
const CHAVE_SESSAO = '@sessao';

export async function carregarUsuario() {
  const json = await AsyncStorage.getItem(CHAVE_USUARIO);
  return json ? JSON.parse(json) : null;
}

export async function salvarUsuario(usuario) {
  await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export async function carregarSessao() {
  const valor = await AsyncStorage.getItem(CHAVE_SESSAO);
  return valor === 'true';
}

export async function salvarSessao(logado) {
  await AsyncStorage.setItem(CHAVE_SESSAO, String(logado));
}
