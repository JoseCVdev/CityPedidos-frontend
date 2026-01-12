import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Cliente } from '../interfaces/cliente.interface'

interface Props {
  open: boolean
  cliente: Cliente | null
  onConfirm: () => void
  onClose: () => void
  loading?: boolean
}

export const EliminarClienteDialog = ({
  open,
  cliente,
  onConfirm,
  onClose,
  loading,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Cliente</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          ¿Estás seguro de eliminar al cliente{' '}
          <strong>
            {cliente?.nombres} {cliente?.apellidoPaterno} { cliente?.apellidoMaterno }
          </strong>
          ?
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
