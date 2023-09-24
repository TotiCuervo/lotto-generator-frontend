import { useCartContext } from '@/context/CartContext'
import BallRow from '@/components/lottery/ball-row'
import { CartItem } from '@/types/CartItem'

interface IProps {
    item: CartItem
}

export default function CartItem({ item }: IProps) {
    const { removeFromCart } = useCartContext()

    return (
        <li className="flex flex-col py-6">
            <div className="mb-4 mt-4 flex flex-1 items-end justify-between text-base">
                <p className="text-gray-600">
                    {item.lottery} - {item.drawing_date.toDateString()}
                </p>
            </div>
            <div className="mx-auto">
                <BallRow
                    main={item.numbers.slice(0, 5)}
                    special={item.numbers[5]}
                    type={item.lottery}
                />
            </div>
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
    )
}
