import { pedidosCityApi } from '@/api/pedidosCityApi'
import type { Pedido, PedidoRequest } from '../interfaces/pedido.interface'

export const listarPedidosAction = async (): Promise<Pedido[]> => {
  const { data } = await pedidosCityApi.get('/pedidos/listar')
  return data.data
}

export const registrarPedidoAction = async (payload: PedidoRequest): Promise<void> => {
  await pedidosCityApi.post('/pedidos/registrar', payload)
}

export const actualizarPedidoAction = async (idPedido: number, payload: PedidoRequest): Promise<void> => {
  await pedidosCityApi.put(`/pedidos/actualizar/${idPedido}`, payload)
}

export const eliminarPedidoAction = async (idPedido: number): Promise<void> => {
  await pedidosCityApi.delete(`/pedidos/eliminar/${idPedido}`)
}
