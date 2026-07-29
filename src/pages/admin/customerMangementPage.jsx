import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customerService";

import "./managementTable.css";

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "No orders";
  }

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(dateValue));
};

const formatAddress = (customer) => {
  return [
    customer.address_line_1,
    customer.city,
    customer.province,
    customer.postal_code,
  ]
    .filter(Boolean)
    .join(", ");
};

const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const customerData = await getCustomers();

        setCustomers(customerData);
      } catch (error) {
        console.error("Failed to load customers:", error);

        setErrorMessage("Customer information could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomers();
  }, []);

  return (
    <main className="management-page">
      <header className="management-page__heading">
        <h1>Customer Management</h1>
      </header>

      <section className="management-page__background">
        <div className="management-table-card">
          {isLoading && (
            <p className="management-table__message">Loading customers...</p>
          )}

          {!isLoading && errorMessage && (
            <p
              className="management-table__message management-table__message--error"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && customers.length === 0 && (
            <p className="management-table__message">
              No customers were found.
            </p>
          )}

          {!isLoading && !errorMessage && customers.length > 0 && (
            <div className="management-table-wrapper">
              <table className="management-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Address</th>
                    <th>Last Order</th>
                    <th>Total Orders</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.fullName}</td>

                      <td>
                        <a href={`mailto:${customer.email}`}>
                          {customer.email}
                        </a>
                      </td>

                      <td>{formatAddress(customer) || "No address"}</td>

                      <td>{formatDate(customer.lastOrderDate)}</td>

                      <td>{customer.totalOrders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CustomerManagementPage;
