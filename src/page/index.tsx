import React, {Children, FC, HTMLAttributes, cloneElement} from "react";
import styled from "styled-components";

export interface PageProps extends HTMLAttributes<HTMLDivElement>{
    backgroundColor?: string
    padding?: {
        default?: "noPadding" | number,
        paddingLeft?: "noPadding" | number
        paddingRight?: "noPadding" | number
        paddingTop?: "noPadding" | number
        paddingBottom?: "noPadding" | number
    }
    shift?: {
        allLeft?: number | string | undefined
        allRight?: number | string | undefined
    }
}

const Base:FC<PageProps> = (
    {
        backgroundColor,
        children,
        shift,
        ...props
    }
) => {

    const allChildren = Children.map(children, (child) => {
        if (!child) {
            return null
        } else {
            // @ts-ignore
            return cloneElement(child, {
                shift: shift
            });
        }
    });

    return (
        <main {...props}>
            {allChildren}
        </main>
    )
}

export const Page = styled(Base)`
  position: relative;
  background-color: ${({backgroundColor}) => backgroundColor || "#E0E0E0"};
  padding: ${({ padding }) => padding ? padding?.default === "noPadding" ? 0 : `${padding.default}px`: '1rem'};
  padding-left: ${({ padding }) => padding ? padding?.paddingLeft === "noPadding" ? 0 : `${padding.paddingLeft}px`: '1rem'};
  padding-right: ${({ padding }) => padding ? padding?.paddingRight === "noPadding" ? 0 : `${padding.paddingRight}px`: '1rem'};
  padding-top: ${({ padding }) => padding ? padding?.paddingTop === "noPadding" ? 0 : `${padding.paddingTop}px`: '1rem'};
  padding-bottom: ${({ padding }) => padding ? padding?.paddingBottom === "noPadding" ? 0 : `${padding.paddingBottom}px`: '1rem'};
`;