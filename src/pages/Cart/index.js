import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { FormatPrice } from '../../util/format';

import { Container, ProductTable, Total } from './styles';
import * as CartActions from '../../store/modules/cart/actions';

export default function Cart() {
  const Product = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: FormatPrice(product.price * product.amount),
    })),
  );
  const test = useSelector(state =>
    FormatPrice(
      state.cart.reduce((total, prod) => {
        return total + prod.price * prod.amount;
      }, 0),
    ),
  );
  const dispatch = useDispatch();

  function handleAddQty(product) {
    dispatch(CartActions.UpdateAmount(product.id, product.amount + 1));
  }
  function handleRemoveQty(product) {
    dispatch(CartActions.UpdateAmount(product.id, product.amount - 1));
  }
  function handleOnDelete(id) {
    dispatch(CartActions.RemoveToCard(id));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {Product.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>R${product.price}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => handleRemoveQty(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => handleAddQty(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleOnDelete(product.id)}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{test}</strong>
        </Total>
      </footer>
    </Container>
  );
}
