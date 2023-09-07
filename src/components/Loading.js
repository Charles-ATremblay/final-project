import {ImSpinner} from "react-icons/im"
import { styled, keyframes } from "styled-components";

const Loading = () => {
    return (<SpinnerDiv><StyledSpinner /></SpinnerDiv>)
};

const Spinning = keyframes`
    0% {
        transform: rotate(0deg)
    }
    50% {
        transform: rotate(180deg)
    }
    100% {
        transform: rotate(360deg)
    }
`;

const SpinnerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #d3d3d3;
`;

const StyledSpinner = styled(ImSpinner)`
    height: 50px;
    width: fit-content;
    animation: ${Spinning} 1.2s linear infinite;
`;

export default Loading;