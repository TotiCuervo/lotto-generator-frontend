import {
    powerballSchema,
    megaMillionsSchema,
} from '@/hooks/useLotteryColorSchema'
import { LotteryType } from '@/types/LotteryType'

interface IProps {
    type: LotteryType
    setType: React.Dispatch<React.SetStateAction<LotteryType>>
}

export default function TextSwitch({ type, setType }: IProps) {

    const handleCheckboxChange = () => {
        if (type === 'Powerball') {
            setType('Mega Millions')
        } else {
            setType('Powerball')
        }
    }

    return (
        <>
            <label className="relative inline-flex cursor-pointer select-none items-center justify-center rounded-md border border-gray-300 p-1">
                <input
                    type="checkbox"
                    className="sr-only"
                    onChange={handleCheckboxChange}
                />
                <span
                    className={`flex items-center space-x-[6px] rounded px-[18px] py-2 text-xl font-medium transition duration-300 ease-in-out ${
                        type === 'Powerball'
                            ? `text-white bg-${powerballSchema.baseColor}`
                            : 'text-primary bg-[#f4f7ff]'
                    }`}
                >
                    Powerball
                </span>
                <span
                    className={`flex items-center space-x-[6px] rounded px-[18px] py-2 text-xl font-medium transition duration-300 ease-in-out ${
                        type === 'Mega Millions'
                            ? `text-black bg-${megaMillionsSchema.baseColor}`
                            : 'text-body-color bg-[#f4f7ff]'
                    }`}
                >
                    Mega-Millions
                </span>
            </label>
        </>
    )
}
