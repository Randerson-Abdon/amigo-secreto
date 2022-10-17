import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import ListaParticipantes from "./ListaParticipantes";

//simulando comportamento do hook, se comportando como uma função
jest.mock('../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
});

describe('uma lista vazia de participantes', () => {

  //antes de rodar o teste mockar um array vazio
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });

  test('não deve exibir nenhum participante', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )

    //role padrão de um elemento de lista
    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(0)

  });

});

describe('uma lista preenchida de participantes', () => {

  const participantes = ['Ana', 'João'];
  //antes de rodar o teste mockar um array de participantes
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });

  test('não deve exibir nenhum participante', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )

    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(participantes.length)

  });

});