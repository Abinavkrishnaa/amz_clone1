import logo from "@/images/logo.png"
import Image from "next/image"
import cartIcon from "@/images/cartIcon.png"
import {SlLocationPin} from "react-icons/sl";
import {HiOutlineSearch} from "react-icons/hi";
import {BiCaretDown} from "react-icons/bi";
import Link from "next/link";
import { useSelector , useDispatch } from "react-redux";
import { StateProps } from "../../../type";
import { useSession, signIn, signOut } from "next-auth/react";
import {useEffect,useState} from "react"
import { addUser } from "@/store/nextSlice";

const Header=()=> {
  const { data: session} = useSession();
  const [allData, setAllData] = useState([]);
  const {productData,favoriteData,userInfo,allProducts} = useSelector((state: StateProps )=>state.next);
  const dispatch = useDispatch();
  useEffect(()=>{
    setAllData(allProducts.allProducts);
  }, [allProducts]);
  
  useEffect(()=>{
    if(session){
      dispatch(addUser({
        name:session?.user?.name,
        email:session?.user?.email,
        image:session?.user?.image
      }))

    }
  },[session])
  return (

    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
        <div className="w-full h-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
          <Link href={"/"} className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 
          flex mt-1 items-center justify-center h-[70%]">
            { <Image src={logo} alt="logoImg" className="w-28 object-cover mt-1" /> }
          
          </Link>
          <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 
          mt-1 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
            <SlLocationPin />
            <div className="text-xs">
              <p>Deliver To</p>
              <p className="text-white font-bold uppercase">Your Location</p>
            </div>
          </div>
          <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
            <input className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none
            focus-visible:border-amazon_yellow " type="text" placeholder="Search Products" />
            <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md
            rounded-br-md">
              <HiOutlineSearch />
            </span>
          </div>
          {userInfo ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
            <img
              src={userInfo.image}
              alt="userImage"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
          <Link
          href={"/favorite"}
          className="text-xs text-gray-100 flex fl  ex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>
          {favoriteData.length > 0 && (
            <span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
              {favoriteData.length}
            </span>
          )}
        </Link>
          <Link href={"/cart"} className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
            <Image className="w-auto object-cover h-8" src={cartIcon} alt="cartImg" />
            <p className="text-xs text-white font-bold mt-3">Cart</p>
            <span className="absolute text-amazon_yellow text-xs top-2 left-[39px] font-semibold"> 
              {productData ? productData.length : 0} </span>
          </Link>

        
        
        </div>
    </div>
  )
}

export default Header