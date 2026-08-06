import { useEffect, useState } from "react";

import AdminHeader from "../../components/admin/AdminHeader";
import { getCustomers } from "../../services/customerService";

import "./customerManagement.css";

const EMPTY_ROW_COUNT = 8;

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "No orders";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
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

        setErrorMessage(
          "Customer information could not be loaded. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomers();
  }, []);

  return (
    <div className="admin-page">
      <AdminHeader />

      <main className="customer-management">
        <header className="customer-management__heading">
          <h1>Customer Management</h1>
        </header>

        <section className="customer-management__background">
          <div className="customer-table-card">
            {isLoading && (
              <p className="customer-table__message">Loading customers...</p>
            )}

            {!isLoading && errorMessage && (
              <p
                className="customer-table__message customer-table__message--error"
                role="alert"
              >
                {errorMessage}
              </p>
            )}

            {!isLoading && !errorMessage && (
              <div className="customer-table-wrapper">
                <table className="customer-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>E-mail</th>
                      <th>Address</th>
                      <th>
                        <span>Last</span>
                        <span>Order</span>
                      </th>
                      <th>
                        <span>Total</span>
                        <span>Orders</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          {customer.fullName ??
                            `${customer.first_name} ${customer.last_name}`}
                        </td>

                        <td>
                          <a href={`mailto:${customer.email}`}>
                            {customer.email}
                          </a>
                        </td>

                        <td>{formatAddress(customer) || "No address"}</td>

                        <td>{formatDate(customer.lastOrderDate)}</td>

                        <td>{customer.totalOrders ?? 0}</td>
                      </tr>
                    ))}

                    {Array.from(
                      {
                        length: Math.max(EMPTY_ROW_COUNT - customers.length, 0),
                      },
                      (_, index) => (
                        <tr
                          className="customer-table__empty-row"
                          key={`empty-row-${index}`}
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

                {customers.length === 0 && (
                  <p className="customer-table__empty-message">
                    No customers were found.
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

export default CustomerManagementPage;
