import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Cliente } from '../interfaces/cliente.interface'

interface Props {
  clientes: Cliente[]
  loading: boolean
  onEliminar: (cliente: Cliente) => void
}

export const ClientesTable = ({
  clientes,
  loading,
  onEliminar,
}: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Documento</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading && (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              Cargando clientes...
            </TableCell>
          </TableRow>
        )}

        {!loading &&
          clientes.map((cliente) => (
            <TableRow key={cliente.idCliente}>
              <TableCell>{cliente.numeroDocumento}</TableCell>
              <TableCell>
                {cliente.nombres} {cliente.apellidoPaterno}{' '}
                {cliente.apellidoMaterno}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="icon"
                  variant="destructive"
                  disabled={loading}
                  onClick={() => onEliminar(cliente)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}

        {!loading && clientes.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No hay clientes registrados
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
