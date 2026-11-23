import { createContext, useContext, useEffect, useState } from 'react';
import * as storage from '../services/storage';

const FinancasContext = createContext(null);

export function FinancasProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // { nome, email, senha }
  const [logado, setLogado] = useState(false);
  const [perfil, setPerfil] = useState({ nome: '', salario: 0 });
  const [gastos, setGastos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega os dados salvos uma vez, quando o app abre
  useEffect(() => {
    async function carregar() {
      const usuarioSalvo = await storage.carregarUsuario();
      const sessao = await storage.carregarSessao();
      const perfilSalvo = await storage.carregarPerfil();
      const gastosSalvos = await storage.carregarGastos();
      setUsuario(usuarioSalvo);
      setLogado(Boolean(usuarioSalvo) && sessao);
      if (perfilSalvo) setPerfil(perfilSalvo);
      setGastos(gastosSalvos);
      setCarregando(false);
    }
    carregar();
  }, []);

  async function cadastrar(nome, email, senha) {
    const novo = { nome, email: email.trim().toLowerCase(), senha };
    setUsuario(novo);
    await storage.salvarUsuario(novo);
    await salvarPerfil({ ...perfil, nome });
    setLogado(true);
    await storage.salvarSessao(true);
  }

  async function entrar(email, senha) {
    const emailOk = usuario && usuario.email === email.trim().toLowerCase();
    if (!emailOk || usuario.senha !== senha) return false;
    setLogado(true);
    await storage.salvarSessao(true);
    return true;
  }

  async function sair() {
    setLogado(false);
    await storage.salvarSessao(false);
  }

  async function salvarPerfil(novoPerfil) {
    setPerfil(novoPerfil);
    await storage.salvarPerfil(novoPerfil);
  }

  async function adicionarGasto(gasto) {
    const novo = {
      ...gasto,
      id: Date.now().toString(),
      data: new Date().toISOString(),
    };
    const lista = [...gastos, novo];
    setGastos(lista);
    await storage.salvarGastos(lista);
  }

  async function removerGasto(id) {
    const lista = gastos.filter((g) => g.id !== id);
    setGastos(lista);
    await storage.salvarGastos(lista);
  }

  return (
    <FinancasContext.Provider
      value={{
        usuario, logado, cadastrar, entrar, sair,
        perfil, gastos, carregando, salvarPerfil, adicionarGasto, removerGasto,
      }}
    >
      {children}
    </FinancasContext.Provider>
  );
}

export function useFinancas() {
  return useContext(FinancasContext);
}
