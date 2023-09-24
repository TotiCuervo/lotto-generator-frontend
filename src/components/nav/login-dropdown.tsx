import { useSessionContext } from '@/context/SessionContext'
import Dropdown, { GroupedMenuItems } from '../dropdown/dropdown'

export default function LoginDropdown() {
    const { session, profile, logout } = useSessionContext()

    const menuItems: GroupedMenuItems[] = [
        [
            {
                type: 'info',
                name: session?.user?.email!,
            },
        ],
        [
            {
                type: 'link',
                name: 'Buy Credits',
                href: '/pricing',
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

    return (
        <>
            {profile?.avatar_url ? (
                <Dropdown menuItems={menuItems}>
                    <img
                        className="h-10 w-10 rounded-full"
                        src={profile.avatar_url}
                        alt="Rounded avatar"
                    />
                </Dropdown>
            ) : (
                <Dropdown menuItems={menuItems}>
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-600`}
                    >
                        <p
                            className={`text-center text-xl font-bold text-white`}
                        >
                            {session!.user.email!.charAt(0).toUpperCase()}
                        </p>
                    </div>
                </Dropdown>
            )}
        </>
    )
}
