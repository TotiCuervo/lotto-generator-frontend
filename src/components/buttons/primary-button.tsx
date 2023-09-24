import React from 'react'

interface IProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children: React.ReactNode
}

export default function PrimaryButton({
    children,
    className,
    ...props
}: IProps) {
    return (
        <button
            type="button"
            className={
                'flex items-center justify-center rounded-md border border-transparent bg-slate-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-600' +
                ' ' +
                className
            }
            {...props}
        >
            {children}
        </button>
    )
}
