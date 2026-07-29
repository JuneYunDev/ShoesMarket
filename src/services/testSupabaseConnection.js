import { supabase } from "../lib/supabase";

export const testSupabaseConnection = async () => {
  const { data, error } = await supabase.from("customers").select("*").limit(5);

  if (error) {
    console.error("Supabase connection failed:", error);

    return;
  }

  console.log("Supabase customers:", data);
};
