import { useCartContext } from '@/context/CartContext'
import PrimaryButton from '@/components/buttons/primary-button'
import { useSessionContext } from '@/context/SessionContext'
import Link from 'next/link'

export default function TotalSection() {
    const { toggleMenu, cartItems } = useCartContext()
    const { profile } = useSessionContext()

    const hasSufficientCredits =
        profile && profile.credits - cartItems.length >= 0

    function getHintText() {
        if (!profile) {
            return "Login to reserve your numbers. Your reservations will be still be here when you're logged in."
        }

        if (!hasSufficientCredits) {
            return 'Insufficient credits. Please buy more credits to reserve your numbers.'
        }

        return `After reserving, you will have ${
            profile.credits - cartItems.length
        } credits left.`
    }

    return (
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Cost</p>
                <p>{cartItems.length} Credits</p>
            </div>
            <p
                className={`mt-2 text-sm ${
                    profile && hasSufficientCredits
                        ? 'text-gray-500'
                        : 'text-red-500'
                }`}
            >
                {getHintText()}
            </p>
            <div className="mt-6">
                {!profile && (
                    <Link href="/login" onClick={() => toggleMenu(false)}>
                        <PrimaryButton className="w-full">Login</PrimaryButton>
                    </Link>
                )}
                {profile && !hasSufficientCredits && (
                    <Link href="/pricing">
                        <PrimaryButton className="w-full">
                            Buy More Credits
                        </PrimaryButton>
                    </Link>
                )}
                {profile && hasSufficientCredits && (
                    <Link href="/pricing">
                        <PrimaryButton className="w-full">
                            Complete Reservation
                        </PrimaryButton>
                    </Link>
                )}
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                    or{' '}
                    <button
                        type="button"
                        className="font-medium text-slate-700 hover:text-slate-600"
                        onClick={() => toggleMenu(false)}
                    >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                    </button>
                </p>
            </div>
        </div>
    )
}
