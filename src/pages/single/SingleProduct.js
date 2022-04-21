// styles
import './SingleProduct.scss';
// tools
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// firebase tools
import { productsRef } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
// components
import Spinner from '../../components/spinner/Spinner';

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const id = useParams().productId;
  console.log(product);

  const getProduct = useCallback(
    async () => {
      const productRef = doc(productsRef, id);
      try {
        const res = await getDoc(productRef);
        if (!res) {
          throw new Error('Something went worng');
        }
        setProduct({ ...res.data() });
      }
      catch (err) {
        console.log(err.message);
      }
    }, [id]
  );

  useEffect(() => {
    getProduct();
  }, [getProduct]);


  return (
    <div className='single-product-container'>
      { !product.photoUrl ? (
        <Spinner />
      ) : (
        <>
          <h2 className='title'>Product Info</h2>
          <div className="info-card">
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
        </>
      ) }

    </div>
  );
}