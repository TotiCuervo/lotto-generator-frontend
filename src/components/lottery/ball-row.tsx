import React from "react";
import Ball from "./ball";
import { LotteryType } from "@/types/LotteryType";
import { Combination } from "@/types/Combination";

interface IProps {
    combination?: Combination;
    size?: "small" | "medium" | "large" | "xlarge";
    type: LotteryType;
}

export default function BallRow({ combination, size = "medium", type }: IProps) {
    const EmptyRow = () => (
        <>
            {Array.from(Array(5).keys()).map((_, index) => (
                <Ball key={index} size={size} type={type} />
            ))}
            <Ball state="special" size={size} type={type} />
        </>
    );

    const ActiveRow = () => (
        <>
            <Ball number={combination!.number_1} size={size} type={type} />
            <Ball number={combination!.number_2} size={size} type={type} />
            <Ball number={combination!.number_3} size={size} type={type} />
            <Ball number={combination!.number_4} size={size} type={type} />
            <Ball number={combination!.number_5} size={size} type={type} />
            <Ball number={combination!.special_number} state="special" size={size} type={type} />
        </>
    );

    return (
        <div className="flex">
            <div className="grid grid-cols-6 gap-2">{combination ? ActiveRow() : EmptyRow()}</div>
        </div>
    );
}
