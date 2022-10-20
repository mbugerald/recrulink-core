import {motion} from "framer-motion";
import React, {FC, HTMLAttributes} from "react";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
    children?: JSX.Element | JSX.Element[]
    isOpen?: boolean | undefined
}

const Base:FC<DrawerProps> = (
    {
        children,
        isOpen,
        ...props
    }
) => {

    const isMobileScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const isTabletScreen = useMediaQuery({ query: '(max-width: 991px)' });

    return isOpen ? (
        <nav {...props}>
            <div className="overlay"/>
            <motion.div
                className="panel"
                initial={{ width: 0, opacity: 0.1, display: "none"}}
                animate={{ width: isMobileScreen ? "100%": isTabletScreen ? "60%" :"38.3%", right: 0, opacity: 1, display: "block" }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </nav>
    ): null
}

export const Drawer = styled(Base)`
  overflow: hidden;
  .overlay {
    background-color: #E1EAED;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 6;
    left: 0;
    mix-blend-mode: multiply;
  }

  .panel {
    background-color: #FFF;
    height: 100%;
    z-index: 7;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    overflow: hidden;
    padding: 1rem;
    box-shadow: 0 11px 22px rgba(21, 74, 95, 0.05);
  }
`;