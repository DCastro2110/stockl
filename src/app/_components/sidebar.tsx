import React from 'react';

const Sidebar = () => {
  return (
    <aside className='flex h-full w-[272px] flex-col bg-white px-2 py-4'>
      <div className='px-2 py-4'>
        <h1 className='text-2xl font-black text-green-500'>STOCKLY</h1>
      </div>
      <nav className='flex flex-col gap-2 px-2 py-4'>
        <button className='text-left'>Dashboard</button>
        <button className='text-left'>Dashboard</button>
        <button className='text-left'>Dashboard</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
