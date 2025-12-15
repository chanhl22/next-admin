import type { MenuProps } from "@/types";
import { Tooltip } from "primereact/tooltip";
import { useContext, useEffect, useRef } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";

const AppSubMenu = (props: MenuProps) => {
    const { layoutState, setBreadcrumbs } = useContext(LayoutContext);
    const tooltipRef = useRef<Tooltip | null>(null);

    useEffect(() => {
        if (tooltipRef.current) {
            tooltipRef.current.hide();
            (tooltipRef.current as any).updateTargetEvents();
        }
    }, [layoutState.overlaySubmenuActive]);

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {props.model.map((item, i) => {
                    return !item.seperator ? (
                        <AppMenuitem
                            item={item}
                            root={true}
                            index={i}
                            key={item.label}
                            expandAll={props.expandAll}
                            setExpandAll={props.setExpandAll}
                        />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
            <Tooltip
                ref={tooltipRef}
                target="li:not(.active-menuitem)>.tooltip-target"
            />
        </MenuProvider>
    );
};

export default AppSubMenu;
