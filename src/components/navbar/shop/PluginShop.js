import styled from "styled-components"
import { DeleteOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { CartContext } from "../../../context/CartContext"
import { useContext } from "react"
const PluginBody = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    text-align: center;
    img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
`

export const PluginShop = ({plugin}) => {
    
    const [cart, setCart] = useContext(CartContext);

    const deletePlugin = () => {
        const newCart = cart.filter((item) => item.id !== plugin.id)
        setCart(newCart)
    }


    return(
        <PluginBody>
            <img src={plugin.image} alt="plugin"></img>
            <div>
            <h1>{plugin.name}</h1>
            <p>{plugin.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
            </div>
            <Button type="ghost" 
            icon={<DeleteOutlined />}
             
             size="large" onClick={
                deletePlugin
            }/>
        </PluginBody>

    )
}