import React, {Dispatch, forwardRef, HTMLAttributes, SetStateAction, useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";
import {motion} from "framer-motion";
import {GoLocation, GoSearch} from "react-icons/go";
import {AiOutlineDown, AiOutlineUp} from "react-icons/ai";
import {useMediaQuery} from "react-responsive";

export interface JobFilterProps extends HTMLAttributes<HTMLDivElement> {
    submitText: string
    placeholderPost: string
    placeholderLocation: string
    backgroundColor?: string | undefined
    textColor?: string | undefined
    isCentered?: boolean | undefined
    options: {name: string, id: string|number}[]
    handleSelected?: Dispatch<SetStateAction<{[key: string]: any}>>
    ref?: React.Ref<HTMLDivElement> | undefined
    resultCount?: number|undefined
}

const Base:React.FC<JobFilterProps> = forwardRef((
    {
        placeholderPost,
        placeholderLocation,
        submitText,
        backgroundColor,
        textColor,
        isCentered,
        options,
        handleSelected,
        resultCount,
        ...props
    },
    ref
) => {

    const [ location, setLocation ] = useState<{
        name: string,
        id: string|number
    }|undefined>(options[0]);
    const [ isOpen, setOpen ] = useState<boolean>(false);
    const isMobileScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const inputRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setOpen(!isOpen);

    const selectLocation = (
        {
            name,
            id
        }:{
            name: string,
            id: string|number
        }) => {
        setLocation({id, name});

    };

    const handleSubmit = () => {
        handleSelected && handleSelected({
            q: inputRef.current?.value|| "",
            ...location
        });
    };

    const handleClickOutside = (e: any) => {
        if(!locationRef.current?.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
    }, []);

    return (
        <div {...props} ref={ref}>
            <div className="search_post_box">
                <GoSearch size={23}/>
                <input ref={inputRef} placeholder={placeholderPost}/>
            </div>
            <div className="select_location_box">
                <GoLocation size={23}/>
                <div className="location" onClick={toggleOpen} ref={locationRef}>
                    <div className="selected">{location?.name || options[0].name}
                        {!isOpen ? <AiOutlineDown/>: <AiOutlineUp/>}
                    </div>
                    {isOpen && (
                        <motion.ul
                            className="options"
                            initial={{ opacity: 0.2, top: 30}}
                            animate={{ opacity: 1, top: isMobileScreen ? 52.2: 73.2}}
                        >
                            {options?.map((option) => (
                                <li key={option.id} onClick={() => selectLocation(option)}>
                                    {option.name}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </div>
            </div>
            <div className="submit">
                <button type="submit" onClick={handleSubmit}>{submitText}</button>
            </div>
            {resultCount && (
                <div className="results">
                    <i>Recherche: {resultCount} resutats avec la mention ¨{inputRef.current?.value}¨</i>
                </div>
            )}
        </div>
    )
});

const elements = () => css`
  height: 100%;
  background-color: inherit;
  align-items: center;
  display: flex;
  width: 90%;
  margin: 0 auto;
  font-size: 1.3rem;
  position: relative;
  color: #2a5d71;
  flex: 1;
  svg {
    color: #2A5D71;
    margin: 0 auto;
  }
  @media only screen and (max-width: 767px) { 
    margin: 0.5rem 0;
    width: 100%;
    border-radius: inherit;
    box-shadow: none;
    background-color: #FFF;
    &:first-child, &:nth-child(2) {
      padding: 1rem 0;
    }
  
    svg {
      margin: 0 auto;
    }
  }
`;

export const JobFilter = styled(Base)`

  background-color: #FFFFFF;
  box-shadow: 0 11px 22px rgba(21, 74, 95, 0.05);
  border-radius: 15px;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  min-height: 114px;
  width: 90%;
  margin: 0 auto;
  font-family: 'Inter',sans-serif;
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${({resultCount}) => resultCount && "1rem"} ;

  .search_post_box
  {
    ${elements()};
    border-right: 1px solid #E2F1F5;
    display: grid;
    grid-template-columns: 10% 90%;
    input
    {
      border: none;
      outline: none;
      color: #2A5D71;
      font-size: inherit;
      border-radius: inherit;
      &::placeholder
      {
        color: #638490;
        font-size: inherit;
      }
    }
  }

  .select_location_box
  {
    ${elements()};
    display: grid;
    grid-template-columns: 10% 90%;
    .location
    {
      width: 100%;
      cursor: pointer;
    }
    .selected
    {
      height: 100%;
      padding: 0.27rem 0.57rem;
      display: flex;
      align-items: center;
      svg {
        margin-left: auto;
        margin-right: 0;
        font-size: 20px
      }
    }
    .options
    {
      position: absolute;
      background-color: #FFF;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      width: 100%;
      margin: 0;
      padding: 1rem 0;
      list-style-type: none;
      box-shadow: 0 4px 6px rgba(21, 74, 95, 0.05);
      z-index: 20;
      left: 0;
      li {
        padding: 0.37rem 0.67rem;

      }
    }
  }

  .submit
  {
    ${elements()};
    button {
      height: 71px;
      width: 100%;
      margin-bottom: 10px;
      background: #3CB8DE;
      border-radius: 6px;
      font-size: 1.4vw;
      border: none;
      outline: none;
      cursor: pointer;
      color: #FFF;
      &:active {
        opacity: 0.67;
      }
    }
  }
  
  .results 
  {
    grid-column: 1/-1;
    border-top: 1px solid #E2F1F5;
    padding: 10px 1rem;
    color: #638490;
  }

  @media only screen and (max-width: 1023px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 1rem;
    grid-gap: 10px;
    .submit {
      grid-column: 1 / -1;
      width: 100%;
      button {
        font-size: 2.4vw
      }
    }
  }

  @media only screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    box-shadow: none;
    .submit {
      margin: 0;
      padding: 0;
      button {
        margin: 0;
        padding: 0;
      }
    }
  }
`;