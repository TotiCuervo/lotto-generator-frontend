'use client'

import React, { useState, useContext, ReactNode } from 'react'
import { IDraw } from '@/types'
import { drawPowerball } from '@/endpoints/drawPowerball'
import { useLotteryContext } from './LotteryContext'
import { drawMegaMillions } from '@/endpoints/drawMegaMillions'

interface IContextProps {
    children: ReactNode
}

export interface DrawContextType {
    draws: IDraw[]
    generateDraws: (numberOfDraws: number) => Promise<void>
}

export const DrawContext = React.createContext<DrawContextType>(
    {} as DrawContextType
)

export function DrawProvider({ children }: IContextProps) {
    const { currentType } = useLotteryContext()
    const [draws, setDraws] = useState<IDraw[]>([])

    async function generateDraws(numberOfDraws: number) {
        const draw =
            currentType.name === 'Powerball' ? drawPowerball : drawMegaMillions

        const { data } = await draw(numberOfDraws)
        setDraws(data)
    }

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
