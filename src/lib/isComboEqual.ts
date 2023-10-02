import { CartItem } from "@/types/CartItem";

export default function isComboEqual(item1: CartItem, item2: CartItem) {
    return (
        item1.combination.number_1 === item2.combination.number_1 &&
        item1.combination.number_2 === item2.combination.number_2 &&
        item1.combination.number_3 === item2.combination.number_3 &&
        item1.combination.number_4 === item2.combination.number_4 &&
        item1.combination.number_5 === item2.combination.number_5 &&
        item1.combination.special_number === item2.combination.special_number &&
        item1.combination.lottery === item2.combination.lottery
    );
}
