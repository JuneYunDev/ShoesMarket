import { supabase } from "../lib/supabase";

export const getCustomers = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select(
      `
      id,
      first_name,
      last_name,
      email,
      address_line_1,
      city,
      province,
      postal_code,
      country,
      created_at,
      orders (
        id,
        created_at
      )
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((customer) => {
    const orders = customer.orders ?? [];

    const sortedOrders = [...orders].sort(
      (firstOrder, secondOrder) =>
        new Date(secondOrder.created_at).getTime() -
        new Date(firstOrder.created_at).getTime(),
    );

    return {
      ...customer,
      fullName: `${customer.first_name} ${customer.last_name}`.trim(),
      totalOrders: orders.length,
      lastOrderDate: sortedOrders[0]?.created_at ?? null,
    };
  });
};
