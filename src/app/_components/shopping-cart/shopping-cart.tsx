'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCartContext } from '@/context/CartContext'
import BallRow from '@/components/lottery/ball-row'
import PrimaryButton from '@/components/buttons/primary-button'
import { useSessionContext } from '@/context/SessionContext'
import TotalSection from './_components/total-section'
import CartItem from './_components/cart-item'

export default function ShoppingCart() {
    const { openMenu, toggleMenu, cartItems, removeFromCart } = useCartContext()
    const { profile } = useSessionContext()

    return (
        <Transition.Root show={openMenu} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={toggleMenu}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Reservations
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() =>
                                                            toggleMenu(false)
                                                        }
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">
                                                            Close panel
                                                        </span>
                                                        <XMarkIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul
                                                        role="list"
                                                        className="-my-6 divide-y divide-gray-200"
                                                    >
                                                        {cartItems.map(
                                                            (item, index) => (
                                                                <CartItem
                                                                    key={index}
                                                                    item={item}
                                                                />
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <TotalSection />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
