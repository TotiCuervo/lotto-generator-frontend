import { DrawProvider } from '@/context/DrawContext'
import HowItWorks from '@/components/howitworks/how-it-works'
import Hero from '@/components/hero'
import { LotteryType } from '@/types/LotteryType'

interface IProps {
    type: LotteryType
}

export default function PageLayout({ type }: IProps) {
    return (
        <DrawProvider type={type}>
            <Hero type={type} />
            <HowItWorks type={type} />
        </DrawProvider>
    )
}
