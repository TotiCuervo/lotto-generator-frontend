import { useDrawContext } from '@/context/DrawContext'
import { useLotteryContext } from '@/context/LotteryContext'
import React, { useState } from 'react'

export default function LineGenerator() {
    const { generateDraws } = useDrawContext()
    const { currentType } = useLotteryContext()

    const [numberOfLines, setNumberOfLines] = useState(5)
    const [generating, setGenerating] = useState(false)

    const minusStyle =
        numberOfLines === 1
            ? 'bg-slate-200 text-black'
            : `bg-${currentType.baseColor} ${currentType.textColor} hover:bg-${currentType.activeColor} hover:text-gray-100`

    const plusStyle =
        numberOfLines === 10
            ? 'bg-slate-200 text-black'
            : `bg-${currentType.baseColor} ${currentType.textColor} hover:bg-${currentType.activeColor} hover:text-gray-100`

    async function buttonClick() {
        if (generating) return

        setGenerating(true)
        await generateDraws(numberOfLines)
        setGenerating(false)
    }

    function addOne() {
        if (numberOfLines < 10) {
            setNumberOfLines(numberOfLines + 1)
        }
    }

    function minusOne() {
        if (numberOfLines > 1) {
            setNumberOfLines(numberOfLines - 1)
        }
    }

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-300 p-2 sm:flex-row sm:rounded-full">
            <button
                className={`hidden h-10 w-10 items-center justify-center self-center sm:flex ${minusStyle} rounded-full font-semibold uppercase`}
                onClick={minusOne}
            >
                −
            </button>
            <input
                className="border-0 py-3 text-center text-3xl text-gray-800 placeholder-gray-500 focus:bg-gray-100 sm:w-20 sm:text-base"
                type="number"
                name="numberOfLines"
                placeholder="#"
                value={numberOfLines}
                onChange={(e) => setNumberOfLines(parseInt(e.target.value))}
            />
            <button
                className={`hidden h-10 w-10 items-center justify-center self-center sm:flex ${plusStyle} rounded-full font-semibold uppercase`}
                onClick={addOne}
            >
                +
            </button>

            <div className="order-3 grid grid-cols-2 gap-2 pb-4 sm:hidden">
                <button
                    className={`h-12 items-center justify-center self-center sm:flex ${minusStyle} rounded-full font-semibold uppercase`}
                    onClick={minusOne}
                >
                    −
                </button>
                <button
                    className={`h-12 items-center justify-center self-center sm:flex ${plusStyle} rounded-full font-semibold uppercase`}
                    onClick={addOne}
                >
                    +
                </button>
            </div>

            <p className="order-2 mx-2 rounded-l-full border-0 px-4 py-3 text-gray-800 placeholder-gray-500 focus:bg-gray-100">
                Lines of Numbers
            </p>

            <button
                type="button"
                className={`order-5 rounded-l-full rounded-r-full bg-${currentType.baseColor} px-4 py-3 font-semibold uppercase ${currentType.textColor} hover:bg-${currentType.activeColor} sm:rounded-l-none`}
                onClick={buttonClick}
            >
                <span className="flex items-center justify-center">
                    {generating ? (
                        <>
                            <svg
                                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <span>Generating</span>
                        </>
                    ) : (
                        'Generate'
                    )}
                </span>
            </button>
        </div>
    )
}
