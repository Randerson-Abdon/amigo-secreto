import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";
import Sorteio from "./Sorteio";

//simulando comportamento do hook, se comportando como uma função
jest.mock('../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
});

jest.mock('../state/hook/useResultadoSorteio', () => {
  return {
    useResultadoSorteio: jest.fn()
  }
});

describe('na pagina de sorteio', () => {

  const participantes = ['Ana', 'Bia', 'Carlos'];

  const resultado = new Map([
    ['Ana', 'Carlos'],
    ['Bia', 'Ana'],
    ['Carlos', 'Bia']
  ]);

  //antes de rodar o teste mockar um array vazio
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });


  test('todos os participantes podem exibir seus amigos secretos', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.getAllByRole('option');
    //tem uma opção a mais que é a opção vazia
    expect(opcoes).toHaveLength(participantes.length + 1);

  });

  test('o amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText('Selecione o seu nome');

    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    });

    const botao = screen.getByRole('button');

    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole('alert');

    expect(amigoSecreto).toBeInTheDocument();


  });

});