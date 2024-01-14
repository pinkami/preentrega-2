import React from "react";

function CartWidget() {
return (
    <div>
      <i class="bi bi-cart"></i> {/*Carrito de bootstrap*/}
      <span>10</span> {/* Número hardcodeado para la cantidad de elementos en el carrito */}
    </div>
);
}

export default CartWidget;
