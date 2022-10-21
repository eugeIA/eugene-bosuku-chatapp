import React from "react";
import styled from "styled-components";
import { IoCamera } from "react-icons/io5";

function SendFile(){
    return(
        <Input type="file">
           <IoCamera />
        </Input>
    )
}

const Input=styled.input`
svg{

}`;

export default SendFile;