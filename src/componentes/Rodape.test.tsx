import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import Rodape from "./Rodape";

//simulando comportamento do hook, se comportando como uma função
jest.mock('../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
});

//simulando comportamento react-router-dom, se comportando como uma função
const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  }
});

jest.mock('../state/hook/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  }
});


describe('onde não existem participantes suficientes', () => {
  //antes de rodar o teste mockar um array vazio
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });
  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button');
    expect(botao).toBeDisabled();

  });

});

describe('quando existem participantes suficientes', () => {
  const participantes = ['Ana', 'João', 'Maria'];
  //antes de rodar o teste mockar um array de participantes
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button');
    expect(botao).not.toBeDisabled();

  });

  test('a brincadeira é iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )
    const botao = screen.getByRole('button');
    fireEvent.click(botao);
    //verificar se o mock foi chamado 1 vez
    expect(mockNavegacao).toHaveBeenCalledTimes(1);
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
    //verificar se o mock foi chamado 1 vez
    expect(mockSorteio).toHaveBeenCalledTimes(1);

  });

});