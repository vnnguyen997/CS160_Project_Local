import React from "react";

function CartTotal({ cart, isCart, shippingCost }) {
  const subtotal = cart
    ? cart.reduce((sum, currentItem) => {
        return sum + currentItem.quantity * currentItem.price;
      }, 0)
    : 0;
  const taxes = 0.09 * subtotal;
  const total = subtotal + taxes + (shippingCost ? shippingCost : 0);
  return (
    <div
      style={{
        width: "90%",
        boxSizing: "50px",
        border: "2px solid rgba(0, 0, 0, 0.05)",
        padding: "50px",
        float: "right",
        marginRight: "50px",
        textAlign: "left",
      }}
    >
      <p>
        <strong>Total Items:</strong>{" "}
        {cart
          ? cart.reduce((sum, currentItem) => {
              return sum + currentItem.quantity;
            }, 0)
          : 0}
      </p>
      <p>
        <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
      </p>
      {isCart ? (
        <p />
      ) : (
        <div>
          <p>
            <strong>Shipping and handling:</strong> 
            {shippingCost !== null ? ` $${shippingCost.toFixed(2)}` : " Select delivery method"}
          </p>
          <p>
            <strong>Tax:</strong> ${taxes.toFixed(2)}
          </p>
        </div>
      )}
      <hr />
      {isCart ? (
        <h5>
          <strong>See total at checkout</strong>
        </h5>
      ) : (
        <h5>
          <strong>Total(without shipping):</strong> ${total.toFixed(2)}
        </h5>
      )}
    </div>
  );
}

export default CartTotal;
