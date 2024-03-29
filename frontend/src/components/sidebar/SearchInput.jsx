import React from 'react'
import { MdOutlinePersonSearch } from "react-icons/md";


const SearchInput = () => {
  return (
    <form className='flex items-center'>
        <input type='text' placeholder='Search' className='input input-bordered rounded-full mt-2 m-4'/>
        <button type='submit' className='btn btn-primary rounded-full mt-2 m-4'>
        <MdOutlinePersonSearch className='w-8 h-8'/>
        </button>

    </form>
  )
}

export default SearchInput