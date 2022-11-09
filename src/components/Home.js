import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductByQuery } from '../services/api';

class Home extends React.Component {
  state = {
    categorys: [],
    productInput: '',
    buttonDisable: true,
    filterAPI: [],
    test: true,
  };

  async componentDidMount() {
    const valores = await getCategories();
    this.setState({ categorys: valores });
  }

  callAPI = async () => {
    const { productInput, filterAPI } = this.state;
    const API = await getProductByQuery(productInput);
    this.setState({
      filterAPI: API.results.map((product) => product.title),
      test: false,
    }, () => console.log(filterAPI));
  };

  // Botão de acesso desabilata quando não tem valor nos inputs
  buttonDisable = () => {
    const { productInput: product } = this.state;
    let isValid = false;
    if (product.length > 0) {
      isValid = false;
    } else {
      isValid = true;
    }
    this.setState({ buttonDisable: isValid });
  };

  // Função para que altere os valores do input e salve o seu valor no state
  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        // Realiza a validação do botão cada vez que alterar algo na tela
        this.buttonDisable();
      },
    );
  };

  render() {
    const { categorys, buttonDisable, filterAPI, test } = this.state;
    return (
      <div>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <div>
          {categorys.map((category) => (
            <button
              key={ category.id }
              type="button"
              data-testid="category"
            >
              {category.name}

            </button>
          ))}
        </div>
        <input
          type="text"
          data-testid="query-input"
          name="productInput"
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="query-button"
          disabled={ buttonDisable }
          onClick={ this.callAPI }
        >
          Buscar
        </button>
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
        {
          test
            ? <span>Nenhum produto foi encontrado</span>
            : (
              <ul>
                {filterAPI.map((product, index) => (
                  <li
                    data-testid="product"
                    key={ `${index} ${product}` }
                  >
                    {product}
                  </li>
                ))}
              </ul>
            )
        }
      </div>
    );
  }
}

export default Home;
