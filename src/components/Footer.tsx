import Image from "next/image";
import logo from "@/images/logo.png"

function footer() {
  return (
    <div className="w-full h-20 bg-amazon_light text-gray-300 flex items-center justify-center gap-4">
      <Image className="w-24" src={logo} alt="logo" />
      <p className="text-sm -mt-4">All rights reserved @ABINAV 2023</p>
    </div>
  )
}

export default footer