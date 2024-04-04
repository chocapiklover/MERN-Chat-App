import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../../Hooks/useLogout';


const LogoutButton = () => {
  const { loading, logout }= useLogout()
  return (
    <div className='mt-auto'>
      {!loading ? (
       <TbLogout2 className='w-8 h-8 cursor-pointer' 
       onClick={logout}
       />
      ) : (
      <span className='loading loading-spinner'></span>
      )}
    </div>
  );
};

export default LogoutButton
