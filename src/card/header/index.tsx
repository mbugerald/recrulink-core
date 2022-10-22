import React, {FC, HTMLAttributes, ReactNode, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {FaEllipsisV} from 'react-icons/fa';
import {motion} from 'framer-motion';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement>{
    align?: 'start' | 'end' | 'center' | undefined
    justify?: 'start' | 'end' | 'center' |undefined
    wrap?: 'no-wrap' | 'wrap' | 'wrap-inverse' | undefined
    gap?: number
    hasActions?: boolean
    actions?: ReactNode | undefined
}

const Base:FC<CardHeaderProps> = (
    {
        align,
        justify,
        wrap,
        gap,
        hasActions,
        actions,
        children,
        ...props
    }
) => {

    const [ isActionOpen, openAction ] = useState<boolean>(false);
    const headerRef = useRef<HTMLHeadElement>(null);

    const toggleOpen = () => {
        openAction(!isActionOpen);
    };

    const handleClickOutside = (e: any) => {
        if(!headerRef.current?.contains(e.target)) {
            openAction(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
    }, []);

    return (
        <nav {...props} ref={headerRef}>
            <div className='container'>
                {children}
            </div>
            {hasActions && (
                <div className='actions'>
                    <FaEllipsisV onClick={toggleOpen}/>
                    {isActionOpen && actions && (
                        <motion.div
                            className='dropdown'
                            initial={{ opacity: 0.8, y: 10}}
                            animate={{ opacity: 1, y: 28}}
                        >
                            {actions}
                        </motion.div>
                    )}
                </div>
            )}
        </nav>
    )
};

export const CardHeader = styled(Base)`
  
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: grid;
  padding: 1rem;
  position: relative;
  grid-template-columns: ${({ hasActions}) => hasActions ? '90% 10%': '1fr' };

  .container {
    display: flex;
    flex-wrap: ${({ wrap }) => wrap};
    align-items: ${({ align }) => align === 'center' ? 'center' : `flex-${align}`};
    justify-content: ${({ justify }) => justify === 'center' ? 'center' : `flex-${justify}`};
    gap: ${({ gap }) => `${gap}`};
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    svg {
      color: inherit;
      cursor: pointer;
    }

    .dropdown {
      position: absolute;
      min-width: 150px;
      top: 0;
      right: 0;
      margin: 0;
      padding: 1rem;
      border-radius: 6px;
      z-index: 1;
      background: #F1F7F9;
      box-shadow: 0 4px 6px rgb(32 33 36 / 10%);
      transform-style: preserve-3d;
      max-width: 100%;
      word-wrap: break-word;


      &:before {
        position: absolute;
        content: '';
        height: 20px;
        width: 20px;
        right: 8px;
        z-index: -999;
        background-color: inherit;
        top: -4px;
        transform: rotate(45deg) translateZ(-1px);
      }
    }
  }
`;