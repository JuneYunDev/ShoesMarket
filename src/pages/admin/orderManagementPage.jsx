import { useEffect, useState } from "react";

import AdminHeader from "../../components/admin/AdminHeader";
import { getOrders, updateOrderStatus } from "../../services/orderService";

import "./orderManagement.css";

const EMPTY_ROW_COUNT = 8;

const statusOptions = [
  "pending",
  "paid",
  "processing",
  "shipping",
  "delivered",
  "cancelled",
];

const formatStatus = (status) => {
  if (!status) {
    return "Unknown";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateValue));
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(Number(value ?? 0));
};

const getCustomerName = (order) => {
  const customer = order.customers;

  if (!customer) {
    return "Deleted Customer";
  }

  return [customer.first_name, customer.last_name].filter(Boolean).join(" ");
};

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const orderData = await getOrders();

        setOrders(orderData);
      } catch (error) {
        console.error("Failed to load orders:", error);

        setErrorMessage(
          "Order information could not be loaded. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, nextStatus) => {
    const previousOrders = orders;

    setUpdatingOrderId(orderId);

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: nextStatus,
            }
          : order,
      ),
    );

    try {
      await updateOrderStatus(orderId, nextStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);

      setOrders(previousOrders);

      window.alert("The order status could not be updated.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="admin-page">
      <AdminHeader />

      <main className="order-management">
        <header className="order-management__heading">
          <h1>Order Management</h1>
        </header>

        <section className="order-management__background">
          <div className="order-table-card">
            {isLoading && (
              <p className="order-table__message">Loading orders...</p>
            )}

            {!isLoading && errorMessage && (
              <p
                className="order-table__message order-table__message--error"
                role="alert"
              >
                {errorMessage}
              </p>
            )}

            {!isLoading && !errorMessage && (
              <div className="order-table-wrapper">
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>

                        <td>{getCustomerName(order)}</td>

                        <td>
                          <select
                            className={`order-table__status order-table__status--${order.status}`}
                            value={order.status}
                            disabled={updatingOrderId === order.id}
                            aria-label={`Change status for order ${order.id}`}
                            onChange={(event) =>
                              handleStatusChange(order.id, event.target.value)
                            }
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {formatStatus(status)}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td>{formatDate(order.created_at)}</td>

                        <td>{formatCurrency(order.total)}</td>
                      </tr>
                    ))}

                    {Array.from(
                      {
                        length: Math.max(EMPTY_ROW_COUNT - orders.length, 0),
                      },
                      (_, index) => (
                        <tr
                          className="order-table__empty-row"
                          key={`empty-order-row-${index}`}
                          aria-hidden="true"
                        >
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>

                {orders.length === 0 && (
                  <p className="order-table__empty-message">
                    No orders were found.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrderManagementPage;
