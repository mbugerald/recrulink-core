import React, {createElement, FC, forwardRef, Fragment, HTMLAttributes, useRef} from "react";
import styled from "styled-components";
import {IconType} from "react-icons";
import {motion} from "framer-motion";

export interface TextInputProps extends HTMLAttributes<HTMLInputElement>{
    icon?: IconType
    isBlocked?: boolean | undefined
    placeholder?: string
    iconPosition?: "left" | "right"
    value?: string
    defaultValue?: string,
    name?: string
    validated?: "error" | "success" | "warning" | "default" | undefined
    borderColor?: string
    ref?: React.Ref<HTMLDivElement> | undefined
}

const validation = {
    success: {
        borderBottom: "1px solid #3e8635",
        iconColor: "#3e8635"
    },
    error: {
        borderBottom: "1px solid #a30000",
        iconColor: "#a30000"
    },
    warning: {
        borderBottom: "1px solid #f0ab00",
        iconColor: "#f0ab00"
    },
    default: {
        borderBottom: "1px solid #3e8635",
        iconColor: "#3e8635"
    }
}

const Base:FC<TextInputProps> = forwardRef((
    {
        icon,
        iconPosition,
        children,
        value,
        defaultValue,
        name,
        validated,
        borderColor,
        ...props
    },
    ref
) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Fragment>
            {(inputRef.current?.value.length!! > 0 && props.placeholder )&& (
                <motion.label
                    htmlFor={name}
                    initial={{ y: -200, opacity: 0.4}}
                    animate={{ y: 0, opacity: 1, fontSize: '14px', color: 'inherit'}}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    {props.placeholder}
                </motion.label>
            )}
            <div {...props} ref={ref}>
                {(icon && iconPosition !== "right" )&& createElement(icon, {className: "icon"}, null)}
                <input
                    type="text"
                    className={"text-input"}
                    placeholder={props.placeholder|| "Placeholder"}
                    value={value}
                    defaultValue={defaultValue}
                    name={name}
                    ref={inputRef}
                />
                {(icon && iconPosition === "right" )&& createElement(icon, {className: "icon"}, null)}
            </div>
        </Fragment>
    )
});

export const TextInput = styled(Base)`

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: ${({validated, borderColor}) =>
          validated ? validation[validated].borderBottom : `1px solid ${borderColor || "#000000"}`};
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  font-family: Inter, sans-serif;

  .icon {
    color: ${({validated}) =>
            validated ? validation[validated].iconColor : "inherit"};
    margin: auto 0;
    height: 23px;
    width: 23px;
  }

  .text-input {
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    padding: 0.35rem 0;
    font-size: 20px;
    line-height: 34.48px;
    flex: 1;

    &::placeholder {
      color: rgba(152, 178, 188, 0.6);
      font-size: 20px;
      line-height: 34.48px;
    }
  }
`;
