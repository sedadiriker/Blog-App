import {keyframes} from "@emotion/react"
import styled from "@emotion/styled";


const spin = keyframes`
  0%,
  100% {
    box-shadow: .2em 0px 0 0px currentColor;
  }
  12% {
    box-shadow: .2em .2em 0 0 currentColor;
  }
  25% {
    box-shadow: 0 .2em 0 0px currentColor;
  }
  37% {
    box-shadow: -.2em .2em 0 0 currentColor;
  }
  50% {
    box-shadow: -.2em 0 0 0 currentColor;
  }
  62% {
    box-shadow: -.2em -.2em 0 0 currentColor;
  }
  75% {
    box-shadow: 0px -.2em 0 0 currentColor;
  }
  87% {
    box-shadow: .2em -.2em 0 0 currentColor;
  }
`;

export const Loader = styled.div`
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: #CA957C;
  position: relative;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: ${spin} 1s linear infinite;
  }

  &:after {
    color: #5E92A7;
    transform: rotateY(70deg);
    animation-delay: .4s;
  }
`;


export const BoxContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "79vh",
  py: 2,
};



export const GreenBtn = {
  color: "green",
  "&:hover": {
    backgroundColor: "#FFF0D4"
  }
};

