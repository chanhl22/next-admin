'use client';
import type { AppMenuItemProps } from '@/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { MenuContext } from './context/menucontext';
import { useSubmenuOverlayPosition } from './hooks/useSubmenuOverlayPosition';

const AppMenuitem = (props: AppMenuItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const {
    isSlim,
    isSlimPlus,
    isHorizontal,
    isDesktop,
    setLayoutState,
    layoutState,
    layoutConfig,
  } = useContext(LayoutContext);
  const submenuRef = useRef<HTMLUListElement>(null);
  const menuitemRef = useRef<HTMLLIElement>(null);
  const item = props.item;
  const key = props.parentKey
    ? props.parentKey + '-' + props.index
    : String(props.index);

  //code 배열 안에 path값이 들어있을 경우 활성화 처리
  const isActiveRoute = item!.to && item!.code?.includes(pathname);

  const active =
    activeMenu === key || !!(activeMenu && activeMenu.startsWith(key + '-'));

  useSubmenuOverlayPosition({
    target: menuitemRef.current,
    overlay: submenuRef.current,
    container:
      menuitemRef.current &&
      menuitemRef.current.closest('.layout-menu-container'),
    when:
      props.root &&
      active &&
      (isSlim() || isSlimPlus() || isHorizontal()) &&
      isDesktop(),
  });

  useEffect(() => {
    if (layoutState.resetMenu) {
      setActiveMenu('');
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        resetMenu: false,
      }));
    }
  }, [layoutState.resetMenu]);


  useEffect(() => {
    // menu item expandAll (Y:펼치기, N:접기, '':기타)
    if (props.expandAll === 'Y') {
      setShowSubMenu(true);
    } else if (props.expandAll === 'N') {
      setShowSubMenu(false);
    }
  }, [props.expandAll]);

  useEffect(() => {
    if (!(isSlim() || isSlimPlus() || isHorizontal()) && isActiveRoute) {
      setActiveMenu(key);
    }
    const url = pathname + searchParams.toString();
    const onRouteChange = () => {
      if (!(isSlim() || isHorizontal()) && item!.to && item!.to === url) {
        setActiveMenu(key);
      }
    };
    onRouteChange();

    // url로 직접 메뉴 접근 케이스
    // 1depth menuItem의 items에 pathname 존재시, 서브메뉴 노출
    if (props.root) {
      if (props.item?.items?.some(item => item.to === pathname)) {
        setShowSubMenu(true);
      }
    }

  }, [pathname, searchParams, layoutConfig]);

  const [showSubMenu, setShowSubMenu] = useState(false);

  const itemClick = (event: React.MouseEvent<HTMLElement>) => {

    // 1depth 메뉴 일때, 서브메뉴 토글
    if (props.root) {
      setShowSubMenu(!showSubMenu);
      props.setExpandAll?.(''); // 기타
    }

    //avoid processing disabled items
    if (item!.disabled) {
      event.preventDefault();
      return;
    }

    // navigate with hover
    if (props.root && (isSlim() || isHorizontal() || isSlimPlus())) {
      const isSubmenu =
        event.currentTarget.closest(
          '.layout-root-menuitem.active-menuitem > ul'
        ) !== null;
      if (isSubmenu)
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          menuHoverActive: true,
        }));
      else
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          menuHoverActive: !prevLayoutState.menuHoverActive,
        }));
    }

    // toggle active state
    if (item?.items) {
      setActiveMenu(active ? props.parentKey! : key);

      if (
        props.root &&
        !active &&
        (isSlim() || isHorizontal() || isSlimPlus())
      ) {
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          overlaySubmenuActive: true,
        }));
      }
    } else {
      if (!isDesktop()) {
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
        }));
      }

      if (isSlim() || isSlimPlus() || isHorizontal()) {
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          menuHoverActive: false,
        }));
      }

      setActiveMenu(key);
    }
  };

  const onMouseEnter = () => {
    // activate item on hover
    if (
      props.root &&
      (isSlim() || isHorizontal() || isSlimPlus()) &&
      isDesktop()
    ) {
      if (!active && layoutState.menuHoverActive) {
        setActiveMenu(key);
      }
    }
  };

  const badge = item?.badge ? (
    <span
      className={classNames(
        'layout-menu-badge p-tag p-tag-rounded ml-2 uppercase',
        {
          [`${item?.badge}`]: true,
          'p-tag-success': item?.badge === 'new',
          'p-tag-info': item?.badge === 'updated',
        }
      )}
    >
      {item?.badge}
    </span>
  ) : null;

  const subMenu =
    item?.items && item?.visible !== false ? (
      <ul ref={submenuRef}>
        {item?.items.map((child, i) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
              expandAll={''}
            />
          );
        })}
      </ul>
    ) : null;

  return (
    <li
      ref={menuitemRef}
      className={classNames({
        'layout-root-menuitem': props.root,
        'active-menuitem': active,
      })}
    >
      {/* 1depth: 대메뉴 */}
      {props.root && item?.visible !== false && (
        <div className="layout-menuitem-root-text" style={{ cursor: "pointer" }}
             onClick={e => itemClick(e)}>
          <div className={`mr-2 pi ${showSubMenu ? 'pi-angle-up' : 'pi-angle-down'}`}/>
          {item?.label}
        </div>
      )}

      {/* 1depth: 대메뉴 <a> */}
      {(!item?.to || item?.items) && item?.visible !== false ? (
        <>
          <a
            href={item?.url}
            onClick={(e) => itemClick(e)}
            className={classNames(item?.class, 'p-ripple tooltip-target')}
            target={item?.target}
            data-pr-tooltip={item?.label}
            data-pr-disabled={
              !(isSlim() && props.root && !layoutState.menuHoverActive)
            }
            tabIndex={0}
            onMouseEnter={onMouseEnter}
          >
            <i className={classNames('layout-menuitem-icon', item?.icon)}></i>
            <span className="layout-menuitem-text">{item?.label}</span>
            {item?.items && (
              <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
            )}
            <Ripple/>
          </a>
        </>
      ) : null}

      {/* 2depth: 메뉴 */}
      {item?.to && !item?.items && item?.visible !== false ? (
        <>
          <Link
            href={item?.to}
            target={item?.to.startsWith('http') ? '_blank' : undefined} // 외부링크는 http로 시작 (ex, game cms)
            prefetch={false}
            replace={item?.replaceUrl}
            onClick={(e) => itemClick(e)}
            className={classNames(item?.class, 'p-ripple ', {
              'active-route': isActiveRoute,
            })}
            tabIndex={0}
            onMouseEnter={onMouseEnter}
          >
            <i className={classNames('ml-3 layout-menuitem-icon', item?.icon)}></i>
            <span className="layout-menuitem-text">{item?.label}</span>
            {badge}
            {item?.items && (
              <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
            )}
            <Ripple/>
          </Link>
        </>
      ) : null}

      {/*{ props.expandAll === 'Y' ? subMenu : (showSubMenu && subMenu) }*/}
      {showSubMenu && subMenu}
    </li>
  );
};

export default AppMenuitem;