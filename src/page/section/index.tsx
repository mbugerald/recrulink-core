import React, {FC, HTMLAttributes} from "react";
import styled from "styled-components";

export interface PageSectionProps extends HTMLAttributes<HTMLDivElement>{
    backgroundColor?: string
    padding?: {
        default?: "noPadding" | number,
        paddingLeft?: "noPadding" | number
        paddingRight?: "noPadding" | number
        paddingTop?: "noPadding" | number
        paddingBottom?: "noPadding" | number
    }
    borderRadius?: {
        default?: "noBorder" | number,
        borderBottomLeftRadius?: "noBorder" | number
        borderBottomRightRadius?: "noBorder" | number
        borderTopLeftRadius?: "noBorder" | number
        borderTopRightRadius?: "noBorder" | number
    }
}

const Base:FC<PageSectionProps> = (
    {
        backgroundColor,
        children,
        ...props
    }
) => {
    return (
        <section {...props}>
            {children}
        </section>
    )
}

export const PageSection = styled(Base)`
  position: relative;
  background-color: ${({backgroundColor}) => backgroundColor || "#E0E0E0"};
  padding: ${({ padding }) => padding ? padding?.default === "noPadding" ? 0 : `${padding.default}px`: '1rem'};
  padding-left: ${({ padding }) => padding ? padding?.paddingLeft === "noPadding" ? 0 : `${padding.paddingLeft}px`: '1rem'};
  padding-right: ${({ padding }) => padding ? padding?.paddingRight === "noPadding" ? 0 : `${padding.paddingRight}px`: '1rem'};
  padding-top: ${({ padding }) => padding ? padding?.paddingTop === "noPadding" ? 0 : `${padding.paddingTop}px`: '1rem'};
  padding-bottom: ${({ padding }) => padding ? padding?.paddingBottom === "noPadding" ? 0 : `${padding.paddingBottom}px`: '1rem'};
  border-radius: ${({ borderRadius }) => borderRadius ? borderRadius?.default === "noBorder" ? 0 : `${borderRadius.default}px`: '1rem'};
  border-bottom-left-radius: ${({ borderRadius }) => borderRadius ? borderRadius?.borderBottomLeftRadius === "noBorder" ? 0 : `${borderRadius.borderBottomLeftRadius}px`: 0};
  border-bottom-right-radius: ${({ borderRadius }) => borderRadius ? borderRadius?.borderBottomRightRadius === "noBorder" ? 0 : `${borderRadius.borderBottomRightRadius}px`: 0};
  border-top-right-radius: ${({ borderRadius }) => borderRadius ? borderRadius?.borderTopRightRadius === "noBorder" ? 0 : `${borderRadius.borderTopRightRadius}px`: 0};
  border-bottom-left-radius: ${({ borderRadius }) => borderRadius ? borderRadius?.borderTopLeftRadius === "noBorder" ? 0 : `${borderRadius.borderTopLeftRadius}px`: 0};
  margin-right: ${(props) =>
          // @ts-ignore
          props["shift"] && props["shift"]["allRight"] ? typeof props["shift"]["allRight"] === "string" ? props["shift"]["allRight"]: `${props["shift"]["allRight"]}px`: 0};
  margin-left: ${(props) =>
          // @ts-ignore
          props["shift"] && props["shift"]["allLeft"] ? typeof props["shift"]["allLeft"] === "string" ? props["shift"]["allLeft"]: `${props["shift"]["allLeft"]}px`: 0};
`;