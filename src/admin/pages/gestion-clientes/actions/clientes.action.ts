import { pedidosCityApi } from '@/api/pedidosCityApi'
import type { ClienteRegistrarRequest } from '../../gestion-pedidos/interfaces/pedido.interface'
import type { Cliente } from '../interfaces/cliente.interface'

export const buscarClientePorDocumentoAction = async (documento: string): Promise<Cliente> => {
  const { data } = await pedidosCityApi.get(`/clientes/obtener-por-documento/${documento}`)
  return data.data
}

export const registrarClienteAction = async (payload: ClienteRegistrarRequest): Promise<Cliente> => {
  const { data } = await pedidosCityApi.post('/clientes/registrar', payload)
  return data.data
}

export const listarClientesAction = async (): Promise<Cliente[]> => {
  const { data } = await pedidosCityApi.get('/clientes/listar')
  return data.data;
}

export const eliminarClienteAction = async (idCliente: number): Promise<boolean> => {
  const { data } = await pedidosCityApi.delete(`/clientes/eliminar/${idCliente}`)
  return data.data
}