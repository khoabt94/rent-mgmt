import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Collection, Common } from "@/interfaces"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { currencyFormatter } from "@/helpers/currency";
import { Download } from "lucide-react";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

interface CollectionInfoDialogProps extends Common.ModalProps {
  collection: Collection.Detail
}

export function CollectionInfoDialog({ open = true, onClose, collection }: CollectionInfoDialogProps) {
  const onOpenChange = (flag: boolean) => {
    if (!flag) onClose?.()
  }

  const {
    collection_name,
    amount_due,
    deduction,
    other_fee,
    rent_fee,
    begin_electricity,
    electricity_unit_price,
    water_unit_price,
    begin_water,
    end_electricity,
    end_water,
    room: { room_name },

  } = collection

  const handleCaptureClick = async () => {
    const collectionDetailElmt =
      document.querySelector<HTMLElement>('.collection_detail');
    if (!collectionDetailElmt) return;

    const canvas = await html2canvas(collectionDetailElmt);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, `${collection_name} - ${room_name}`, 'image/png');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-24px)] rounded-lg px-3 py-6 collection_detail">
        <DialogHeader>
          <DialogTitle>{collection_name}</DialogTitle>
          <p className="text-sm">Phòng: {room_name}</p>
          <Button
            type="button"
            onClick={handleCaptureClick}
            variant={'ghost'}
            className="absolute top-3 left-3 size-10 p-0 !mt-0"
          >
            <Download strokeWidth={1.2} />
          </Button>
        </DialogHeader>
        <DialogDescription>

          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="w-[80px]">Số đầu</TableHead>
                <TableHead className="w-[80px]">Số cuối</TableHead>
                <TableHead className="text-right w-[80px]">Số lượng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key='electric'>
                <TableCell className="font-medium">Điện</TableCell>
                <TableCell className="w-[80px]">{begin_electricity || '--'}</TableCell>
                <TableCell className="w-[80px]">{end_electricity}</TableCell>
                <TableCell className="text-right w-[80px]">{currencyFormatter(end_electricity - begin_electricity) || '--'}</TableCell>
              </TableRow>
              <TableRow key='electric-unit' className="h-5">
                <TableCell colSpan={2} className="font-medium"></TableCell>
                <TableCell colSpan={2} className="text-right">
                  {(end_electricity - begin_electricity) ? (
                    <p>
                      x <span className="font-medium">{electricity_unit_price || 0}</span>
                      {" "}
                      = <span className="font-medium">{currencyFormatter((end_electricity - begin_electricity) * electricity_unit_price) || 0}</span>
                    </p>
                  ) : <div className="h-5"></div>}
                </TableCell>
              </TableRow>
              <TableRow key='electric'>
                <TableCell className="font-medium">Nước</TableCell>
                <TableCell className="w-[80px]">{begin_water || '--'}</TableCell>
                <TableCell className="w-[80px]">{end_water}</TableCell>
                <TableCell className="text-right w-[80px]">{currencyFormatter((end_water - begin_water)) || '--'}</TableCell>
              </TableRow>
              <TableRow key='water-unit' className="h-5">
                <TableCell colSpan={2} className="font-medium"></TableCell>
                <TableCell colSpan={2} className="text-right">
                  {(end_water - begin_water) ? (
                    <p>
                      x <span className="font-medium">{water_unit_price || 0}</span>
                      {" "}
                      = <span className="font-medium">{currencyFormatter((end_water - begin_water) * water_unit_price) || 0}</span>
                    </p>
                  ) : <div className="h-5"></div>}
                </TableCell>
              </TableRow>
              <TableRow key='rent_fee' className="h-10">
                <TableCell className="font-medium h-10" colSpan={2}>Tiền phòng</TableCell>
                <TableCell className="w-[80px]" colSpan={2}>
                  <p className="h-10 flex items-center justify-end font-medium">{currencyFormatter(rent_fee)}</p>
                </TableCell>
              </TableRow>
              <TableRow key='other_fee'>
                <TableCell className="font-medium" colSpan={2}>Phí khác</TableCell>
                <TableCell className="w-[80px] text-right" colSpan={2}>{other_fee}</TableCell>
              </TableRow>
              <TableRow key='deduction'>
                <TableCell className="font-medium" colSpan={2}>Giảm trừ</TableCell>
                <TableCell className="w-[80px] text-right" colSpan={2}>{currencyFormatter(deduction)}</TableCell>
              </TableRow>

            </TableBody>
            <TableFooter className="bg-slate-100">
              <TableRow>
                <TableCell colSpan={3} className="text-base">Tổng tiền</TableCell>
                <TableCell className="text-right text-base">{currencyFormatter(amount_due)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </DialogDescription>
        <DialogFooter className="mt-6">
          <Button type="button" onClick={onClose} className="flex-1">Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
