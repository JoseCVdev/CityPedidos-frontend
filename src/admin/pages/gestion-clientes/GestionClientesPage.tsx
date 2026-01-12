import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

import type { Cliente } from './interfaces/cliente.interface'
import {
  listarClientesAction,
  eliminarClienteAction,
} from './actions/clientes.action'
import { ClientesTable } from './components/ClientesTable'
import { EliminarClienteDialog } from './components/EliminarClienteDialog'

export const GestionClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(false)
  const [clienteEliminar, setClienteEliminar] =
    useState<Cliente | null>(null)

  const cargarClientes = async () => {
    try {
      setLoading(true)
      const data = await listarClientesAction()
      setClientes(data)
    } catch {
      toast.error('Error al cargar clientes')
    } finally {
      setLoading(false)
    }
  }

  const confirmarEliminar = async () => {
    if (!clienteEliminar) return

    try {
      await eliminarClienteAction(clienteEliminar.idCliente)
      toast.success('Cliente eliminado correctamente')
      setClienteEliminar(null)
      cargarClientes()
    } catch {
      toast.error('No se pudo eliminar el cliente')
    }
  }

  useEffect(() => {
    cargarClientes()
  }, [])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Clientes</CardTitle>
        </CardHeader>

        <CardContent>
          <ClientesTable
            clientes={clientes}
            loading={loading}
            onEliminar={setClienteEliminar}
          />
        </CardContent>
      </Card>

      <EliminarClienteDialog
        open={!!clienteEliminar}
        cliente={clienteEliminar}
        onConfirm={confirmarEliminar}
        onClose={() => setClienteEliminar(null)}
      />
    </>
  )
}
