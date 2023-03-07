import styled from "styled-components";
import { SendPlugin } from "./sendplugin";
import { DataWeb } from "./dataweb";

const DashBoardContainer = styled.div`
  margin-left: 20px;
  padding: 15px;

  .ant-form{
    width: 50%;
 
  }

  h1{
    font-size: 1.5rem;
  }

  .ant-form-item {
    margin-bottom: 10px;
    }
`;




export const DashBoard = () => {
  document.title = "Dashboard | Perfil do administrador";
  return (
    <div>
      <DashBoardContainer>
        <h1>Controle dos Plugins</h1>
        <DataWeb />
        <SendPlugin />
      </DashBoardContainer>
    </div>
  );
};
