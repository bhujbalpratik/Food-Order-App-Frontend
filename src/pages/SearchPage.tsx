import { useParams } from "react-router-dom"

export const SearchPage = () => {
  const { city } = useParams()
  return (
    <div>
      <span>User Searched for {city}</span>
    </div>
  )
}
