import React from 'react';
import {Table} from 'react-bootstrap';
import CartItem from './CartItem';
function Cart(props) {
    const {cartItems} = props;
    const cartData = cartItems.filter(item => item.quantity === 0);
    const cartTotal = cartItems.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th className="text-left">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {cartData.map((cartItem) => {
                    return <CartItem item={cartItem} key={cartItem.product_id}/>
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td className="text-left" colSpan="3"><b>Total</b></td>
                    <td>{cartTotal}</td>
                </tr>
                <tr>
                    <td colSpan="4" className="text-right">
                        <input type="button" value="Checkout"/>
                    </td>
                </tr>
            </tfoot>
        </Table>
    );
}

export default Cart;