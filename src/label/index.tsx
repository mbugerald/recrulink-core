import React, {FC, forwardRef, HTMLAttributes} from 'react';
import styled from 'styled-components';

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'info' | 'warning' | 'danger' | 'success'
    ref?: React.Ref<HTMLLabelElement> | undefined
}

type PaletteTypes = {
    info: 'info',
    primary: 'primary',
    warning: 'warning',
    danger:'danger',
    success : 'success'
}

export const LabelVariants:PaletteTypes = {
    info: 'info',
    primary: 'primary',
    warning: 'warning',
    danger:'danger',
    success : 'success'
}

const palettes = {
    primary : {
        bg: '#7CCFD4',
        fg: '#FFFFFF'
    },
    info: {
        bg: '#EBEAFA',
        fg: '#4642D9'
    },
    warning: {
        bg: '#FCF7E5',
        fg: '#E3A515'
    },
    success: {
        bg: '#E2F4F5',
        fg: '#3C999E'
    },
    danger: {
        bg: '#faeae8',
        fg: '#c9190b'
    }
};

const Base:FC<LabelProps> = forwardRef((
    {
        children,
        ...props
    },
    ref
) => {

    return (
        <span ref={ref} {...props}>
            {children}
        </span>
    )
});

export const Label = styled(Base)`
  background-color: ${({ variant}) => variant ?
          palettes[LabelVariants[variant]].bg:
          palettes[LabelVariants.primary].bg};
  color: ${({ variant}) => variant ?
          palettes[LabelVariants[variant]].fg:
          palettes[LabelVariants.primary].fg};
  display: inline-block;
  padding: 0.67rem 1rem;
  font-weight: 500;
  line-height: 17px;
  border-radius: 6px;
  font-family: 'Inter',sans-serif;
`;