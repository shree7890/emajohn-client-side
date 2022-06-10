import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../CustomHooks/useAuth";
import useCart from "../../CustomHooks/useCart";
import { clearTheCart, getStoredCart } from "../fakedb/data";
const Shipping = () => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useCart();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const saveCart = getStoredCart();
    data.order = saveCart;
    data.date = new Date().toLocaleDateString();
    fetch("https://murmuring-citadel-05940.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((product) => {
        if (product.insertedId) {
          alert("Order completed");
          reset();
          setCart([]);
          clearTheCart();
        }
        // console.log(product);
      });
  };
  return (
    <div>
      <h3 className="text-center text-primary">Shipping now</h3>
      <form className="w-25 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-100"
          type="text"
          defaultValue={currentUser?.displayName}
          {...register("name", { required: true })}
        />{" "}
        <br />
        <br />
        <input
          className="w-100"
          type="email"
          defaultValue={currentUser?.email}
          {...register("email", { required: true })}
        />
        <br />
        <br />
        <input
          className="w-100"
          type="text"
          {...register("address", { required: true })}
          placeholder="address"
        />
        <br />
        <br />
        <input
          className="w-100"
          type="text"
          {...register("city", { required: true })}
          placeholder="city name"
        />
        <br />
        <br />
        <input
          className="w-100"
          type="number"
          {...register("phonenumber", { required: true })}
          placeholder="number"
        />
        <br />
        <br />
        <input type="submit" value="Checkout" />
      </form>
    </div>
  );
};

export default Shipping;
