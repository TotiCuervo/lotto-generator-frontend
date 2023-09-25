import { LotteryType } from "@/types/LotteryType";
import React from "react";
import BallRow from "../lottery/ball-row";
import useLotteryColorSchema from "@/hooks/useLotteryColorSchema";
import { IDraw } from "@/types";
import { useCartContext } from "@/context/CartContext";
import { getNextLotteryDate } from "@/methods/getNextLotteryDate";
import TicketCheckbox from "../checkboxes/ticket-checkbox";
import PrimaryButton from "../buttons/primary-button";

interface IProps {
    type: LotteryType;
    draw: IDraw;
    index: number;
    checked: boolean;
    setCheckedDraws: (draw: IDraw) => void;
}

export default function LineRow({ type, draw, index, checked, setCheckedDraws }: IProps) {
    const { schema } = useLotteryColorSchema(type);
    const { toggleMenu, addToCart } = useCartContext();
    const nextDrawDate = getNextLotteryDate(type);

    function handleReserve() {
        addToCart({
            numbers: draw,
            lottery: type,
            drawing_date: nextDrawDate,
        });
        toggleMenu(true);
    }

    return (
        <div className="flex flex-wrap gap-4">
            <div className="pt-[2.5px]">
                <TicketCheckbox checked={checked} onClick={() => setCheckedDraws(draw)} />
            </div>
            <div className="grow grid grid-rows-2">
                <div className="text-left text-xl font-bold">Line {index}</div>
                <div className="mx-auto sm:m-0">
                    <BallRow main={draw.slice(0, 5)} special={draw[5]} type={type} />
                </div>
            </div>
            <div className="grow sm:grow-0 grid grid-cols-2 gap-2 sm:content-end">
                <button
                    className={`flex h-12 w-full items-center justify-center rounded border border-${schema.activeColor} px-4 py-2 font-bold text-${schema.activeColor} hover:${schema.textColor} hover:bg-${schema.activeColor} transition ease-in-out`}
                >
                    Regenerate{" "}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-2 h-6 w-6" // Added ml-2 for spacing between text and SVG
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                    </svg>
                </button>

                <PrimaryButton className="h-12 w-full" onClick={handleReserve}>
                    Reserve{" "}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-2 h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                    </svg>
                </PrimaryButton>
            </div>
        </div>
    );
}
