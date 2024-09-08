import React from 'react'

const SelectDropdown = ({ options, value, onChange, dropDownType }) => {
    return (
        <div className="select-box">
            <select value={value} onChange={onChange}>
                {dropDownType === 'main' && (
                    <option value="" disabled>
                        Select schema to add
                    </option>
                )}
                <option value="">Select schema</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectDropdown;