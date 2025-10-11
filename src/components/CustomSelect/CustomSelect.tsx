import { useState, useRef, useEffect } from 'react';
import './CustomSelect.scss';
import { FaChevronDown } from 'react-icons/fa';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  defaultSelected?: Option;
  onChange?: (option: Option) => void;
  label: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, defaultSelected, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected || options[0]);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select-container" ref={selectRef}>
      <label className="custom-select-label">{label}</label>
      <div className={`custom-select ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="select-selected">
          {selected.label}
          <FaChevronDown className="select-arrow" />
        </div>
        {isOpen && (
          <div className="select-items">
            {options.map((option) => (
              <div
                key={option.value}
                className={`select-item ${selected.value === option.value ? 'selected' : ''}`}
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

export default CustomSelect;
