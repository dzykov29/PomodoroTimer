import { ChangeEvent, FC } from 'react'
import styles from './SettingInput.module.css'

interface SettingInputProps {
    mode: boolean
    name: string
    type: 'text' | 'number' | 'checkbox' | 'radio'
    labelText: string
    units: string
    value?: string | number
    placeholder: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const SettingInput: FC<SettingInputProps> = ({
    mode,
    name,
    type,
    labelText,
    value,
    placeholder,
    units,
    onChange,
}) => {
    // Преобразование NaN в пустую строку, если value является NaN
    const sanitizedValue = isNaN(value as number) ? '' : value
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={name}>{labelText}</label>
            <div className={styles.input__inner}>
                <input
                    className={
                        mode ? `${styles.input_dark}` : `${styles.input_light}`
                    }
                    type={type}
                    name={name}
                    value={sanitizedValue}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <span className={mode ? styles.units_dark : styles.units_light}>{units}</span>
            </div>
            {!value && (
                <label className={styles.error__label}>
                    Поле должно быть заполнено
                </label>
            )}
        </div>
    )
}

export default SettingInput
