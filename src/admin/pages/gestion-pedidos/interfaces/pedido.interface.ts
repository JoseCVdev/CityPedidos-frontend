import type { Cliente } from "../../gestion-clientes/interfaces/cliente.interface"

export interface Pedido {
  idPedido: number
  numeroPedido: string
  fechaPedido: string
  total: number
  estado: boolean
  cliente: Cliente
}

export interface PedidoRequest {
  fechaPedido: string
  total: number
  idCliente: number
}

export interface ClienteRegistrarRequest {
  numeroDocumento: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
}