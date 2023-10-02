import { useCartContext } from "@/context/CartContext";
import PrimaryButton from "@/components/buttons/primary-button";
import { useSessionContext } from "@/context/SessionContext";
import Link from "next/link";
import { useState } from "react";

export default function TotalSection() {
    const { toggleMenu, cartItems, claimCart, handleError } = useCartContext();
    const { profile } = useSessionContext();

    const hasSufficientCredits = profile && profile.credits - cartItems.length >= 0;
    const hasErrors = cartItems.some((item) => item.error);
    const disabled = (cartItems.length === 0 || hasErrors) && profile !== null;

    const [loading, setLoading] = useState(false);

    function getHintText() {
        if (!profile) {
            return "Login to reserve your numbers. Your reservations will be still be here when you're logged in.";
        }

        if (!hasSufficientCredits) {
            return "Insufficient credits. Please buy more credits to reserve your numbers.";
        }

        if (hasErrors) {
            return "Some of your numbers are invalid. Please remove them from your cart.";
        }

        return `After reserving, you will have ${profile.credits - cartItems.length} credits left.`;
    }

    async function handleClaim() {
        if (disabled || loading) {
            return;
        }

        setLoading(true);

        try {
            const res = await claimCart();

            if (res) {
                setLoading(false);
                toggleMenu(false);
            }
        } catch (error: any) {
            const { status, data } = error.response;
            console.log({ status, data });
            if (status === 400) {
                handleError(data);
            }
            setLoading(false);
        }
    }

    return (
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Cost</p>
                <p>{cartItems.length} Credits</p>
            </div>
            <p
                className={`mt-2 text-sm ${
                    profile && hasSufficientCredits && !hasErrors ? "text-gray-500" : "text-red-500"
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
                        <PrimaryButton className="w-full">Buy More Credits</PrimaryButton>
                    </Link>
                )}
                {profile && hasSufficientCredits && (
                    <PrimaryButton loading={loading} disabled={disabled} className="w-full" onClick={handleClaim}>
                        Complete Reservation
                    </PrimaryButton>
                )}
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>Reminder: Reservations are not lottery tickets. You must buy the tickets separately.</p>
            </div>
        </div>
    );
}
