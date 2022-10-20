import React, {FC, forwardRef, HTMLAttributes} from "react";
import styled from "styled-components";

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
    sm?: Cols
    md?: Cols
    lg?: Cols
    lgOffset?: Cols
    smOffset?: Cols
    mdOffset?: Cols
    rowSpan?: Cols
    lgRowSpan?: Cols
    smRowSpan?: Cols
    mdRowSpan?: Cols
    offset?: Cols
    ref?: React.Ref<HTMLDivElement> | undefined
    padding?: {
        default?: "noPadding" | number,
        paddingLeft?: "noPadding" | number
        paddingRight?: "noPadding" | number
        paddingTop?: "noPadding" | number
        paddingBottom?: "noPadding" | number
    }
    smHidden?: boolean
    mdHidden?: boolean
    lgHidden?: boolean
    hidden?: boolean
}

const Base:FC<GridItemProps> = forwardRef((
    {
        sm,
        md,
        lg,
        lgOffset,
        smOffset,
        mdOffset,
        rowSpan,
        lgRowSpan,
        mdRowSpan,
        smRowSpan,
        smHidden,
        mdHidden,
        lgHidden,
        hidden,
        offset,
        children,
        ...props
    },
    ref
) => {

    return (
        <div {...props} ref={ref}>
            {children}
        </div>
    )
});

const gridColumns = (variant: number |undefined, offset: number|undefined, variantOffset: number|undefined,) => {
    if (variant) {
        if (offset) {
            return `${offset+1}/${variant+(offset+1)}`
        } else if (variantOffset) {
            return `${variantOffset+1}/${variant+(variantOffset+1)}`
        } else {
            return `span ${variant}`
        }
    } else {
        return "span 12"
    }
};

const gridRows = (variant: number |undefined, rowSpan: number|undefined) => {
    if (rowSpan) {
        return `span ${rowSpan}`
    } else if (variant) {
        return `span ${variant}`
    } else {
        return "auto"
    }
};

export const GridItem = styled(Base)`
  display: block;
  right: auto;
  left: auto;
  box-sizing: border-box;
  padding: ${({ padding }) => padding ? padding?.default === "noPadding" ? 0 : `${padding.default}px`: '1rem'};
  padding-left: ${({ padding }) => padding ? padding?.paddingLeft === "noPadding" ? 0 : `${padding.paddingLeft}px`: '1rem'};
  padding-right: ${({ padding }) => padding ? padding?.paddingRight === "noPadding" ? 0 : `${padding.paddingRight}px`: '1rem'};
  padding-top: ${({ padding }) => padding ? padding?.paddingTop === "noPadding" ? 0 : `${padding.paddingTop}px`: '1rem'};
  padding-bottom: ${({ padding }) => padding ? padding?.paddingBottom === "noPadding" ? 0 : `${padding.paddingBottom}px`: '1rem'};

  @media screen and (min-width: 1024px)
  {
    grid-column: ${({lg, offset, lgOffset}) => gridColumns(lg, offset, lgOffset)};
    grid-row: ${({ lgRowSpan, rowSpan }) => gridRows(lgRowSpan, rowSpan)};
    display: ${({ lgHidden, hidden }) => hidden ? "none": lgHidden ? "none": "block"};
  }

  @media screen and (max-width: 1023px)
  {
    grid-column: ${({md, offset, mdOffset}) => gridColumns(md, offset, mdOffset)};
    grid-row: ${({ mdRowSpan, rowSpan }) => gridRows(mdRowSpan, rowSpan)};
    display: ${({ mdHidden, hidden }) => hidden ? "none": mdHidden ? "none": "block"};
  }

  @media screen and (max-width: 767px)
  {
    grid-column: ${({sm, offset, smOffset}) => gridColumns(sm, offset, smOffset)};
    grid-row: ${({ smRowSpan, rowSpan }) => gridRows(smRowSpan, rowSpan)};
    display: ${({ smHidden, hidden }) => hidden ? "none": smHidden ? "none": "block"};
  }
`;