import type { MenuItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = { item: MenuItem; addToCart: () => void }

const MenuItem = ({ item, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        &#8377; {(item.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  )
}

export default MenuItem
