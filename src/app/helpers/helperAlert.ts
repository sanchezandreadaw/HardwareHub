import Swal, { SweetAlertResult } from "sweetalert2";
import { CartItem } from "../models/cartItem";

export const showAlertConfirmButton: (item : CartItem) => Promise<SweetAlertResult<any>> = (item) => {
  return Swal.fire({
      title: "Eliminación de producto",
      text : "¿Está seguro de querer eliminar el producto " + item.product.name + " del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok"
  });
};


export const showConfirmAlert : () => void = () => {
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Producto agregado correctamente",
        showConfirmButton: false,
        timer: 1500
      });
}