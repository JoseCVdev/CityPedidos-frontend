import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import type { Pedido, PedidoRequest } from './interfaces/pedido.interface'
import {
  listarPedidosAction,
  registrarPedidoAction,
  actualizarPedidoAction,
  eliminarPedidoAction,
} from './actions/pedidos.action'
import { buscarClientePorDocumentoAction } from '../gestion-clientes/actions/clientes.action'

import { PedidoTable } from './components/PedidoTable'
import { PedidoDialog } from './components/PedidoDialog'
import { PedidoDeleteDialog } from './components/PedidoDeleteDialog'
import type { Cliente } from '../gestion-clientes/interfaces/cliente.interface'

export const GestionPedidosPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(false)

  // Modal Pedido
  const [openModal, setOpenModal] = useState(false)
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null)

  // Eliminar
  const [pedidoToDelete, setPedidoToDelete] = useState<Pedido | null>(null)

  // Formulario
  const [fechaPedido, setFechaPedido] = useState('')
  const [total, setTotal] = useState('')
  const [numeroDocumento, setNumeroDocumento] = useState('')
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [buscandoCliente, setBuscandoCliente] = useState(false)

  // Pagiación Local
  const pageSize = 5
  const [page, setPage] = useState(1)

  const paginatedPedidos = useMemo(() => {
    const start = (page - 1) * pageSize
    return pedidos.slice(start, start + pageSize)
  }, [pedidos, page])

  const totalPages = Math.ceil(pedidos.length / pageSize)

  // Cargar Pedidos
  const loadPedidos = async () => {
    try {
      setLoading(true)
      const data = await listarPedidosAction()
      setPedidos(data)
    } catch {
      toast.error('Error al cargar pedidos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPedidos()
  }, [])

  // Buscar Cliente
  const buscarCliente = async () => {
    if (!numeroDocumento) {
      toast.warning('Ingrese un número de documento')
      return;
    }

    try {
      setBuscandoCliente(true)
      const data = await buscarClientePorDocumentoAction(numeroDocumento)
      setCliente(data)
      toast.success('Cliente encontrado')
    } catch {
      setCliente(null)
      toast.error('Cliente no encontrado')
    } finally {
      setBuscandoCliente(false)
    }
  }

  // Abrir Nuevo o Editar Pedido
  const openNewPedido = () => {
    setEditingPedido(null)
    setFechaPedido('')
    setTotal('')
    setNumeroDocumento('')
    setCliente(null)
    setOpenModal(true)
  }

  const openEditPedido = (pedido: Pedido) => {
    setEditingPedido(pedido)
    setFechaPedido(pedido.fechaPedido.substring(0, 10))
    setTotal(pedido.total.toString())
    setNumeroDocumento(pedido.cliente.numeroDocumento)
    setCliente(pedido.cliente)
    setOpenModal(true)
  }

  // Registrar Pedido
  const savePedido = async () => {
    if (!cliente) {
      toast.error('Debe seleccionar un cliente')
      return
    }

    if (!fechaPedido) {
      toast.error('Debe seleccionar una fecha')
      return
    }

    const payload: PedidoRequest = {
      fechaPedido,
      total: Number(total),
      idCliente: cliente.idCliente,
    }

    try {
      if (editingPedido) {
        await actualizarPedidoAction(editingPedido.idPedido, payload)
        toast.success('Pedido actualizado')
      } else {
        await registrarPedidoAction(payload)
        toast.success('Pedido registrado')
      }

      setOpenModal(false)
      loadPedidos()
    } catch (error: unknown){
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error(error.response.data?.error ?? 'Error de validación')
          return
        }
      }
      toast.error('Error al guardar pedido')
    }
  }

  // Eliminar Pedido
  const deletePedido = async () => {
    if (!pedidoToDelete) return

    try {
      await eliminarPedidoAction(pedidoToDelete.idPedido)
      toast.success('Pedido eliminado')
      setPedidoToDelete(null)
      loadPedidos()
    } catch {
      toast.error('Error al eliminar pedido')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Pedidos</CardTitle>
          <Button onClick={openNewPedido} className="gap-2">
            <Plus size={16} /> Nuevo Pedido
          </Button>
        </CardHeader>

        <CardContent>
          <PedidoTable
            pedidos={paginatedPedidos}
            loading={loading}
            onEdit={openEditPedido}
            onDelete={setPedidoToDelete}
          />

          <div className="mt-4 flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={page === i + 1}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* modal pedido */}
      <PedidoDialog
        open={openModal}
        pedido={editingPedido}
        fechaPedido={fechaPedido}
        total={total}
        numeroDocumento={numeroDocumento}
        cliente={cliente}
        buscandoCliente={buscandoCliente}
        onChangeFecha={setFechaPedido}
        onChangeTotal={setTotal}
        onChangeDocumento={setNumeroDocumento}
        onBuscarCliente={buscarCliente}
        onSetCliente={setCliente}
        onSave={savePedido}
        onClose={() => setOpenModal(false)}
      />

      {/* confirmación eliminar */}
      <PedidoDeleteDialog
        open={!!pedidoToDelete}
        onConfirm={deletePedido}
        onClose={() => setPedidoToDelete(null)}
      />
    </div>
  )
}
