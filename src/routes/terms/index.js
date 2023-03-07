import styled from "styled-components";
import { Footer } from "../../components/footer";
import { NavBar } from "../../components/navbar";

 

const TermTextDiv = styled.div`
width: 50%;
text-align: center;


margin: 20px auto;
  span {
    padding: 0 10px;
  }
  p{
    text-align: left;
    color: #38333d;
    margin: 10px 0;
  }

`

export const Terms = () => {

  document.title = "GalaxyStore - Termos e Condições";

  return (
    <div>
        <NavBar />
        <TermTextDiv>
        <h1>Termos e Condições - GalaxyStore</h1>
      <p>
        1- Introdução e informações sobre A GalaxyStore é uma divisão própria
        focada no desenvolvimento e configuração de software em geral. Desde
        servidores* de Minecraft (não sendo afiliados com a Mojang Inc), plugins
        para servidores* de Minecraft, bots* para Discord, websites e prestações
        de serviço em geral.
      </p>
      <p>
        2- Proteção e manejamento de dados Nós fazemos coleta de dados e
        informações em geral sobre nossos usuários e clientes. Que se limitam a
        exclusivamente as informações, Mensagens em tickets
        abertos no nosso Discord, Número de mensagens enviadas por usuário,
        Avatares email, e Nickname, Não guardamos informações sobre servidores/plugins próprios do usuário.
        Encriptografamos dados como e-mails e senhas que são providos pelo
        usuário nos nossos sites.
      </p>
        </TermTextDiv>
      <Footer />
    </div>
  );
};
