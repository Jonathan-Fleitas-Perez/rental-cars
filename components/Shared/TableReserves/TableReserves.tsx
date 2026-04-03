import { Order } from "@prisma/client";
import { formatPrice } from "@/lib/formatPrice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableReservesProps {
  orders: Order[];
  isAdmin?: boolean;
}

import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, User as UserIcon, Car as CarIcon } from "lucide-react";

export function TableReserves({ orders, isAdmin }: TableReservesProps) {
  const totalAmount = orders.reduce(
    (acc, booking) => acc + parseFloat(booking.totalAmount),
    0
  );

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="py-4">Véhicule</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead>Estado</TableHead>
            {isAdmin && <TableHead>Cliente ID</TableHead>}
            <TableHead className="text-right">Importe</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isAdmin ? 6 : 5} className="text-center py-10 text-muted-foreground">
                No hay reservas registradas.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-semibold py-4">
                  <div className="flex items-center gap-2">
                    <CarIcon className="w-4 h-4 text-primary opacity-70" />
                    {order.carName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    {format(new Date(order.orderDate), "dd MMM, yyyy", { locale: es })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    {format(new Date(order.orderEndDate), "dd MMM, yyyy", { locale: es })}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={order.status === "confirmed" ? "success" : "secondary"} className="capitalize">
                    {order.status}
                  </Badge>
                </TableCell>
                {isAdmin && (
                  <TableCell className="font-mono text-[10px] text-muted-foreground max-w-[120px] truncate">
                    <div className="flex items-center gap-1.5">
                        <UserIcon className="w-3 h-3" />
                        {order.userId}
                    </div>
                  </TableCell>
                )}
                <TableCell className="text-right font-bold text-primary">
                  {formatPrice(Number(order.totalAmount))}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter className="bg-muted/20">
          <TableRow>
            <TableCell colSpan={isAdmin ? 5 : 4} className="font-bold py-4">Fatturación Total</TableCell>
            <TableCell className="text-right text-lg font-black text-primary">
              {formatPrice(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
