import React from "react";
import { realizarSorteio } from "./realizarSorteio";

describe('dado um sorteio de amigo secreto', () => {
  test('cada participante não sorteie o proprio nome', () => {

    const participantes = [
      'Maria',
      'João',
      'José',
      'Ana',
      'Pedro',
      'Paula'
    ];

    const sorteio = realizarSorteio(participantes);
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);

    });

  });

});