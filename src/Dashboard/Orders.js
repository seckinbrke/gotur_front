/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getOrders } from '../Api/OrderAPI';
import OrdersModal from './OrdersModal';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount, seeMore = () => { }) {
  return { id, date, name, shipTo, paymentMethod, amount, seeMore };
}



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },

}));

export default function Orders() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const totalPrice = (shoppingItems) => {
    let total = 0;
    shoppingItems.map((item) => {
      total += item.price
    })
    return total;
  }
  const splitCreditCardNo = (creditCardNo) => {
    return creditCardNo.replace(/(\d{4}(?!\s))/g, "$1 ")
  }
  const seeMore = (selectedItem) => {
    return (
      <div onClick={() => {
        setPopUp(true)
        console.log("selectedItem" + selectedItem)
        setSelectedItem(selectedItem)
      }}>
        <a style={{ color: 'blue', textDecoration: "underline", cursor: 'pointer' }}>Siparişi Gör</a>
      </div>
    )
  }
  const getOrderToPanel = async () => {
    let deneme = [];
    let responseData = await getOrders();
    if (responseData !== null || responseData !== undefined) {
      console.log(responseData)
      responseData.map((item, index) => {
        let date = new Date(item.createdAt)
        deneme.push(createData(index,date.toLocaleString(), item.userName + " " + item.userSurname,
          item.userAddress, splitCreditCardNo(item.userCreditCardInfo[0].creditCardNo), totalPrice(item.shoppingItems), seeMore(item.shoppingItems)))
      });
    }
    setRows(deneme);
  }
  useEffect(() => {
    getOrderToPanel();
  }, [])

  return (
    <React.Fragment>
      <OrdersModal openAlert={popUp} closePopUp={() => setPopUp(false)} selectedItem={selectedItem} />
      <Title style={{ color: '#4F34A3' }} >Siparişler</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tarih</TableCell>
            <TableCell>Müşteri Adı</TableCell>
            <TableCell>Adres</TableCell>
            <TableCell>Kredi Kartı No</TableCell>
            <TableCell align="right">Sepet Tutarı</TableCell>
            <TableCell align="right">Sepet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.seeMore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link style={{ color: '#4F34A3' }} href="#" onClick={preventDefault}>
          Daha Fazla Gör
        </Link>
      </div>
    </React.Fragment>
  );
}