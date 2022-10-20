import React, {createElement, FC} from "react";
import styled, {css} from "styled-components";
import {motion} from "framer-motion";
import {AiOutlineDown} from "react-icons/ai";

export interface AccordionToggleProps {
    children?: any;
}

const Base:FC<AccordionToggleProps> = (
    {
        children,
        ...props
    }
) => {

    // @ts-ignore
    const toggleOpen = () => props["setOpen"]!!(!props["isOpen"]);

    return (
        <motion.dt {...props}>
            <div className="content" onClick={toggleOpen}>
                {children}
            </div>
            <div className="options" onClick={toggleOpen}>
                {createElement(AiOutlineDown, {}, null)}
            </div>
        </motion.dt>
    )
};

const element = ( isOptions?: boolean) => css`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  justify-content: ${isOptions ? "flex-end" : "flex-start"}
`;

export const AccordionToggle = styled(Base)`
  display: grid;
  grid-template-columns: 90% 10%;
  padding: 1rem 0.5rem;
  background-color: inherit;

  .content {
    ${element()};
    cursor: pointer;
  }

  .options {
    ${element(true)};
    cursor: pointer;
  }

`;