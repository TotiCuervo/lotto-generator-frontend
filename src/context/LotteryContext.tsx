'use client'

import React, { useContext, ReactNode } from 'react'

type LotteryType = 'Powerball' | 'Mega Millions'

interface IContextProps {
    children: ReactNode
}

interface TypeInfo {
    name: LotteryType
    baseColor: string
    activeColor: string
    fromColor: string
    textColor: string
}

export interface LotteryContextType {
    currentType: TypeInfo
    alternativeType: TypeInfo
}

export const LotteryContext = React.createContext<LotteryContextType>(
    {} as LotteryContextType
)

export function LotteryProvider({ children }: IContextProps) {
    const info: TypeInfo[] = [
        {
            name: 'Powerball',
            baseColor: 'red-500',
            activeColor: 'red-600',
            fromColor: 'red-400',
            textColor: 'text-white',
        },
        {
            name: 'Mega Millions',
            baseColor: 'yellow-500',
            activeColor: 'yellow-600',
            fromColor: 'yellow-400',
            textColor: 'text-black',
        },
    ]

    const contextValue = {
        currentType: info[1],
        alternativeType: info[0],
    }

    return (
        <LotteryContext.Provider value={contextValue}>
            {children}
        </LotteryContext.Provider>
    )
}

export function useLotteryContext() {
    return useContext(LotteryContext)
}
