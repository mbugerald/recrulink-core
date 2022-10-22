import React, {FC, HTMLAttributes} from 'react';
import styled from 'styled-components';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement>{
    align?: 'start' | 'end' | 'center' | undefined
    justify?: 'start' | 'end' | 'center' |undefined
    wrap?: 'no-wrap' | 'wrap' | 'wrap-inverse' | undefined
    gap?: number
}

const Base:FC<CardBodyProps> = (
    {
        align,
        justify,
        wrap,
        gap,
        children,
        ...props
    }
) => {

    return (
        <div {...props}>
            {children}
        </div>
    )
};

export const CardBody = styled(Base)`
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex-wrap: ${({ wrap }) => wrap};
  align-items: ${({ align }) => align === 'center' ? 'center' : `flex-${align}`};
  justify-content: ${({ justify }) => justify === 'center' ? 'center' : `flex-${justify}`};
  gap: ${({ gap }) => `${gap}`};
`;