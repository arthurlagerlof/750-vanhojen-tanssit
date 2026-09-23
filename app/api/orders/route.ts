import { NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/data/products";
import { deliveryZones } from "@/data/deliveryZones";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const orderSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(1).max(100),
    phone: z.string().trim().min(3).max(30),
    email: z.string().trim().email().max(200),
    message: z.string().trim().max(1000).optional().default(""),
  }),
  delivery: z.object({
    zoneId: z.string().min(1),
    address: z.string().trim().min(1).max(200),
    postalCode: z.string().trim().min(1).max(20),
    city: z.string().trim().min(1).max(100),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(100),
      }),
    )
    .min(1)
    .max(50),
});

function generateOrderNumber() {
  const randomPart = crypto.randomUUID().slice(0, 8).toUpperCase();

  return `KAT-${new Date().getFullYear()}-${randomPart}`;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Virheelliset tilaustiedot.",
        },
        { status: 400 },
      );
    }

    const { customer, delivery, items } = parsed.data;

    const zone = deliveryZones.find(
      (item) => item.id === delivery.zoneId,
    );

    if (!zone) {
      return NextResponse.json(
        {
          error: "Valittu toimitusalue ei ole voimassa.",
        },
        { status: 400 },
      );
    }

    const orderItems = [];

    for (const item of items) {
      const product = products.find(
        (product) => product.id === item.productId,
      );

      if (!product) {
        return NextResponse.json(
          {
            error: "Tilauksessa on tuntematon tuote.",
          },
          { status: 400 },
        );
      }

      const unitPriceCents = Math.round(product.price * 100);
      const lineTotalCents = unitPriceCents * item.quantity;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        unitPriceCents,
        quantity: item.quantity,
        lineTotalCents,
      });
    }

    const productsTotalCents = orderItems.reduce(
      (sum, item) => sum + item.lineTotalCents,
      0,
    );

    const deliveryFeeCents = zone.feeCents;

    const totalCents = productsTotalCents + deliveryFeeCents;

    const orderNumber = generateOrderNumber();

    const supabase = createSupabaseServerClient();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        customer_message: customer.message || null,
        delivery_zone: zone.name,
        delivery_address: delivery.address,
        delivery_postal_code: delivery.postalCode,
        delivery_city: delivery.city,
        products_total_cents: productsTotalCents,
        delivery_fee_cents: deliveryFeeCents,
        total_cents: totalCents,
      })
      .select("id, order_number")
      .single();

    if (orderError || !order) {
      console.error("Order insert failed:", orderError);

      return NextResponse.json(
        {
          error: "Tilauksen tallentaminen epäonnistui.",
        },
        { status: 500 },
      );
    }

    const itemsToInsert = orderItems.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      unit_price_cents: item.unitPriceCents,
      quantity: item.quantity,
      line_total_cents: item.lineTotalCents,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (itemsError) {
      console.error("Order items insert failed:", itemsError);

      await supabase
        .from("orders")
        .delete()
        .eq("id", order.id);

      return NextResponse.json(
        {
          error: "Tilauksen tallentaminen epäonnistui.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderNumber: order.order_number,
        totalCents,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order API error:", error);

    return NextResponse.json(
      {
        error: "Tilauksen käsittely epäonnistui.",
      },
      { status: 500 },
    );
  }
}