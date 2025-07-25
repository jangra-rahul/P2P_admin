import React, { ChangeEvent, KeyboardEvent, ReactNode } from 'react'
import Icons from '../common/Icons'

interface InputWithLabelSubProps {
  name: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  iconValue?: string; // Adjust if your Icons component expects something else
  className?: string;
  children: ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  maxLength?: number;
  minLength?: number;
}


const InputWithLabelSub: React.FC<InputWithLabelSubProps>  = ({ name, onKeyDown, iconValue, className, children, placeholder, value, onChange, type, maxLength, minLength }) => {
    return (
        <div className="flex flex-col w-full gap-[15px]">
            <div className="flex gap-2">
                <span className='cursor-pointer'>  <Icons icon={iconValue} /></span>
                <label htmlFor={name} className='text-base md:text-lg text-black/60 leading-140'>{children}</label>
            </div>
            <input
                type={type}
                className={`outline-none w-full ${className ? "placeholder:text-black/80 w-full" : "placeholder:text-black/30"} px-3 bg-[#F3F3F3] rounded-[10px] md:px-4 xl:px-5 py-2.5 lg:py-3 xl:py-[13px] text-sm leading-100 text-black `}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                minLength={minLength}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default InputWithLabelSub