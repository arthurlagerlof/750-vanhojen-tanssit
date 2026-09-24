import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { writeFile } from "node:fs/promises";

dotenv.config({
  path: ".env.local",
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseKey) {
  throw new Error("Missing SUPABASE_SECRET_KEY");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_message: string | null;
  delivery_zone: string;
  delivery_address: string;
  delivery_postal_code: string;
  delivery_city: string;
  products_total_cents: number;
  delivery_fee_cents: number;
  total_cents: number;
  created_at: string;
};

type OrderItem = {
  order_id: string;
  product_name: string;
  unit_price_cents: number;
  quantity: number;
  line_total_cents: number;
};

function euros(cents: number) {
  return `${(cents / 100).toFixed(2).replace(".", ",")} €`;
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("fi-FI", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Helsinki",
  }).format(new Date(dateString));
}

async function main() {
  console.log("Fetching orders...");

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: true });

  if (ordersError) {
    throw new Error(`Could not fetch orders: ${ordersError.message}`);
  }

  if (!orders || orders.length === 0) {
    console.log("No orders found.");
    return;
  }

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .order("id", { ascending: true });

  if (itemsError) {
    throw new Error(`Could not fetch order items: ${itemsError.message}`);
  }

  const allItems = (items ?? []) as OrderItem[];
  const allOrders = orders as Order[];

  let output = "";

  output += "KAKKUTUKKU – ASIAKASVIESTIT\n";
  output += "========================================\n\n";
  output += `Luotu: ${formatDate(new Date().toISOString())}\n`;
  output += `Tilauksia: ${allOrders.length}\n\n`;

  for (const order of allOrders) {
    const orderItems = allItems.filter(
      (item) => item.order_id === order.id,
    );

    output += "\n";
    output += "════════════════════════════════════════\n";
    output += `TILAUS ${order.order_number}\n`;
    output += "════════════════════════════════════════\n\n";

    output += `TO: ${order.customer_email}\n`;
    output += `SUBJECT: Katedralskolan – Kakkutukku-tilauksesi\n\n`;

    output += "────────────────────────────────────────\n\n";

    output += `Hei ${order.customer_name},\n\n`;

    output +=
      "Suuri kiitos Katedralskolanin vanhojentanssien tukemisesta!\n\n";

    output +=
      "Olemme vastaanottaneet Kakkutukun ennakkotilauksesi.\n\n";

    output += `Tilauksen numero: ${order.order_number}\n`;
    output += `Tilauksen päivämäärä: ${formatDate(order.created_at)}\n\n`;

    output += "TUOTTEET\n\n";

    for (const item of orderItems) {
      output += `${item.quantity} × ${item.product_name} — ${euros(
        item.line_total_cents,
      )}\n`;
    }

    output += "\n";

    output += `Tuotteet yhteensä: ${euros(order.products_total_cents)}\n`;
    output += `Toimitus: ${euros(order.delivery_fee_cents)}\n`;
    output += `Yhteensä: ${euros(order.total_cents)}\n\n`;

    output += "TOIMITUSOSOITE\n\n";
    output += `${order.delivery_address}\n`;
    output += `${order.delivery_postal_code} ${order.delivery_city}\n\n`;

    if (order.customer_message?.trim()) {
      output += "ASIAKKAAN VIESTI\n\n";
      output += `${order.customer_message.trim()}\n\n`;
    }

    output +=
      "Tuotteet ovat ennakkotilauksia ja niiden arvioitu toimitusaika on marraskuu 2026.\n\n";

    output +=
      "Maksuohjeet toimitetaan erikseen sähköpostitse.\n\n";

    output +=
      "Kiitos paljon tuestasi!\n\n";

    output += "Ystävällisin terveisin,\n\n";
    output += "Arthur Lagerlöf\n";
    output += "Katedralskolan i Åbo\n";

    output += "────────────────────────────────────────\n";
    output += "END OF EMAIL\n";
    output += "────────────────────────────────────────\n";
  }

  await writeFile("emails.txt", output, "utf8");

  console.log(`Done! Generated emails for ${allOrders.length} orders.`);
  console.log("File: emails.txt");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});