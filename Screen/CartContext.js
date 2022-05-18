import React, {createContext, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
// import { getProduct } from './services/ProductsService.js';
export const CartContext = createContext();
export function CartProvider(props) {
    const [items, setItems] = useState([]);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    
    useEffect(async() => {
        let isMounted = true
        setIsLoading(true);
        fetch('http://6355-180-242-234-59.ngrok.io/api/equipments')
        .then((response) => response.json())
        .then((hasil) => {
            setData(hasil);
            setCari(hasil);
            setIsLoading(false);
        })
        // .finally(() => setLoading(false));
        .catch(error => { console.log; });

    const id= data.id
    const harga=data.harga_sewa_perhari
    const nama_alat=data.nama
    }, [isFocused]);
    function addItemToCart(id) {
        const product = id;
        setItems((prevItems) => {
        const item = prevItems.find((item) => (item.id == id));
        if(!item) {
            return [...prevItems, {
                id,
                qty: 1,
                product,
                totalPrice: product.harga
            }];
        }
        else {
            return prevItems.map((item) => {
                if(item.id == id) {
                item.qty++;
                item.totalPrice += product.harga;
                }
                return item;
            });
        }
        });
    }
    function getItemsCount() {
        return items.reduce((sum, item) => (sum + item.qty), 0);
    }

    function getTotalPrice() {
        return items.reduce((sum, item) => (sum + item.totalPrice), 0);
    }  

    return (
        <CartContext.Provider 
        value={{items, setItems, getItemsCount, addItemToCart, getTotalPrice}}>
        {props.children}
        </CartContext.Provider>
    );
}