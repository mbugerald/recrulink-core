import React, {createElement, FC} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import {BiLoaderAlt} from "react-icons/bi";
import {IconType} from "react-icons";

export interface ButtonProps extends  Omit<React.HTMLProps<HTMLButtonElement>, 'ref'> {
    /** Adds button variant styles **/
    variant?: "primary" | "secondary" | "tertiary" | "warning" | "link" | "plain" | "control" | "quaternary" | "quinary"
    /** Adds block styling to button **/
    isBlock?: boolean | undefined;
    /** Adds disabled styling and disables the button using the disabled html attribute **/
    isDisabled?: boolean | undefined;
    /** Adds progress styling to button **/
    isLoading?: boolean | undefined;
    /** Adds danger styling to secondary or link button variants **/
    isDanger?: boolean | undefined;
    /** Add inline position of the icon to the button's edge **/
    iconEdged?: boolean | undefined;
    /** Icon for the button. Usable by all variants and components of react-icons **/
    icon?: IconType;
    /** Sets button type **/
    type?: 'button' | 'submit' | 'reset';
    /** Content rendered inside the button **/
    children: React.ReactNode;
    /** Sets the base component to render. defaults to button **/
    component?: React.ElementType | React.ComponentType<any>;
    /** Forwarded ref **/
    innerRef?: React.Ref<any>;
}

type PaletteTypes = {
    primary: "primary"
    secondary: "secondary"
    tertiary:"tertiary"
    warning : "warning"
    link : "link"
    plain : "plain"
    control : "control"
    quaternary : "quaternary"
    quinary : "quinary"
}

export const ButtonVariants:PaletteTypes = {
    primary: "primary",
    secondary: "secondary",
    tertiary:"tertiary",
    warning : "warning",
    link : "link",
    plain : "plain",
    control : "control",
    quaternary : "quaternary",
    quinary : "quinary"
}

const palettes = {
    primary: {
        bg: "#3CB8DE",
        fg: "#ffffff",
        border: "1px solid #3CB8DE",
        danger: {
            bg: "#c9190b",
            fg: "#ffffff",
            border: "1px solid #c9190b"
        }
    },
    secondary: {
        bg: "inherit",
        fg: "#3CB8DE",
        border: "1px solid #3CB8DE",
        danger: {
            bg: "inherit",
            fg: "#c9190b",
            border: "1px solid #c9190b"
        }
    },
    tertiary: {
        bg: "inherit",
        fg: "#144052",
        border: "1px solid #144052  ",
        danger: {
            bg: "inherit",
            fg: "#c9190b",
            border: "1px solid #c9190b"
        }
    },
    quaternary: {
        bg: "#144052",
        fg: "#ffffff",
        border: "1px solid #144052",
        danger: {
            bg: "#c9190b",
            fg: "#ffffff",
            border: "1px solid #c9190b"
        }
    },
    quinary: {
        bg: "#E2F4F5",
        fg: "#3C999E",
        border: "1px solid #E2F4F5",
        danger: {
            bg: "#c9190b",
            fg: "#ffffff",
            border: "1px solid #c9190b"
        }
    },
    plain: {
        bg: "inherit",
        fg: "inherit",
        border: "1px solid #FFFFFF",
        danger: {
            bg: "inherit",
            fg: "#c9190b",
            border: "1px solid #c9190b"
        }
    },
    link: {
        bg: "inherit",
        fg: "#06c",
        border: "1px solid #FFFFFF",
        danger: {
            bg: "inherit",
            fg: "#c9190b",
            border: "none"
        }
    },
    control: {
        bg: "inherit",
        fg: "inherit",
        border: "1px solid #FFFFFF",
        danger: {
            bg: "inherit",
            fg: "#c9190b",
            border: "1px solid #c9190b"
        }
    },
    warning: {
        bg: "#f0ab00",
        fg: "#151515",
        border: "1px solid #f0ab00",
        danger: {
            bg: "#c9190b",
            fg: "#ffffff",
            border: "1px solid #c9190b"
        }
    },

};

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
};

const Base:FC<ButtonProps> =(
    {
        isBlock,
        isLoading,
        isDisabled,
        isDanger,
        iconEdged,
        icon,
        innerRef,
        children,
        ...props
    },
) => {

    return (
        <button ref={innerRef} {...props} disabled={isDisabled}>
            {isLoading && (
                <motion.div
                    className="spinner"
                    animate={{ rotate: 360 }}
                    transition={spinTransition}
                >
                    <BiLoaderAlt/>
                </motion.div>
            )}
            {children}
            {icon && createElement(
                icon, {
                    style: {
                        fontSize: "1.37rem",
                        marginLeft: iconEdged ? "auto": undefined
                    }}, null)}
        </button>
    )
};

export const Button = styled(Base)`
  background-color: ${({ variant, isDisabled, isDanger }) =>
          isDisabled ? "rgba(230, 230, 230, 0.97)" :
                  variant ? isDanger ?
                                  palettes[ButtonVariants[variant||"primary"]].danger.bg :
                                  palettes[ButtonVariants[variant||"primary"]].bg :
                          isDanger ? palettes[ButtonVariants.primary].danger.bg:
                                  palettes[ButtonVariants.primary].bg};
  color: ${({ variant, isDisabled, isDanger }) =>
          isDisabled ? "rgba(0, 0, 0, 0.48)" :
                  variant ? isDanger ?
                                  palettes[ButtonVariants[variant||"primary"]]["danger"].fg :
                                  palettes[ButtonVariants[variant||"primary"]].fg :
                          isDanger ? palettes[ButtonVariants.primary].danger.fg:
                                  palettes[ButtonVariants.primary].fg};
  border: ${({ variant, isDisabled, isDanger }) =>
          isDisabled ? "#d2d2d2d2" :
                  variant ? isDanger ?
                                  palettes[ButtonVariants[variant||"primary"]]["danger"].border:
                                  palettes[ButtonVariants[variant||"primary"]].border :
                          isDanger ? palettes[ButtonVariants.primary].danger.border:
                                  palettes[ButtonVariants.primary].border};
  width: ${({ isBlock }) => isBlock && "100%"};
  position: relative;
  display: flex;
  grid-template-columns: ${({ isLoading, icon }) => (isLoading && icon) ? "20% 60% 20%": isLoading ? "20% 80%": icon ? "80% 20%": "1fr"};
  grid-gap: ${({ isLoading }) => isLoading && "6px"};
  align-items: center;
  justify-content: ${({ isBlock }) => isBlock && "center"};
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;
  padding: ${({ isLoading }) => isLoading ? "0.375rem 1.172rem": "0.375rem 0.852rem"};
  outline:none;
  line-height: 1.5px;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  border-radius: 6px;
  min-height: 41px;
  font-family: 'Inter',sans-serif;

  .spinner {
    margin: 0;
    height: 60%;
    position: relative;
  }

  &:hover {
    opacity: 0.95;
  }

  &:active {
    opacity: ${({ isDisabled }) => !isDisabled && 0.65};
  }
`;