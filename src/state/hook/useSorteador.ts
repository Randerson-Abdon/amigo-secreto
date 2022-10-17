import { useSetRecoilState } from 'recoil';
import { useListaDeParticipantes } from './useListaDeParticipantes';
import { resultadoDoAmigoSecreto } from '../atom';
import { realizarSorteio } from '../helpers/realizarSorteio';

export const useSorteador = () => {

  const participantes = useListaDeParticipantes();

  const setResultado = useSetRecoilState(resultadoDoAmigoSecreto);

  return () => {
    const resultado = realizarSorteio(participantes);
    setResultado(resultado);
  }

}