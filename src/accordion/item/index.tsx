import React, {Children, cloneElement, FC, useState} from "react";
import styled from "styled-components";
import {motion, MotionProps} from "framer-motion";
import {AccordionContent} from "../content";
import {AccordionToggle} from "../toggle";

export interface AccordionItemProps extends MotionProps {
    children?: JSX.Element | JSX.Element[];
}


const Base:FC<AccordionItemProps> = (
    {
        children,
        ...props
    }
) => {

    const [ isOpen, setOpen ] = useState<boolean>(true);

    const allChildren = Children.map(children, (child) => {
        if (!child) {
            return null
        } else if (child && ![AccordionContent, AccordionToggle].includes("type" in child && child.type)) {

            throw new Error(
                // @ts-ignore
                `<${child?.type}/> DOM element is not allowed inside <Card/> component.`
            )
        } else {
            // @ts-ignore
            return cloneElement(child, {
                isOpen: isOpen,
                setOpen: setOpen,
                isCheckable:
                // @ts-ignore
                    props["isCheckable"],
                items:
                // @ts-ignore
                    props["items"],
                setItems:
                // @ts-ignore
                    props["setItems"],
                hasBorders:
                // @ts-ignore
                    props["hasBorders"]
            });
        }
    });

    return (
        <motion.dl {...props}>
            {allChildren}
        </motion.dl>
    )
};

export const AccordionItem = styled(Base)`
  font-family: 'Inter',sans-serif;
  cursor: pointer;
`;