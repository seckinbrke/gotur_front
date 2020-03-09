import React from 'react';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import '../components/Basket/Basket.css'
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperModal: {
        width: 400,
        borderRadius: 10,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid 4F34A3',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    alertButton: {
        backgroundColor: '#5D3DBD',
        color: '#FFD10D'
    },
    helperText: {
        color: 'red'
    }
}));



export default function OrdersModal(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const renderItems = (seletedItem) => {
        console.log(seletedItem)
        return seletedItem.map((item, index) => {
            return (
                <li key={index} className='CartItem'>
                    <img alt="" style={{ width: 30, height: 30, flex: 0.1, borderRadius: 10 }} src={item.productPhoto}></img>
                    <p className='CartName' style={{ flex: 0.8, fontSize: 13 }}>{item.name}</p>
                    <p className='CartName' style={{ flex: 0.1 }}>{item.price}₺</p>
                </li>
            )
        })
    }
    return (
        <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={props.openAlert}
            onClose={props.closePopUp}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={classes.modal}
            container={() => rootRef.current}
        >
            <div className={classes.paperModal}>
                <div className={classes.paper} style={{ marginTop: 0 }}>
                    <ErrorIcon style={{ alignSelf: 'center', marginTop: 0, fontSize: 60, marginBottom: 20, color: '#5D3DBD' }} />
                    <h2 id="server-modal-title" className={classes.paper} style={{ marginTop: 0 }}>Siparişler</h2>
                    <ul className='ShoppingList'> {renderItems(props.selectedItem)}</ul>
                    
                    <Button
                        onClick={props.closePopUp}
                        fullWidth
                        variant="outlined"
                        className={classes.alertButton}
                    >Tamam</Button>
                </div>
            </div>
        </Modal>
    )
}
