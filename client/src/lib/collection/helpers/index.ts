import { Api } from "@/interfaces";
import { CreateCollectionFormData } from "../drawer/crud-collection";

export const genCreateCollectionPayload = (formValue: CreateCollectionFormData): Api.CollectionApi.CreateCollectionPayload => {
  const { collection_items } = formValue

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collectionItems: any[] = []

  collection_items.forEach(area => {
    const selectedRooms = area.room.filter(r => r.is_selected)
    selectedRooms.forEach(room => {
      collectionItems.push({
        room: room._id,
        area: area._id
      })
    })
  })


  return {
    ...formValue,
    collection_items: collectionItems
  }
}