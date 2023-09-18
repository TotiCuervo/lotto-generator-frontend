import Link from 'next/link'
import { useSessionContext } from '@/context/SessionContext'
import { useLotteryContext } from '@/context/LotteryContext'
import Dropdown, { GroupedMenuItems } from '../dropdown/dropdown'

export default function LoginListItem() {
    const { session, profile, logout } = useSessionContext()
    const { currentType } = useLotteryContext()

    const menuItems: GroupedMenuItems[] = [
        [
            {
                type: 'info',
                name: session?.user?.email!,
            },
        ],
        [
            {
                type: 'info',
                name: 'Buy Credits',
            },
        ],
        [
            {
                type: 'button',
                name: 'Logout',
                action: async () => {
                    await logout()
                },
            },
        ],
    ]

    console.log('session boopy', session)

    if (session?.user) {
        if (profile?.avatar_url) {
            return (
                <Dropdown menuItems={menuItems}>
                    <img
                        className="h-10 w-10 rounded-full"
                        src={profile.avatar_url}
                        alt="Rounded avatar"
                    />
                </Dropdown>
            )
        }

        return (
            <Dropdown menuItems={menuItems}>
                <div
                    className={`h-10 w-10 rounded-full bg-${currentType.baseColor} flex items-center justify-center`}
                >
                    <p
                        className={`text-center text-xl ${currentType.textColor} font-bold`}
                    >
                        {session.user.email!.charAt(0).toUpperCase()}
                    </p>
                </div>
            </Dropdown>
        )
    }

    return (
        <Link
            href="/login"
            className="btn-sm ml-3 bg-red-600 text-gray-200 hover:bg-red-800"
        >
            <span>Login</span>
        </Link>
    )
}
