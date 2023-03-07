import styled from "styled-components"

const FooterComponent = styled.footer`
    background-color: #1a0c2b;
    height: 200px;
    width: 80%;
    margin: 0 auto;
    border-radius: 10px 10px 0 0;
    padding: 15px;
    h1{
        color: #fff;
        font-size: 2.5rem;
    }
`

export const Footer = () => {
    return(
        <FooterComponent>
            <h1>Sobre a Galaxy Plugins</h1>
        </FooterComponent>
    )
}