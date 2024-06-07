import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to={"/"}>
          <span className="text-3xl text-white font-bold tracking-tight cursor-pointer">
            JevlisKa?com
          </span>
        </Link>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span className="cursor-pointer">Privacy Policy</span>
          <span className="cursor-pointer">Terms of Services</span>
        </span>
      </div>
    </div>
  )
}
