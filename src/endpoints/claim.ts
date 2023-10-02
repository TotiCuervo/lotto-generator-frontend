import { CartItem } from "@/types/CartItem";
import { client } from "@/utils";

export async function claim(cartItems: CartItem[]) {
    return client.post("/claim", {
        cartItems,
    });
}
