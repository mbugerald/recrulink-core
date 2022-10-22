import React, {createElement, FC, HTMLAttributes} from 'react';
import {useMediaQuery} from 'react-responsive';
import styled from 'styled-components';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement>{
    /** The heading level to use **/
    headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /** The heading text color **/
    color?: string | undefined
    /** The heading text font weight **/
    fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'bold'
    /** Forwarded ref **/
    ref?: React.Ref<HTMLHeadingElement> | undefined
}

const Base:FC<TitleProps> = (
    {
        fontWeight,
        headingLevel,
        children ,
        ...props
    }
) => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const sizes = {
        'h1': isTabletOrMobile ? 42: 60,
        'h2': isTabletOrMobile ? 30:42,
        'h3': isTabletOrMobile ? 37:30,
        'h4': isTabletOrMobile ? 24:27,
        'h5': isTabletOrMobile ? 21:24,
        'h6': isTabletOrMobile ? 16:20,
    }

    return createElement(headingLevel, {
            ...props,
            style: {fontSize: `${sizes[headingLevel]}px`,fontWeight: fontWeight},
        },
        children
    )
};

export const Title = styled(Base)`
  margin-bottom: 1rem;
  color: ${({ color }) => color || 'inherit'}
`;