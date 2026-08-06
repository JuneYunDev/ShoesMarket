import { supabase } from "../lib/supabase";

export const getOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      subtotal,
      delivery_fee,
      tax,
      total,
      payment_method,
      shipping_address,
      created_at,
      customers (
        id,
        first_name,
        last_name,
        email
      )
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export const updateOrderStatus = async (orderId, nextStatus) => {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status: nextStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
