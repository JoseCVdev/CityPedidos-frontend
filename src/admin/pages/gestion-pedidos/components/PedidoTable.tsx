import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import type { Pedido } from '../interfaces/pedido.interface'

interface Props {
  pedidos: Pedido[]
  loading: boolean
  onEdit: (pedido: Pedido) => void
  onDelete: (pedido: Pedido) => void
}

export const PedidoTable = ({ pedidos, loading, onEdit, onDelete }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N° Pedido</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading && (
          <TableRow>
            <TableCell colSpan={5}>Cargando...</TableCell>
          </TableRow>
        )}

        {!loading &&
          pedidos.map((p) => (
            <TableRow key={p.idPedido}>
              <TableCell>{p.numeroPedido}</TableCell>
              <TableCell>
                {new Date(p.fechaPedido).toLocaleDateString()}
              </TableCell>
              <TableCell>{p.cliente.numeroDocumento + ' - ' + p.cliente.nombres + ' ' + p.cliente.apellidoPaterno + ' ' + p.cliente.apellidoMaterno}</TableCell>
              <TableCell>S/ {p.total.toFixed(2)}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <Button size="icon" variant="outline" onClick={() => onEdit(p)}>
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => onDelete(p)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
