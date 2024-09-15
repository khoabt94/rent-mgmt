import { Button } from '@/components/ui/button'
import { Rentee } from '@/interfaces'
import { Pencil } from 'lucide-react'

type Props = {
  rentee: Rentee.Detail
  onClickEdit: (_rentee: Rentee.Detail) => void
}

export function RenteeItem({ rentee, onClickEdit }: Props) {

  return (
    <div
      className='w-full px-4 py-2 rounded-lg shadow border border-gray-200 flex justify-between items-center'
    >
      <p className=''>
        {rentee.rentee_name}
      </p>
      {/* <MenuActions area={area} onClick={onClick} /> */}
      <Button
        type="button"
        variant={"ghost"}
        className='flex flex-row gap-x-3 opacity-80'
        onClick={() => onClickEdit(rentee)}
      >
        <Pencil size={20} strokeWidth={1.5} />
      </Button>
    </div>
  )
}
