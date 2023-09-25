import { LotteryType } from "@/types/LotteryType";
import React, { useEffect, useState } from "react";
import { useDrawContext } from "@/context/DrawContext";
import LineRow from "./rows/line-row";
import { IDraw } from "@/types";
import PrimaryButton from "./buttons/primary-button";
import { useCartContext } from "@/context/CartContext";
import { getNextLotteryDate } from "@/methods/getNextLotteryDate";
import { CartItem } from "@/types/CartItem";

interface IProps {
    type: LotteryType;
}

export default function DrawResults({ type }: IProps) {
    const { draws } = useDrawContext();
    const { addMultipleToCart, toggleMenu } = useCartContext();

    const [checkedDraws, setCheckedDraws] = useState<IDraw[]>([]);

    const disabled = checkedDraws.length === 0;

    useEffect(() => {
        setCheckedDraws(draws);
    }, [draws]);

    if (draws.length === 0) {
        return null;
    }

    function handleSetChecked(draw: IDraw) {
        if (checkedDraws.includes(draw)) {
            setCheckedDraws(checkedDraws.filter((checked) => checked !== draw));
        } else {
            setCheckedDraws([...checkedDraws, draw]);
        }
    }

    function handleReserveSelected() {
        if (checkedDraws.length === 0) {
            return;
        }

        const nextDrawDate = getNextLotteryDate(type);

        const cartItems = checkedDraws.map((draw) => ({
            numbers: draw,
            lottery: type,
            drawing_date: nextDrawDate,
        }));

        addMultipleToCart(cartItems);
        toggleMenu(true);
    }

    return (
        <div className="w-full flex flex-col">
            <div className="grid grid-rows-1 gap-10">
                {draws.map((draw, index) => (
                    <LineRow
                        key={`draw-${index}`}
                        type={type}
                        draw={draw}
                        index={index + 1}
                        checked={checkedDraws.includes(draw)}
                        setCheckedDraws={handleSetChecked}
                    />
                ))}
            </div>
            <div className="w-full flex justify-between mt-10 text-gray-400 flex-wrap">
                <div className="mx-auto sm:mx-0 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 mr-2"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>{"= Check green to select"}</span>
                </div>
                <PrimaryButton
                    onClick={handleReserveSelected}
                    className="mt-4 sm:mt-0 w-full sm:w-auto"
                    disabled={disabled}
                >
                    Reserve Selected
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mx-2 h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                    </svg>
                    ({checkedDraws.length})
                </PrimaryButton>
            </div>
        </div>
    );
}
