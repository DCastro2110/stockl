import { BoxIcon, LayoutGridIcon, ShoppingBasketIcon } from 'lucide-react';
import React from 'react';

import { SidebarButton } from './sidebar-button';

const Sidebar = () => {
  return (
    <aside className='fixed flex h-full w-[272px] flex-col bg-white px-2 py-4'>
      <div className='px-2 py-4'>
        <h1 className='text-2xl font-black text-green-500'>STOCKLY</h1>
      </div>
      <nav className='flex flex-col gap-2 px-2 py-4'>
        <SidebarButton href='/'>
          <LayoutGridIcon size={20} />
          Dashboard
        </SidebarButton>
        <SidebarButton href='/products'>
          <BoxIcon size={20} />
          Produtos
        </SidebarButton>
        <SidebarButton href='/sales'>
          <ShoppingBasketIcon size={20} />
          Vendas
        </SidebarButton>
      </nav>
    </aside>
  );
};

export default Sidebar;
