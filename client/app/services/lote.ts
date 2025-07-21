import api from './axios';

export interface LoteInput {
  productorId: string;
  granja: string;
  vacunaciones: {
    bronquitis?: boolean;
    newcastle?: boolean;
    refuerzo?: boolean;
    viruelaAviar?: boolean;
    otra?: string;
  };
  tipoHuevo: string;
  numeroLote: string;
  fechaRecoleccion: string;
  tamano: string;
  fechaEmpaque: string;
  lugarEmpaque: string;
  cantidadPorCaja: number;
  fechaSalida: string;
  puntoVenta: string;
}

export const crearLoteRequest = async (data: LoteInput) => {
  const res = await api.post('/crearLote', data);
  return res;
};
export const obtenerLotesRequest = () =>
  api.get('/lotes').then(res => res.data);
