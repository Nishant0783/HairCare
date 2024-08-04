import React from 'react'

const Button = ({ bgColor, content, onClick, contentColor, extraClass, ...props }) => {
    return (
        <button
            className={`bg-${bgColor} rounded-lg text-${contentColor} font-content sm:text-[1.5rem] font-semibold ${extraClass}`}
            {...props}
        >
            {content}
        </button>
    )
}

export default Button