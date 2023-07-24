import React, { useState } from "react";
import "./AllProducts.css";
import Header from "../Components/Header/Header";
import { useCart } from "../store/CartContext";
import { useNavigate } from "react-router-dom";
import { MDBIcon, MDBTextArea } from "mdb-react-ui-kit";
import { useAuth } from "../store/authContext";

function Cart() {
  const [auth, ] = useAuth();
  const {cart,setCart} = useCart();
  const [address, setAddress] = useState("")
  const navigate = useNavigate();
  //total
  const totalPrice = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.count, 0);
    return totalPrice;
  }
  //total items
  const getTotalItemCount = () => {
    return cart.reduce((total, item) => total + item.count, 0);
  }
  //delete
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />

      <div className="row g-0">
        <div className="col-lg-8">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
              <h1 className="head-t">Shopping Cart</h1>
              <h6 className="mb-0 text-muted">{cart?.length} items</h6>
            </div>
            <hr />
            {cart.length ===0 ? (
              <>
              <h2 className="mt-5 pt-5 head-t upper text-center">cart is empty !!!</h2>
              </>
            ):(
              <>
              {cart?.map((p) => (
              <>
                <div className="row mb-4 d-flex justify-content-between align-items-center">
                  <div
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                    className="col-4 col-md-2  col-lg-2 col-xl-2 mb-2"
                  >
                    <img
                      src={`/api/v1/product/product-photo1/${p?._id}`}
                      className="img-fluid rounded-3"
                      alt="Cotton T-shirt"
                    />
                  </div>
                  <div
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                    className="col-7 col-md-3 col-lg-3 col-xl-3"
                  >
                    <h5 className="colr">{p.name}</h5>
                  </div>
                  <div className="col-5 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h6 className="pric">Price : ₹{p.price}</h6>
                  </div>
                  <div className="col-5 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h6 className="pric">Quntity : {p.count}<br/><br/>size: {p.size}</h6>
                  </div>
                  <div
                    className=" col-2 col-md-1 col-lg-1 col-xl-1 text-end"
                    onClick={() => removeCartItem(p._id)}
                  >
                    <MDBIcon
                      className="pt-2 pb-2 trash-ic"
                      icon="trash-can"
                      size="lg"
                    />
                  </div>
                </div>
                <hr className="my-4" />
              </>
            ))}</>
            )}
          </div>
        </div>
        <div className="col-lg-4 bg-grey">
          <div className="container-fluid">
            <h3 className="mb-1 mt-5 head-t">Summary</h3>
            <hr className="my-4" />
            <div className="d-flex justify-content-between mb-4">
              <h5 className="text-uppercase">items : {getTotalItemCount()}</h5>
              <h5>₹ {totalPrice()}</h5>
            </div>
            <hr className="my-4" />
            <div className="d-flex justify-content-between mb-5">
              <h5 className="text-uppercase">Total price :</h5>
              <h5>₹ {totalPrice()}</h5>
            </div>
            <hr className="my-4" />
            <div className="d-flex justify-content-between mb-2">
              <h5 className="head-t">Shipping address</h5>
            </div>
            {auth.user.address ?(<MDBTextArea placeholder="Address" rows={3} className="mb-4" 
            value={auth?.user?.address} disabled/>):(<>
            <MDBTextArea placeholder="Address" rows={3} className="mb-4" 
            value={address} onChange={(e)=>setAddress(e.target.value)}/></>)}
            <button className="cart-btn p-1 pe-3 ps-3">Check Out</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
