/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export interface MaskOptions {
  prefix: string;
  suffix: string;
  includeThousandsSeparator: boolean;
  thousandsSeparatorSymbol: string;
  decimalSymbol: string;
  allowDecimal: boolean;
  allowNegative: boolean;
  allowLeadingZeroes: boolean;
  decimalLimit: number;
}

interface CurrencyInputProps {
  disabled?: boolean;
  maskOptions?: Partial<MaskOptions>;
  className?: string;
  onChange?: (_value: string, _e: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  decimalSymbol: '.',
  allowDecimal: false,
  allowNegative: false,
  allowLeadingZeroes: false,
  decimalLimit: 3,
};

const CurrencyInput = ({
  disabled = false,
  maskOptions = {},
  className = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_value, _e) => { },
  ...inputProps
}: CurrencyInputProps) => {
  const options = {
    ...defaultMaskOptions,
    ...maskOptions,
  };
  const currencyMask = createNumberMask(options);

  return (
    <MaskedInput
      className={`${className}`}
      inputMode="numeric"
      mask={currencyMask}
      disabled={disabled}
      onChange={(e) => {
        const { value } = e.target;
        //@ts-ignore
        onChange(value.replace(options.suffix, '').replaceAll(',', '') * 1, e);
      }}
      {...inputProps}
    />
  );
};

export default CurrencyInput;
