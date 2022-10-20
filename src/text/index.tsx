import React, {createElement, FC, forwardRef, HTMLAttributes} from "react";
import styled from "styled-components";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement>{
    /** Paragraph text size **/
    size?: number| undefined
    /** Forwarded ref **/
    ref?: React.Ref<HTMLParagraphElement> | undefined
}

const Base:FC<TextProps> = forwardRef((
    {
        size,
        children,
        ...props
    },
    ref
) => {

    return createElement("p", {
            ...props,
            style: {fontSize: size ? `${size}px` : 14 },
            ref: ref
        },
        children
    )
});

export const Text = styled(Base)`
  margin-bottom: 1rem;
  line-height: 24px;
`;
