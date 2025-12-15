import Link from 'next/link';
import {useContext, useState} from 'react';
import PubAppMenu from './PubAppMenu';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { LayoutState } from '@/types';

const PubAppSidebar = () => {
  const { setLayoutState } = useContext(LayoutContext);
  const anchor = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      anchored: !prevLayoutState.anchored,
    }));
  };

  // menu item expandAll ('Y', 'N', '')
  const [expandAll, setExpandAll] = useState('');

  return (
    <>
      <div className="sidebar-header">
        <Link href="/" className="app-logo">
          <img src="/images/logo.svg" alt="broccoli" />
        </Link>
        <button
          className="layout-sidebar-anchor p-link z-2 mb-2"
          type="button"
          onClick={anchor}
        ></button>
      </div>

      <div className="layout-menu-container">
        <MenuProvider>
          <PubAppMenu expandAll={expandAll} setExpandAll={setExpandAll} />
        </MenuProvider>
      </div>

      <div style={{display: "flex", justifyContent: "center", margin: "1rem 0rem 1rem 0rem"}}>
          <div className="mr-2" style={{cursor:"pointer"}} onClick={() => setExpandAll('Y')}>전체펼치기</div>
          <div className="ml-2" style={{cursor:"pointer"}} onClick={() => setExpandAll('N')}>전체접기</div>
      </div>
    </>
  );
};

export default PubAppSidebar;
