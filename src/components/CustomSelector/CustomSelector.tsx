import React, { useState, useRef, useEffect } from 'react';
import './CustomSelector.scss';
import { FaChevronDown } from 'react-icons/fa';

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectorProps {
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
  label?: string;
  placeholder?: string; // Made placeholder optional
  id?: string;
}

const CustomSelector: React.FC<CustomSelectorProps> = ({ options, value, onChange, label, placeholder = '', id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setIsOpen(false);
    onChange(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayLabel = value ? value.label : placeholder;
  const isPlaceholder = !value;

  return (
    <div id={id} className="custom-selector-container" ref={selectRef}>
      {label && <label className="custom-selector-label">{label}</label>}
      <div className={`custom-selector ${isOpen ? 'open' : ''} ${isPlaceholder ? 'is-placeholder' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="select-selected">
          <span>{displayLabel}</span>
          <FaChevronDown className="select-arrow" />
        </div>
        {isOpen && (
          <div className="select-items">
            {options.map((option) => (
              <div
                key={option.value}
                className={`select-item ${value?.value === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelector;
