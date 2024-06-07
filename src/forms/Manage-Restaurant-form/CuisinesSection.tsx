import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { cuisineList } from "@/config/restaurant-options-config"

import { useFormContext } from "react-hook-form"
import { CuisineCheckBox } from "./CuisineCheckBox"

export const CuisinesSection = () => {
  const { control } = useFormContext()
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select your cuisines that your retaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisine, i) => (
                <CuisineCheckBox key={i} cuisine={cuisine} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </div>
  )
}
