import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import './ProductCard.css'
import { getCategoryProducts, deleteProduct } from '../Api/CatagoryAPI';
import { Divider, Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



export default function ProductCategory(props) {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    getCategoryProduct();
  }, [products])

  const getCategoryProduct = async () => {
    let body = {
      mainType: props.item.mainType
    }
    let responseData = await getCategoryProducts({ body: body });
    if (responseData !== null || responseData !== undefined) {
      setProducts(responseData);
    }
  };

  const removeProduct = async (id, index) => {
    let body = { _id: id }
    let responseData = await deleteProduct({ body: body });
    if (responseData !== null || responseData !== undefined) {
      products.splice(index, 1)
      console.log(responseData)
      //alert ekle buraya 
    }
  }

  const ProductCard = (item, index) => {

    return (
      <Card className="CardPost">
        <div style={{ flex: 0.1 }}>
          <DeleteIcon onClick={() => removeProduct(item._id, index)} fontSize="small" style={{ color: "#e6bb00", alignSelf: 'flex-end', marginLeft: 100 }} />
        </div>
        <div style={{ flex: 0.3 }}>
          <h3 className="CardTitle">{item.name}</h3>
        </div>
        <div className="CardInfo" style={{ flex: 0.5 }}>
          <img className="CardImages" src={item.productPhoto} alt="" />
        </div>
        <div style={{ flex: 0.1 }}>
          <h3 className="CardPrice">{item.price} ₺</h3>
        </div>
      </Card>
    );
  }

  const renderItems = () => {
    return products.map((item, index) => {
      return ProductCard(item, index)
    })
  }
  return (
    <Box border={1} borderRadius={10} marginTop={5} borderColor={'#5D3DBD'} >
      <div style={{ display: "flex", flexDirection: 'column', borderWidth: 10, borderColor: 'black' }}>
        <div>
          <h3 style={{marginLeft:10}}>{props.item.mainType}</h3>
          {renderItems()}
        </div>
      </div>
    </Box>
  );
}
