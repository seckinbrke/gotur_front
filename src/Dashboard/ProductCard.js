import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './ProductCard.css'
import { getCategoryProducts } from '../Api/CatagoryAPI';

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
  }, [])

  const getCategoryProduct = async () => {
    let body ={
      mainType:props.item.mainType
    }
    let responseData = await getCategoryProducts({body:body});
    if (responseData !== null || responseData !== undefined) {
      setProducts(responseData)
      console.log(responseData);
      
    }
  };

  const ProductCard = (item) => {
    return (
      <Card className="Post">
        <CardContent>
          <div style={{ flex: 0.3 }}>
            <h3 className="Title">{item.name}</h3>
          </div>
          <div className="Info" style={{ flex: 0.6 }}>
            <img className="Images" src={item.productPhoto} alt="" />
          </div>
          <div style={{ flex: 0.1 }}>
            <h3 className="Price">{item.price} ₺</h3>
          </div>
  
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }

  const renderItems = ()=>{
    return products.map((item,index)=>{
      return <ProductCard item={item} key={index}/>
    })
  }
  return (
    <div >
      <h3>{props.item.mainType}</h3>
      {renderItems()}
    </div>
  );
}
