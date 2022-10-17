import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Configuracao from "./Configuracao";

//simulando comportamento react-router-dom, se comportando como uma função
const mockNavegacao = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  }
});

describe('a pagina de configuração', () => {
  test('deve ser redenrizada corretamente', () => {
    const { container } = render(
      <RecoilRoot>
        <Configuracao />
      </RecoilRoot>
    );

    // teste de snapshot

    expect(container).toMatchSnapshot();

  });

});