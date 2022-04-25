// styles
import './SingleProduct.scss';
// tools
import { useParams } from 'react-router-dom';
// firebase tools
import { productsRef } from '../../firebase';
// custom hooks
import { useTheme } from '../../hooks/useTheme';
import { useSingleData } from '../../hooks/useSingleData';

// components
import Spinner from '../../components/spinner/Spinner';

export default function SingleProduct() {
  const id = useParams().productId;
  const { theme } = useTheme();
  const { singleData: product } = useSingleData(productsRef, id);


  return (
    <div
      className={ theme === 'light' ? 'single-product-container' : 'single-product-container dark' } >
      { !product.photoUrl ? (
        <Spinner />
      ) : (
        <>
          <div className="info-card">
            <h2 className='title'>Product Info</h2>
            <div className="info-container">
              <div className="left">
                <img src={ product.photoUrl } alt="" />
              </div>
              <div className="right">
                <h3>{ product.title }</h3>
                <h4>Category:</h4>
                <p>{ product.category }</p>
                <h4>Price:</h4>
                <p>${ product.price }</p>
                <h4>In-Stock: </h4>
                <p>{ product.inStock }</p>
                <h4>About this item: </h4>
                <p>{ product.description }</p>
              </div>
            </div>

          </div>
        </>
      ) }

    </div>
  );
}