import React, {FC, forwardRef, HTMLAttributes} from 'react';
import styled from 'styled-components';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'warning' | 'danger'
    ref?: React.Ref<HTMLSpanElement> | undefined
    height?: number | undefined
    width?: number | undefined
}

type PaletteTypes = {
    primary: 'primary',
    warning: 'warning',
    danger:'danger'
}

export const BadgeVariants:PaletteTypes = {
    primary: 'primary',
    warning: 'warning',
    danger:'danger'
}

const palettes = {
    primary : {
        bg: '#E2F4F5',
        fg: '#3C999E'
    },
    warning: {
        bg: '#FCF7E5',
        fg: '#E3A515'
    },
    danger: {
        bg: '#faeae8',
        fg: '#c9190b'
    }
};

const Base:FC<BadgeProps> = forwardRef((
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

export const Badge = styled(Base)`
  background-color: ${({ variant}) => variant ?
          palettes[BadgeVariants[variant]].bg:
          palettes[BadgeVariants.primary].bg};
  color: ${({ variant}) => variant ?
          palettes[BadgeVariants[variant]].fg:
          palettes[BadgeVariants.primary].fg};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => width ? `${width}px` : 'max-content'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-weight: 500;
  line-height: 17px;
  border-radius: 6px;
  cursor: pointer;
`;