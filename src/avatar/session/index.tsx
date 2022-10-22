import React, {createElement, FC, Fragment, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {HTMLMotionProps, motion} from 'framer-motion';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import {IconType} from 'react-icons';
import {useNavigate} from '@tanstack/react-location';

export interface SessionAvatarProps extends HTMLMotionProps<'div'> {
    dropdownBackground?: string | undefined
    dropdownColor?: string | undefined
    height?: number
    width?: number
    image: {
        src: string | undefined
        alt: string | undefined
    }
    options?: {
        icon?: IconType | undefined,
        title?: string | undefined,
        link?: string | undefined
    }[]
}

const Base:FC<SessionAvatarProps> = (
    {
        image,
        height,
        width,
        options,
        dropdownBackground,
        dropdownColor,
        ...props
    }
) => {

    const [ isOpen, setOpen ] = useState<boolean>(false);
    const avatarRef = useRef<any>(null);
    const navigateTo = useNavigate();

    const toggleOpen = () => setOpen(!isOpen);

    const handleClickOutside = (e: any) => {
        if(!avatarRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
    }, []);

    return (
        <motion.div {...props} ref={avatarRef}>
            <LazyLoadImage
                alt={image?.alt}
                height={height}
                src={image?.src}
                width={width}
                className='image'
                onClick={toggleOpen}
            />
            {createElement(
                isOpen ? AiOutlineUp : AiOutlineDown,
                {
                    className: 'dropdown_icon'
                },
                null
            )}
            {isOpen &&(
                <motion.ul
                    className='dropdown'
                    initial={{ top: 30}}
                    animate={{ top: 60}}
                >
                    {options?.map(({title, icon, link}, idx) => (
                        <motion.li key={idx} className='dropdown_option' onClick={() => navigateTo({to: link, replace: true})}>
                            <Fragment>
                                {icon && (
                                    <span className='icon'>
                                        {createElement(icon, {}, null)}
                                    </span>
                                )}
                                <p className='title'>{title}</p>
                            </Fragment>
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </motion.div>
    )
};

export const SessionAvatar = styled(Base)`

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  height: ${({ width }) => width ? `${width}px` : '45.68px'};
  cursor: pointer;
  position: relative;
  max-width: 140px;
  font-family: Inter,sans-serif;

  .image {
    width: ${({ height}) => height ? `${height}px`: '48.3px'};
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    mix-blend-mode: normal;
  }

  .dropdown_icon{
    font-size: 1vw;
  }

  .dropdown {
    position: absolute;
    min-width: 160px;
    background-color: ${({ dropdownBackground }) => dropdownBackground || '#4F95B0'};
    color: ${({ dropdownColor }) => dropdownColor || '#FFF'};
    z-index: 15;
    border-radius: 6px;
    padding: 1rem;
    box-shadow: 0 11px 22px rgba(21, 74, 95, 0.05);
    margin: 0;
    list-style-type: none;

    &:before {
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      background-color: ${({ dropdownBackground }) => dropdownBackground || '#4F95B0'};
      left: 20px;
      top: -2px;
      transform: rotate(45deg);
      z-index: 9;
    }

    @media screen and (max-width: 956px) {
      left: 0;
      right: auto;
    }

    .dropdown_option {
      padding: 1rem 0;
      display: flex;
      flex-direction: row;
      gap: 20px;
      flex-wrap: wrap;

      .icon {
        width: 35px;
        height: 35px;
        background-color: ${({ dropdownBackground }) => dropdownBackground || '#115D7A'};
        color: ${({ dropdownColor }) => dropdownColor || '#FFF'};
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          font-size: 20px;
        }
      }
      
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
      }
    }
  }
`;