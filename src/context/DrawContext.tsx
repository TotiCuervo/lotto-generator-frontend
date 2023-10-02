"use client";

import React, { useState, useContext, ReactNode, useEffect } from "react";
import { drawPowerball } from "@/endpoints/drawPowerball";
import { drawMegaMillions } from "@/endpoints/drawMegaMillions";
import { LotteryType } from "@/types/LotteryType";
import useLotteryColorSchema from "@/hooks/useLotteryColorSchema";
import { useSessionContext } from "./SessionContext";
import { Generation } from "@/types/Generation";

interface IContextProps {
    children: ReactNode;
    type: LotteryType;
}

export interface DrawContextType {
    draws: Generation[];
    generateDraws: (numberOfDraws: number) => Promise<void>;
}

export const DrawContext = React.createContext<DrawContextType>({} as DrawContextType);

export function DrawProvider({ children, type }: IContextProps) {
    const { schema } = useLotteryColorSchema(type);
    const { profile } = useSessionContext();
    const [draws, setDraws] = useState<Generation[]>([]);

    async function generateDraws(numberOfDraws: number) {
        const draw = schema.name === "Powerball" ? drawPowerball : drawMegaMillions;

        const { data } = await draw(numberOfDraws, profile?.id);
        console.log({ data });
        setDraws(data);
    }

    useEffect(() => {
        setDraws([]);
    }, [type]);

    const contextValue = {
        draws,
        generateDraws,
    };

    return <DrawContext.Provider value={contextValue}>{children}</DrawContext.Provider>;
}

export function useDrawContext() {
    return useContext(DrawContext);
}
