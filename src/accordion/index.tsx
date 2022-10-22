import React, {Children, cloneElement, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {AccordionItem} from './item';
import {AiOutlineSelect} from 'react-icons/ai';

export interface AccordionProps {
    children?: JSX.Element | JSX.Element[];
    backgroundColor?: string
    isCheckable?: boolean | undefined
    showCount?: boolean | undefined
    hasBorders?: boolean | undefined
    onSelected?: Dispatch<SetStateAction<string[]>>
}

const Base:FC<AccordionProps> = (
    {
        children,
        isCheckable,
        backgroundColor,
        hasBorders,
        showCount,
        onSelected,
        ...props
    }
) => {

    const [ items, setItems ] = useState<string[]>([]);

    const allChildren = Children.map(children, (child) => {
        if (!child) {
            return null
        } else if (child && ![AccordionItem].includes('type' in child && child.type)) {

            throw new Error(
                // @ts-ignore
                `<${child?.type}/> DOM element is not allowed inside <Card/> component.`
            )
        } else {
            // @ts-ignore
            return cloneElement(child, {
                isCheckable: isCheckable,
                setItems: setItems,
                items: items,
                hasBorders: hasBorders
            });
        }
    });

    useEffect(() => {
        onSelected!!(items)
    }, [items]);

    return (
        <motion.div {...props}>
            {isCheckable && showCount && (
                <motion.div className='count' initial={{ scale: 0.5}} animate={{ scale: 1}}>
                    <AiOutlineSelect/>{' '}<i>Options : {items.length}</i>
                </motion.div>
            )}
            {allChildren}
        </motion.div>
    )
};

export const Accordion = styled(Base)`
  border-radius: 10px;
  background-color: ${({backgroundColor}) => backgroundColor || '#FAFCFD'};
  padding: 30px;

  .count {
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #f2f2f2;
    padding: 1rem 0;
  }
`;