import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductReview from './ProductReview';
import { getProductById } from '../services/api';

class ProductDetails extends React.Component {
  state = {
    product: [],
    shopCart: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const details = await getProductById(id);
    this.setState({ product: details });
    this.getLocalStorage();
  }

  // Pega os valores do localStorage
  getLocalStorage = () => {
    const shopCartLS = JSON.parse(localStorage.getItem('shopCart'));
    if (shopCartLS !== null) {
      this.setState((prevState) => ({
        shopCart: [].concat(...prevState.shopCart, shopCartLS),
      }));
    }
  };

  // Adiciona no localStorage
  handleUpdateLocalStorage = () => {
    const { shopCart } = this.state;
    localStorage.setItem('shopCart', JSON.stringify(shopCart));
  };

  // Busca se ja existe um id no stado
  filterShopCard = (id) => {
    const { shopCart } = this.state;
    const newShopCart = [...shopCart];
    const findId = newShopCart
      .find((product) => product.shopCartId === id);
    const index = newShopCart.findIndex((productIndex) => productIndex.shopCartId === id);
    if (findId === undefined) {
      return false;
    }
    return index;
  };

  // Adiciona ao carrinho
  addShopCart = () => {
    const { product, shopCart } = this.state;
    const idElement = this.filterShopCard(product.id);
    if (idElement === false) {
      this.setState((prevState) => ({
        shopCart: [].concat(...prevState.shopCart, {
          shopCartQuantity: 1,
          shopCartPrice: product.price,
          shopCartId: product.id,
          shopCartTitle: product.title,
        }),
      }), this.handleUpdateLocalStorage);
    } else {
      shopCart[idElement].shopCartQuantity += 1;
      this.setState({
        shopCart,
      }, this.handleUpdateLocalStorage);
    }
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <Link to="/cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Ir ao carrinho!!
          </button>
        </Link>
        <div className="product">
          <p data-testid="product-detail-name">{product.title}</p>
          <p data-testid="product-detail-price">{product.price}</p>
          <img
            src={ product.thumbnail }
            alt={ product.title }
            data-testid="product-detail-image"
          />
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addShopCart }
          >
            Adicionar ao Carrinho
          </button>
          <ProductReview productId={ product.id } />
        </div>
      </div>

    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductDetails;
