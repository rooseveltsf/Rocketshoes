import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import { ProductList } from './styles';
import { FormatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const [products, setProducts] = useState([]);

  const Stock = useSelector(state => ({
    total: state.cart.reduce((amount, prod) => {
      amount[prod.id] = prod.amount;
      return amount;
    }, {}),
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetch() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: FormatPrice(product.price),
      }));

      setProducts(data);
    }
    fetch();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCardRequest(id));
  }
  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdShoppingCart size={16} color="#fff" />{' '}
              {Stock.total[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
