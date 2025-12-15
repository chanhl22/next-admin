import type { Breadcrumb, BreadcrumbItem, MenuModel } from '@/types';
import AppSubMenu from './AppSubMenu';
import { useGetUserMenuList } from '@/hooks/common/useGetUserMenuList';
import { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '@/layout/context/layoutcontext';

const PubAppMenu = ({ expandAll, setExpandAll }: {
  expandAll?: string;
  setExpandAll?: React.Dispatch<React.SetStateAction<string>>;
}) => {

  const { setBreadcrumbs } = useContext(LayoutContext);

  // useGetUserMenuList, 로그인 사용자의 권한부여된 메뉴 조회
  const [menuModel, setMenuModel] = useState<MenuModel[]>([]);
  const { data: menuList, isSuccess } = useGetUserMenuList({ none: 'none' });  //state 고정값

  useEffect(() => {

    if (isSuccess && menuList) {

      // generate Breadcrumbs (메뉴에 존재하는 건만 생성)
      const generateBreadcrumbs = (model: MenuModel[]) => {
        let breadcrumbs: Breadcrumb[] = [];

        const getBreadcrumb = (item: BreadcrumbItem, labels: string[] = []) => {
          const { label, to, items } = item;
          label && labels.push(label);
          items && items.forEach((_item) => {
            getBreadcrumb(_item, labels.slice());
          });
          to && breadcrumbs.push({ labels, to });
        };

        model.forEach((item) => {
          getBreadcrumb(item);
        });

        setBreadcrumbs(breadcrumbs);
      };

      const makeMenuNode = () => {
        const roots: MenuModel[] = [];

        // 1depth(대메뉴) push
        for (let ii = 0; ii < menuList.length; ii++) {
          if (menuList[ii].showYn == 'Y' && menuList[ii].pmenuNo == 0) {
            roots.push({ label: menuList[ii].menuName, menuNo: menuList[ii].menuNo });
          }
        }

        // 2depth push
        for (let ii = 0; ii < menuList.length; ii++) {
          if (menuList[ii].showYn == 'Y' && menuList[ii].pmenuNo != 0) {
            for (let jj = 0; jj < roots.length; jj++) {
              if (roots[jj].menuNo == menuList[ii].pmenuNo) {
                const currentRoot = roots[jj];
                const menuItem = {
                  label: menuList[ii].menuName,
                  icon: menuList[ii].iconName,
                  menuNo: menuList[ii].menuNo,
                  to: menuList[ii].url,
                  code: [menuList[ii].url]
                };

                if (currentRoot.items) {
                  currentRoot.items.push(menuItem);
                } else {
                  currentRoot.items = [menuItem];
                }
              }
            }
          }
        }

        // 2depth의 code push (dmenuNo 종속메뉴 기준 : 등록/수정 화면 진입시, 대표 메뉴에 BOLD 처리 용도)
        for (let ii = 0; ii < menuList.length; ii++) {
          if (menuList[ii].showYn == 'N' && menuList[ii].dmenuNo != 0) {
            for (let jj = 0; jj < roots.length; jj++) {
              const currentRoot = roots[jj];
              if (currentRoot.items) {
                for (let kk = 0; kk < currentRoot.items.length; kk++) {
                  const item = currentRoot.items[kk];
                  if (item.menuNo == menuList[ii].dmenuNo) {
                    if (item.code) {
                      item.code.push(menuList[ii].url);
                    }
                  }
                }
              }
            }
          }
        }

        // 1depth(대메뉴)는 있으나, 2depth 없는 것 삭제
        for (let jj = roots.length - 1; jj > -1; jj--) {
          if (!roots[jj].items) {
            roots.splice(jj, 1);
          }
        }
        setMenuModel(roots);
        generateBreadcrumbs(roots);
      };

      makeMenuNode();
    }
  }, [menuList, isSuccess]);


  return <AppSubMenu model={menuModel} expandAll={expandAll} setExpandAll={setExpandAll}/>;
};

export default PubAppMenu;
