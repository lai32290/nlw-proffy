import React, { SelectHTMLAttributes } from 'react';

import './style.css'; 

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select id={name} {...rest}>
                <option value="" selected disabled hidden>Selecione uma opçaõ</option>

                {options.map(option => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;