import { useCartContext } from "@/context/CartContext";
import BallRow from "@/components/lottery/ball-row";
import { CartItem } from "@/types/CartItem";

interface IProps {
    item: CartItem;
}

export default function CartItem({ item }: IProps) {
    const { removeFromCart } = useCartContext();

    return (
        <li className="flex flex-col py-6">
            <div className="mb-4 mt-4 flex flex-1 items-end justify-between text-base">
                <p className="text-gray-600">
                    {item.combination.lottery} - {item.drawing_date.toDateString()}
                </p>
                {item.error && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-600 animate-bounce"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                    </svg>
                )}
            </div>
            <div className="mx-auto">
                <BallRow combination={item.combination} type={item.combination.lottery} />
            </div>
            {item.error && (
                <div className="mt-4 text-center">
                    <p className="text-red-600">{item.errorMessage}</p>
                </div>
            )}
            <div className="mt-4 flex flex-1 items-end justify-end text-sm">
                <div className="flex">
                    <button
                        type="button"
                        className="font-medium text-slate-600 hover:text-slate-500"
                        onClick={() => removeFromCart(item)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </li>
    );
}
