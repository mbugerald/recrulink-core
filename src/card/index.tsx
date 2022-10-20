import React, {Children, cloneElement, FC, HTMLAttributes} from "react";
import styled from "styled-components";
import {CardHeader} from "./header";
import {CardBody} from "./body";
import {CardFooter} from "./footer";

export interface CardProps extends HTMLAttributes<HTMLDivElement>{
    children?: JSX.Element | JSX.Element[];
}

const Base:FC<CardProps> = ({ children, ...props}) => {

    const allChildren = Children.map(children, (child) => {
        if (!child) {
            return null
        } else if (child && ![CardHeader, CardFooter, CardBody].includes(child.type)) {
            throw new Error(
                `<${child.type}/> DOM element is not allowed inside <Card/> component.`
            )
        } else {
            return cloneElement(child, {

            });
        }
    });

    return (
        <div {...props}>
            {allChildren}
        </div>
    )
};

export const Card = styled(Base)`
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  padding: 0.25rem;
`;

