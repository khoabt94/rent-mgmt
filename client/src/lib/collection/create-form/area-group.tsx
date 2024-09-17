import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Area } from "@/interfaces";

type AreaGroupProps = {
  area: Area.Detail
  indexArea: number
  onCheckedChange: (_indexArea: number, _indexRoom: number, _flag: boolean) => void
  onCheckedAllChange: (_indexArea: number, _flag: boolean) => void
  watchCollectionItems: (_indexArea: number) => Area.Detail
}

export default function AreaGroup({ indexArea, area, onCheckedChange, watchCollectionItems, onCheckedAllChange }: AreaGroupProps) {
  const { room } = watchCollectionItems(indexArea)
  const checked = room.length !== 0 && room.filter(r => r.is_selected).length === area.room.length
  const shouldDisabled = room.length === 0
  return (
    <AccordionItem value={area._id} className="shadow border border-gray-300 rounded-lg">
      <AccordionTrigger className="hover:no-underline  px-3 py-3 items-center" disabled={shouldDisabled} showIcon={!shouldDisabled}>
        <div className="flex items-center gap-x-3">
          <Checkbox
            checked={checked}
            id={`select-all-${area._id}`}
            disabled={shouldDisabled}
            onCheckedChange={(flag) => {
              onCheckedAllChange(indexArea, flag as boolean)
            }}
            onClick={(e) => e.stopPropagation()}
          >
          </Checkbox>

          <label htmlFor={`select-all-${area._id}`} onClick={(e) => e.stopPropagation()}>{area.area_name} (Chọn tất cả)</label>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-5 pt-4">
        <div className="space-y-2">
          {area.room.map((r, indexRoom) => (
            <div className="flex items-center gap-x-3">
              <Checkbox
                checked={room.find(ro => r._id === ro._id)?.is_selected}
                id={r._id}
                onCheckedChange={(checked) => {
                  onCheckedChange(indexArea, indexRoom, !!checked)
                }}
              >
              </Checkbox>

              <label htmlFor={r._id}>{r.room_name}</label>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>


  )
}
