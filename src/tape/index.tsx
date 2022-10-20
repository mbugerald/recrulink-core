import React, {Children, cloneElement, Dispatch, FC, SetStateAction} from "react";
import styled from "styled-components";
import {BsChevronRight} from "react-icons/bs";

export interface TapeProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'>{
    ref?: React.Ref<HTMLDivElement>
    children?: JSX.Element | JSX.Element[]
    backgroundColor?: string
    isExpandable?: boolean
    expandedAction?: Dispatch<SetStateAction<any>>
}

const Base:FC<TapeProps> =(
    {
        children,
        isExpandable,
        backgroundColor,
        expandedAction,
        ...props
    }
) => {

    const allChildren = Children.map(children, (child) => {
        if (!child) {
            return null
        } else if (child && ![TapeItem].includes("type" in child && child.type)) {
            throw new Error(
                // @ts-ignore
                `<${child?.type}/> DOM element is not allowed inside <Card/> component.`
            )
        } else {
            // @ts-ignore
            return cloneElement(child, {
                isExpandable: isExpandable
            });
        }
    });

    return (
        <div {...props} onClick={expandedAction}>
            {allChildren}
            {isExpandable && <BsChevronRight className="expansion"/>}
        </div>
    )
};

export const Tape = styled(Base)`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  box-sizing: border-box;
  overflow: hidden;
  background-color: ${({backgroundColor}) => backgroundColor || "#FFF"};
  width: 100%;
  box-shadow: 0 0 18px rgba(73, 75, 88, 0.1);
  border-radius: 6px;
  padding: 1rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: Inter, sans-serif;
  cursor: ${({ isExpandable }) => isExpandable && "pointer"};
  opacity: ${({ isExpandable }) => isExpandable && "0.87"};

  @media screen and (max-width: 768px) {
    flex-direction: ${({ isExpandable }) => isExpandable ? "row": "column"};
  }
  
  .expansion {
    cursor: pointer;
  }
  
  & > div:not(:first-child) {
    display: ${(props) => props["isExpandable"] && "none"};
  }
`;

export interface TapeItemProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'>{
    ref?: React.Ref<HTMLDivElement>
    children?: JSX.Element | JSX.Element[]
    backgroundColor?: string
    smHidden?: boolean
    mdHidden?: boolean
    lgHidden?: boolean
}

export const TapeItem = styled.div<TapeItemProps>`
  background-color: ${({backgroundColor}) => backgroundColor || "inherit"};
  flex: 1;
  padding: 1rem;
  
  @media screen and (min-width: 1024px)
  {
    display: ${({lgHidden}) => lgHidden && "none"};  }

  @media screen and (max-width: 1023px)
  {
    display: ${({mdHidden}) => mdHidden && "none"};
  }

  @media screen and (max-width: 767px)
  {
    display: ${({smHidden}) => smHidden && "none"};
  }`;