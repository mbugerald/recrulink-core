import React, {FC} from 'react';
import styled from 'styled-components';
import {motion, MotionProps} from 'framer-motion';

export interface AccordionContentProps extends MotionProps{
    children?: any
    checkValue?: string | number | undefined
    noCheck?: boolean | undefined
    noBorder?: boolean | undefined
}

const Base:FC<AccordionContentProps> = (
    {
        checkValue,
        noCheck,
        noBorder,
        children,
        ...props
    }
) => {

    const setCheckValue = (e: any) => {
        if (e.target.checked) {
            // @ts-ignore
            const options = props['items'].filter((item) => item === checkValue);
            // filter through the list to see if it exists as checked value.
            // @ts-ignore
            options.length === 0 && checkValue && props['setItems']([...props['items'], checkValue]);
        } else {
            // @ts-ignore
            const options = props['items'].filter((item) => item !== checkValue);
            // @ts-ignore
            props['setItems'](options)
        }
    };

    // @ts-ignore
    return props['isOpen'] ? (
        <motion.dd
            {...props}
            initial={{ opacity: 0, y: 10}}
            animate={{ opacity: 1, y: 0}}
            transition={{ type: 'spring', stiffness: 30, duration: 0.45 }}
        >
            {
                // @ts-ignore
                props['isCheckable'] && !noCheck && (<input type='checkbox' onChange={setCheckValue}/>)
            }
            {children}
        </motion.dd>
    ): null
};

export const AccordionContent = styled(Base)`
  padding: 1rem 0.5rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  
  border-bottom: ${(props) =>
          // @ts-ignore
          props['hasBorders'] && !props.noBorder && '1px solid #f2f2f2'
};

  input[type='checkbox'] {
    appearance: none;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    margin: 0;
    background-color: inherit;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #D7D7D7;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      width: 60%;
      height: 60%;
      background-color: #3CB8DE;
      border-radius: 2px;
      display: none;
      margin: 0 auto;
    }
    
    &:checked::after {
      display: block;
    }
  }
`;