import React, {Children, cloneElement, FC, forwardRef, HTMLAttributes} from "react";
import styled from "styled-components";
import {GridItem} from "./item";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    /** Content rendered inside the grid in this case GridItem **/
    children?: JSX.Element | JSX.Element[];
    /** Space dimension between grid items in the grid **/
    hasGutter?: boolean
    /** Forwarded ref **/
    ref?: React.Ref<HTMLDivElement> | undefined
    /** Grid body paddings **/
    padding?: {
        default?: "noPadding" | number,
        paddingLeft?: "noPadding" | number
        paddingRight?: "noPadding" | number
        paddingTop?: "noPadding" | number
        paddingBottom?: "noPadding" | number
    }
}

const Base:FC<GridProps> = forwardRef((
    {
        children,
        hasGutter,
        padding,
        ...props
    },
    ref
) => {

    const allChildren = Children.map(children, (child) => {
        if (!child) {
            return null
        } else if (child && ![GridItem].includes("type" in child && child.type)) {

            throw new Error(
                // @ts-ignore
                `<${child?.type}/> DOM element is not allowed inside <Card/> component.`
            )
        } else {
            // @ts-ignore
            return cloneElement(child, {

            });
        }
    });

    return (
        <div {...props} ref={ref}>
            {allChildren}
        </div>
    )
});

export const Grid = styled(Base)`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-gap:  ${({hasGutter}) => hasGutter && "1rem"};
  padding: ${({ padding }) => padding ? padding?.default === "noPadding" ? 0 : `${padding.default}px`: '1rem'};
  padding-left: ${({ padding }) => padding ? padding?.paddingLeft === "noPadding" ? 0 : `${padding.paddingLeft}px`: '1rem'};
  padding-right: ${({ padding }) => padding ? padding?.paddingRight === "noPadding" ? 0 : `${padding.paddingRight}px`: '1rem'};
  padding-top: ${({ padding }) => padding ? padding?.paddingTop === "noPadding" ? 0 : `${padding.paddingTop}px`: '1rem'};
  padding-bottom: ${({ padding }) => padding ? padding?.paddingBottom === "noPadding" ? 0 : `${padding.paddingBottom}px`: '1rem'};
`;