import { TableReserves as SharedTableReserves } from "@/components/Shared/TableReserves";
import { TableReservesProps } from "./TableReserves.types";

export function TableReserves(props: TableReservesProps) {
  return <SharedTableReserves orders={props.orders} isAdmin={false} />;
}
