import React, { useState } from 'react';

const InputSimple = ({
    type = "text",
    id,
    label,
    options = [],
    inputClass = "",
    ...props
}) => {
    const [isInOption, setIsInOption] = useState(false)
    return (
        <div className="relative z-0 text-content font-content font-semibold md:text-[1.5rem] text-[1rem] w-full">
            {type === "select" ? (
                <div>
                    <label
                        htmlFor={id}
                        className={`block mb-2 transition-colors duration-300 text-[1rem] ${isInOption ? 'text-black' : 'text-label'}`}
                    >
                        {label}
                    </label>
                    <select
                        id={id}
                        className={`block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-gray-600 bg-white text-gray-700 text-[1rem] peer ${inputClass}`}
                        onFocus={() => setIsInOption(true)}
                        onBlur={() => setIsInOption(false)}
                        {...props}
                    >
                        {options.map((option, index) => (
                            <option
                                key={index}
                                value={option.value || option}
                                className="text-gray-700 text-[1rem]"
                            >
                                {option.label || option}
                            </option>
                        ))}
                    </select>
                </div>
            ) : type === "radio" || type === "checkbox" ? (
                <div className="flex flex-col text-[1rem]">
                    <label className="text-label dark:text-gray-400 block mb-2">
                        {label}
                    </label>
                    <div className="flex flex-row flex-wrap">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center mr-4 mb-2">
                                <input
                                    type={type}
                                    id={`${id}-${index}`}
                                    name={id}
                                    value={option.value || option}
                                    className={`mr-2 ${inputClass}`}
                                    {...props}
                                />
                                <label htmlFor={`${id}-${index}`} className="text-[1rem]">
                                    {option.label || option}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={`${type == 'date' && 'text-[1.2rem]'} `}>
                    <input
                        type={type}
                        id={id}
                        className={`block py-2.5 px-0 w-full bg-transparent border-0 border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer ${inputClass}`}
                        placeholder=" "
                        {...props}
                    />
                    <label
                        htmlFor={id}
                        className="absolute text-label dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:text-content peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 sm:peer-focus:-translate-y-8 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                        {label}
                    </label>
                </div>
            )}
        </div>
    );
};

export default InputSimple;
