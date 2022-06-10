import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      `https://murmuring-citadel-05940.herokuapp.com/orders?email=${currentUser?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          navigate("/login");
        }
      })
      .then((data) => setOrders(data));
  }, []);

  const handleDeleteOrder = (id) => {
    fetch(`https://murmuring-citadel-05940.herokuapp.com/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("data successfully delete");
          const remainingOrder = orders.filter((order) => order._id !== id);
          setOrders(remainingOrder);
        }
      });
  };
  return (
    <div>
      <h3 className="text-center mt-3">this is orders: {orders.length}</h3>
      <div>
        {orders.map((order) => (
          <li key={order._id}>
            user:{order.name} {order.email}{" "}
            <button onClick={() => handleDeleteOrder(order._id)}>delete</button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Orders;
