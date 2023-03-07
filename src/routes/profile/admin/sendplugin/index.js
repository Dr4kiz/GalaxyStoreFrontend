import { BarsOutlined, DollarOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { Alert, Button, Cascader, Form, Input, InputNumber } from "antd";


import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthProvider";
import { useCookies } from "react-cookie";
import { api } from "../../../../api/galaxtapi";
const { Dragger } = Upload;

export const SendPlugin = () => {

    const [data, setData] = useState();
    const [user, setUser] = useContext(AuthContext);
    const [cookie, setCookie] = useCookies(['access_token'])
    const [alert, setAlert] = useState();

    const [tag, setTag] = useState("no");

    const props = {
        name: 'file',
        action: 'http://localhost:8080/plugin',
        showUploadList: false,
        beforeUpload(file) {
            setData(file);
            return false;
        },
 
        maxCount: 1,
      };

    const handleUpload = (values) =>{
        if(!data){
            setAlert(<Alert message="Você precisa inserir um arquivo!" type="error" />)
        }else{


            const header = {
                'Authorization': `Bearer ${cookie.access_token}` 
            };

            const formData = new FormData();
            formData.append('file', data);
            formData.append('name', values.name);
            formData.append('tag', tag);
            formData.append('author', values.author);
            formData.append('image', values.image === undefined ? 'https://media.discordapp.net/attachments/1079833562267791551/1081025421736411186/PluginGalaxy.png?width=468&height=468' : values.image);
            formData.append('version', values.version);
            formData.append('price', values.price);
            formData.append('description', values.desc);

            
            const sendPlugin = api.post('/plugin', formData
            , {
                headers: header
            }).then((response) => {
                setAlert(<Alert message="Plugin enviado com sucesso!" type="success" />)
            }
            ).catch((error) => {
                setAlert(<Alert message="Erro ao enviar o plugin!" type="error" />)
            });



 
           
        }
    }

  return (
    <Form 
    onFinish={handleUpload}
    style={{
      width: "50%",
      marginTop: "50px",
 

    }}
    >
      <h2>Adicionar Plugin</h2>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Você precisa inserir o nome do plugin!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<BarsOutlined />}
          placeholder="Insira o nome do Plugin"
        />
      </Form.Item>

      <Form.Item
        name="tag"
        rules={[
          {
            required: true,
            message: "Você precisa inserir a tag do plugin!",
          },
        ]}
      >
        <Cascader
          onChange={(value) => setTag(value)}
          options={[
            {
              value: "RankUP",
              label: "RankUP",
            },
            {
              value: "Factions",
              label: "Factions",
            },
            {
              value: "Economia",
              label: "Economia",
            },
          ]}
          placeholder="Selecione a Tag do Plugin"
        />
      </Form.Item>

      <Form.Item
        name="author"
        rules={[
          {
            required: true,
            message: "Você precisa inserir o autor do plugin!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<BarsOutlined />}
          placeholder="Insira o autor do Plugin"
        />
      </Form.Item>

      <Form.Item
        name="desc"
        rules={[
          {
            required: true,
            message: "Você precisa inserir uma descrição para plugin!",
          },
        ]}
      >
        <TextArea
          size="large"
          prefix={<BarsOutlined />}
          placeholder="Insira a descrição do Plugin"
          maxLength={200}
        />
      </Form.Item>

      <Form.Item
        name="image"
        rules={[
          {
            type: "url",
            warningOnly: true,
          },
        ]}
      >
        <Input
          size="large"
          prefix={<BarsOutlined />}
          placeholder="Insira uma imagem para o plugin"
        />
      </Form.Item>

      <Form.Item
        name="version"
        rules={[
          {
            required: true,
            message: "Você precisa inserir a versão do plugin!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<BarsOutlined />}
          placeholder="Insira a versão do Plugin"
        />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[
          {
            required: true,
            message: "Você precisa inserir o valor do plugin!",
          },
        ]}
      >
        <InputNumber
          size="large"
          prefix={<DollarOutlined />}
          placeholder="Insira o valor do Plugin"
          style={{
            width: "100%",
          }}
          step={0.01}
        />
      </Form.Item>
      <Form.Item>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Clique ou solte o plugin aqui</p>
          <p className="ant-upload-hint">
            Você pode enviar apenas 1 plugin por vez
          </p>
        </Dragger>
        {data !== undefined && (
            <p
            style={{
                marginTop: 16,
                lineHeight: "24px",
                border: "1px solid #d9d9d9",
                borderRadius: 6,
                padding: 8,
                color: "#595959",
            }}

            >
                    <strong>Nome do arquivo:</strong> {data.name}
                    <br />
                    <strong>Tipo do arquivo:</strong> {data.type}
                    <br />
                    <strong>Tamanho do arquivo:</strong> {
                        Math.round(data.size / 1024) + " KB"
                    }
                </p>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
        {alert !== undefined && alert}
      </Form.Item>
    </Form>
  );
};
