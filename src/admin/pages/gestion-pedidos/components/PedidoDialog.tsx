import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search, UserPlus, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import type { Pedido } from '../interfaces/pedido.interface'
import { registrarClienteAction } from '../../gestion-clientes/actions/clientes.action'
import type { Cliente } from '../../gestion-clientes/interfaces/cliente.interface'

interface Props {
  open: boolean
  pedido: Pedido | null
  fechaPedido: string
  total: string
  numeroDocumento: string
  cliente: Cliente | null
  buscandoCliente: boolean
  onChangeFecha: (v: string) => void
  onChangeTotal: (v: string) => void
  onChangeDocumento: (v: string) => void
  onBuscarCliente: () => void
  onSave: () => void
  onClose: () => void
  onSetCliente: (cliente: Cliente) => void
}

export const PedidoDialog = ({
  open,
  pedido,
  fechaPedido,
  total,
  numeroDocumento,
  cliente,
  buscandoCliente,
  onChangeFecha,
  onChangeTotal,
  onChangeDocumento,
  onBuscarCliente,
  onSave,
  onClose,
  onSetCliente,
}: Props) => {
  // Registro Cliente - Estado Local
  const [showRegistrarCliente, setShowRegistrarCliente] = useState(false)
  const [docNuevoCliente, setDocNuevoCliente] = useState('')
  const [nombres, setNombres] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [savingCliente, setSavingCliente] = useState(false)

  const abrirRegistroCliente = () => {
    // opcional: precargar lo que escribió arriba
    setDocNuevoCliente(numeroDocumento)
    setShowRegistrarCliente(true)
  }

  const registrarCliente = async () => {
    if (
      !docNuevoCliente ||
      !nombres ||
      !apellidoPaterno ||
      !apellidoMaterno
    ) {
      toast.warning('Completa todos los campos del cliente')
      return
    }

    try {
      setSavingCliente(true)

      const clienteRegistrado = await registrarClienteAction({
        numeroDocumento: docNuevoCliente,
        nombres,
        apellidoPaterno,
        apellidoMaterno,
      })

      onChangeDocumento(clienteRegistrado.numeroDocumento)
      onSetCliente(clienteRegistrado)

      setShowRegistrarCliente(false)
      setDocNuevoCliente('')
      setNombres('')
      setApellidoPaterno('')
      setApellidoMaterno('')

      toast.success('Cliente registrado correctamente')
    } catch {
      toast.error('Error al registrar cliente')
    } finally {
      setSavingCliente(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {pedido ? 'Editar Pedido' : 'Nuevo Pedido'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Fecha */}
          <div className="flex flex-col gap-2">
            <Label>Fecha Pedido</Label>
            <Input
              type="date"
              value={fechaPedido}
              onChange={(e) => onChangeFecha(e.target.value)}
            />
          </div>

          {/* Total */}
          <div className="flex flex-col gap-2">
            <Label>Total</Label>
            <Input
              type="number"
              value={total}
              onChange={(e) => onChangeTotal(e.target.value)}
            />
          </div>

          {/* Documento búsqueda */}
          <div className="flex flex-col gap-2">
            <Label>Documento Cliente</Label>
            <div className="flex gap-2">
              <Input
                value={numeroDocumento}
                onChange={(e) => onChangeDocumento(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={onBuscarCliente}
                disabled={buscandoCliente}
              >
                <Search size={16} />
              </Button>
            </div>
          </div>

          {/* Cliente encontrado */}
          <div className="flex flex-col gap-2">
            <Label>Cliente</Label>
            <Input
              value={
                cliente
                  ? `${cliente.nombres} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`
                  : ''
              }
              disabled
            />
          </div>

          {/* Botón registrar */}
          {!cliente && !showRegistrarCliente && (
            <Button
              variant="link"
              className="justify-start gap-2"
              onClick={abrirRegistroCliente}
            >
              <UserPlus size={16} /> Registrar nuevo cliente
            </Button>
          )}

          {/* Card nuevo cliente */}
          {showRegistrarCliente && (
            <div className="border rounded-lg p-4 grid gap-3">
              <div className="flex justify-between items-center">
                <Label className="font-semibold">Nuevo Cliente</Label>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowRegistrarCliente(false)}
                >
                  <X size={16} />
                </Button>
              </div>

              <Input
                placeholder="Número de documento"
                value={docNuevoCliente}
                onChange={(e) => setDocNuevoCliente(e.target.value)}
              />

              <Input
                placeholder="Nombres"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
              />

              <Input
                placeholder="Apellido paterno"
                value={apellidoPaterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
              />

              <Input
                placeholder="Apellido materno"
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
              />

              <Button onClick={registrarCliente} disabled={savingCliente}>
                Guardar Cliente
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onSave} disabled={!cliente}>
            Guardar Pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
