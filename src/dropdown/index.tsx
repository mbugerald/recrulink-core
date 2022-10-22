import React, {
    createElement,
    Dispatch,
    FC,
    HTMLAttributes,
    ReactNode,
    SetStateAction,
    useEffect,
    useRef,
    useState
} from 'react';
import styled from 'styled-components';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import {motion} from 'framer-motion';
import {IconType} from 'react-icons';
import {useNavigate} from '@tanstack/react-location';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'pale' | 'plain'
    isBlocked?: boolean | undefined
    options?: {
        icon?: IconType,
        value?: string,
        link?: string
    }[]
    children?: ReactNode | ReactNode[]
    title: string
    onSelected: Dispatch<SetStateAction<string>>
    isNavigable?: boolean | undefined
    dropdownBackground?: string | undefined
    dropdownColor?: string | undefined
}

type PaletteTypes = {
    primary: 'primary' | 'secondary' | 'tertiary' | 'pale' | 'plain',
    secondary: 'primary' | 'secondary' | 'tertiary' | 'pale' | 'plain',
    tertiary: 'primary' | 'secondary' | 'tertiary' | 'pale' | 'plain',
    pale : 'primary' | 'secondary' | 'tertiary' | 'pale' | 'plain'
    plain : 'primary' | 'secondary' | 'tertiary' | 'pale' | 'plain'
}

export const DropdownVariants:PaletteTypes = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    pale : 'pale',
    plain : 'plain'
}

const palettes = {
    primary: {
        bg: '#4F95B0',
        fg: '#ffffff',
        border: '1px solid #4F95B0'
    },
    secondary: {
        bg: '#144052',
        fg: '#ffffff',
        border: '1px solid #144052'
    },
    tertiary: {
        bg: '#F7F7F7',
        fg: '#000000',
        border: '1px solid #F7F7F7'
    },
    plain: {
        bg: 'inherit',
        fg: 'inherit',
        border: '1px solid #FFFFFF'
    },
    pale: {
        bg: '#FFFFFF',
        fg: '#144052',
        border: '1px solid #FFFFFF'
    }
}

const Base:FC<DropdownProps> = (
    {
        options,
        title,
        onSelected,
        isNavigable,
        dropdownBackground,
        dropdownColor,
        ...props
    }
) => {

    const [ isOpen, setOpen ] = useState<boolean>(false);
    const dropdownRef = useRef<any>(null);
    const [ selected, setSelected ] = useState<string|undefined>(undefined);
    const navigateTo = useNavigate();

    const toggleOpen = () => {
        setOpen(!isOpen);
    };

    const handleClickOutside = (e: any) => {
        if(!dropdownRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
    }, []);

    useEffect(() => {
        selected && onSelected(selected)
    }, [selected]);

    const selectOption = (value: string |undefined, link?: string) => {
        if (isNavigable) {
            setSelected(value);
            navigateTo({to: link, replace: true});
        } else {
            setSelected(value);
        }
    }

    return (
        <div ref={dropdownRef} onClick={toggleOpen}{...props}>
            <label htmlFor='dropdown'>
                {selected || title}{' '}{
                !isOpen ?
                    (<AiOutlineDown className='dropdown-icon'/>):
                    (<AiOutlineUp className='dropdown-icon'/>)}
            </label>
            {isOpen && (
                <motion.ul className='dropdown'
                           initial={{ opacity: 0.2, top: 0}}
                           animate={{ opacity: 1, top: '132%'}}
                >
                    {options?.map((option, idx) => (
                        <li key={idx} onClick={() => selectOption(option.value, option.link)}>
                            {option.icon && (
                                <span className='icon'>
                                    {createElement(option.icon, {}, null)}
                                </span>
                            )}
                            {option.value}
                        </li>
                    ))}
                </motion.ul>
            )}
        </div>
    )
}

export const Dropdown = styled(Base)`

  border-radius: 3px;
  background-color: ${({ variant }) =>
          variant ? palettes[DropdownVariants[variant]].bg : palettes[DropdownVariants.primary].bg};
  color: ${({ variant }) =>
          variant ? palettes[DropdownVariants[variant]].fg : palettes[DropdownVariants.primary].fg};
  border: ${({ variant }) =>
          variant ? palettes[DropdownVariants[variant]].border : palettes[DropdownVariants.primary].border};
  width: ${({ isBlocked }) => isBlocked && '100%'};
  cursor: pointer;
  padding: 1rem;
  position: relative;
  font-family: Inter, sans-serif;

  label {
    display: flex;
    position: relative;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    flex-wrap: wrap;
    .dropdown-icon {
      margin-left: 10px;
    }
  }

  .dropdown {
    position: absolute;
    width: 100%;
    top: 140%;;
    left: 0;
    z-index: 10;
    background-color: inherit;
    margin: 0;
    padding: 1rem;
    list-style-type: none;
    border-radius: 6px;
    box-sizing: border-box;

    li {
      margin: 10px 0;
      padding: 0.67rem 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      
      a {
        color: inherit;
        cursor: pointer;
        text-decoration: none;
      }
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
    }

    &:before {
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      background-color: inherit;
      left: 20px;
      top: -6px;
      transform: rotate(45deg);
      z-index: 9;
    }
  }
`;

export default Dropdown;