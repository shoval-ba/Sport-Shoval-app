import {React , useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "../styles/LittleCart.scss"

export default function Sort(props)  { 

        const myFavorites = props.myFavorite;

        const handleDelete = (item) => {
            props.setFavorite(previousState =>{ 
                const itemsFilter = previousState.filter(currentItem => { return item !== currentItem})
                return [...itemsFilter]
                })
        }

        let itemsUi ;
        if(myFavorites.length ===0 ){
            itemsUi = (
                <div id="emptyImgText">                  
                    <h6>You don't have nothing here</h6>                           
                </div>   
            )
        }
    
        else {
            itemsUi = myFavorites.map((item,index) => {
                return (
                        <li className="clearfix">
                        <img src={item.img} alt="item1" />
                        <span className="item-name">{item.title}</span>
                        <span className="item-price">{item.price}$</span>
                        <span className="close" onClick={()=>handleDelete(item)}>&#10005;</span>
                        </li>
                )
            })
        }

    return(
            <div onMouseLeave={() => props.setHoverFavorite(false)} >
            <div className="shopping-cart" style={{right:"50px"}}>
            <div className="shopping-cart-header">
            <span className="badge">{myFavorites.length}</span>
            <div className="shopping-cart-total">
            </div>
            </div>

            <ul className="shopping-cart-items">
            {itemsUi}
            </ul>

            <Link to="cart" className="button">Checkout</Link>
            </div> 
        </div>
        
    )
 }
