import React from "react";

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
}

export default function PrimaryButton({ children, loading, className, ...props }: IProps) {
    return (
        <button
            type="button"
            className={
                "flex items-center justify-center rounded-md border border-transparent bg-slate-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-600 disabled:bg-slate-500 transition duration-200 ease-in-out" +
                " " +
                className
            }
            {...props}
        >
            {loading ? (
                <div
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
