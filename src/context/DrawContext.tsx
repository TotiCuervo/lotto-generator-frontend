'use client'

import React, { useState, useContext, ReactNode, useEffect } from 'react'
import { IDraw } from '@/types'
import { drawPowerball } from '@/endpoints/drawPowerball'
import { drawMegaMillions } from '@/endpoints/drawMegaMillions'
import { LotteryType } from '@/types/LotteryType'
import useLotteryColorSchema from '@/hooks/useLotteryColorSchema'

interface IContextProps {
    children: ReactNode
    type: LotteryType
}

export interface DrawContextType {
    draws: IDraw[]
    generateDraws: (numberOfDraws: number) => Promise<void>
}

export const DrawContext = React.createContext<DrawContextType>(
    {} as DrawContextType
)

export function DrawProvider({ children, type }: IContextProps) {
    const { schema } = useLotteryColorSchema(type)
    const [draws, setDraws] = useState<IDraw[]>([])

    async function generateDraws(numberOfDraws: number) {
        const draw =
            schema.name === 'Powerball' ? drawPowerball : drawMegaMillions

        const { data } = await draw(numberOfDraws)
        setDraws(data)
    }

    useEffect(() => {
        setDraws([])
    }, [type])

    const contextValue = {
        draws,
        generateDraws,
    }

    return (
        <DrawContext.Provider value={contextValue}>
            {children}
        </DrawContext.Provider>
    )
}

export function useDrawContext() {
    return useContext(DrawContext)
}
