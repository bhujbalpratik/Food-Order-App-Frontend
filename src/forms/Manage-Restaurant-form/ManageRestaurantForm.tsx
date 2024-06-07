import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { DetailsSection } from "./DetailsSection"
import { Separator } from "@/components/ui/separator"
import { CuisinesSection } from "./CuisinesSection"
import { MenuSection } from "./MenuSection"
import ImageSection from "./ImageSection"
import { LoadingButton } from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import { Restaurant } from "@/types"
import { useEffect } from "react"

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required",
  }),
  city: z.string({
    required_error: "city name is required",
  }),
  country: z.string({
    required_error: "country name is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "delivery price must be valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required",
    invalid_type_error: "estimated delivery time must be valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select atleast one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().trim().min(1, "menu item name is required"),
      price: z.coerce.number().min(1, "menu item price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
})

export type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
  restaurant?: Restaurant
  onSave: (restaurantFormData: FormData) => void
  isLoading: boolean
}

export const ManageRestaurantForm = ({
  onSave,
  isLoading,
  restaurant,
}: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  })

  useEffect(() => {
    if (!restaurant) {
      return
    }

    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    )
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }))

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    }

    form.reset(updatedRestaurant)
  }, [form, restaurant])

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData()
    console.log(formDataJson)

    //pratik code;
    formData.append("restaurantName", formDataJson.restaurantName)
    formData.append("city", formDataJson.city)
    formData.append("country", formDataJson.country)

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    )

    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    )

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine)
    })

    formDataJson.menuItems.forEach((item, index) => {
      formData.append(`menuItems[${index}][name]`, item.name)
      formData.append(
        `menuItems[${index}][price]`,
        (item.price * 100).toString()
      )
    })

    formData.append("imageFile", formDataJson.imageFile)

    onSave(formData)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  )
}
