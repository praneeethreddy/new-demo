import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Cookies, useCookies } from 'react-cookie';
import Product from './Product';
import { Item } from './Styles';
import { getProducts } from '../../redux/actions/productActions';



export default function RecipeReviewCard() {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.products.data);
  const [productsData, setProductsData] = React.useState([]);
  const [cookies, setCookie] = useCookies(['products']);
  const cookieData = new Cookies();
  console.log("cookieData ", cookieData.getAll())
  console.log("state data : ",stateData)
  React.useEffect(() => {

    setProductsData(stateData)
  }, [stateData]);


  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>

        {productsData &&
          productsData.map((obj, index) =>

            <Item key={index} >
              <Product cookies={cookies} 
                        setCookie={setCookie} 
                        imageData={obj.image}
                        company={obj.company} 
                        title={obj.title}
                        description={obj.description}
                        price={obj.price}
                        key={index} 
                        objId={obj._id} 
                        quantity={obj.quantity}
                        canReturn = {obj.canReturn}
                        />
            </Item>


          )


        }

      </div>



    </>
  );
}

