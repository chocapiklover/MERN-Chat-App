import React from 'react'

const Conversation = () => {
  return (<>
    <div className='flex gap-2 items-center rounded p-2 py-1 cursor-pointer my-1'>
      <div className="avatar online">
        <div className="w-24 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
       <div className='flex gap-3 justify-between'>
          <p className='font-bold'>Username here</p>
          <span className='text-xl'>$</span>
       </div>
      </div>

      <div className='divider my-0 py-0 h-1'></div>
    </div>
  </>
  );
};

export default Conversation