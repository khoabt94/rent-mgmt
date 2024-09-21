import {
  Accordion
} from "@/components/ui/accordion";
import { useGetCollections } from "@/hooks/queries";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { CollectionItem } from "./item";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

export function CollectionList() {
  const { areaId } = useParams()
  const form = useForm({
    defaultValues: {
      shouldShowUnpaidOnly: false
    }
  })

  const shouldShowUnpaidOnly = form.watch('shouldShowUnpaidOnly')

  const { data
  } = useGetCollections(
    {
      area: areaId,
      isUnpaid: shouldShowUnpaidOnly
    },
  )


  const collections = useMemo(() => data ? data?.items : [], [data])



  return (
    <>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="shouldShowUnpaidOnly"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-3 text-base my-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="shouldShowUnpaidOnly"
                  />
                </FormControl>
                <Label className="!mt-0" htmlFor="shouldShowUnpaidOnly">Chưa thu</Label>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="h-[calc(100dvh-360px)] overflow-y-scroll no-scrollbar">
        <Accordion type="multiple" className="flex flex-col gap-y-3">
          {collections.map((collection) => <CollectionItem collection={collection} key={collection._id} />)}
        </Accordion>
      </div>
    </>
  )
}
