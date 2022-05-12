import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import { CartContext } from './CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
export function CartIcon({navigation}) {
//   const {getItemsCount} = useContext(CartContext);
  const {items, setItems} = useContext(CartContext);
  const [refreshing, setRefreshing] = useState(true);
    return (
        <TouchableOpacity style={{ padding: 5, marginLeft: 16 }} onPress={() => {navigation.navigate('Cart')}}>
            <View style={{ position: 'absolute', height: 25, width: 25, borderRadius: 15, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', zIndex:2000 }}>
                <Text>{items.length}</Text>
            </View>
            {/* <Text>{nama}</Text> */}
        {/* <Text>{items.reduce((sum, item) => (sum + item.totalPrice), 0)}</Text> */}
            <Icon name="ios-cart" size={48} color='#ffd700'/>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: 'orange',
    height: 32,
    padding: 12,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});