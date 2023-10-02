import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export interface MenuItem {
    name: string;
    type: "link" | "button" | "info";
    action?: () => void;
    href?: string;
}

export type GroupedMenuItems = MenuItem[];

interface IProps {
    children: React.ReactNode;
    menuItems: GroupedMenuItems[];
}

export default function Dropdown({ children, menuItems }: IProps) {
    function renderMenuItem(item: MenuItem, active: boolean) {
        if (item.type === "link") {
            return (
                <Link
                    href={item.href!}
                    className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-500",
                        "block px-4 py-2 text-sm font-medium"
                    )}
                >
                    {item.name}
                </Link>
            );
        }

        if (item.type === "info") {
            return (
                <div
                    className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-500",
                        "block px-4 py-2 text-sm font-medium"
                    )}
                >
                    {item.name}
                </div>
            );
        }

        if (item.type === "button") {
            return (
                <div
                    className="block cursor-pointer px-4 py-2 text-sm font-medium hover:bg-slate-200 focus:bg-slate-200"
                    onClick={item.action!}
                >
                    {item.name}
                </div>
            );
        }
    }

    return (
        <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
                <div className="flex">
                    <Menu.Button>{children}</Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {menuItems.map((group, index) => (
                            <div className="py-1" key={`dropdown-${index}`}>
                                {group.map((item) => (
                                    <Menu.Item>{({ active }) => <>{renderMenuItem(item, active)}</>}</Menu.Item>
                                ))}
                            </div>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
