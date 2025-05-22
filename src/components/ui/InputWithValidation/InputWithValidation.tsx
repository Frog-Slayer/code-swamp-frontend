import { useEffect, useState } from "react"
import styles from './InputWithValidation.module.css'

interface InputWithValidationProps {
    label?: string
    type?: string
    name: string
    placeholder?: string
    value: string
    onChange?: (value: string) => void
    validate?: (value: string) => string
    onValidChange?: (isValid: boolean, value: string) => void
    readOnly?: boolean
}

const InputWithValidation = ({label, type = "text", name, placeholder, value, onChange, validate, onValidChange, readOnly = false } : InputWithValidationProps) => {
    const [message, setMessage] = useState('');
    const [touched, setTouched] = useState(false);
  
    useEffect(() => {
      if (!touched) return;
      if (!validate) return;

      const timer = setTimeout(() => {
        const msg = validate(value);
        setMessage(msg);
        if (onValidChange) onValidChange(msg === '', value);
      }, 300);

      return () => clearTimeout(timer);
    }, [value, touched, validate, onValidChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e.target.value)
    }
  
    return (
      <div className={styles.container}>
        <div className={styles.label} > {label} </div >
        <input className={`${styles.input} ${message ? styles['error-border'] : ''}`}
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setTouched(true)}
          readOnly={readOnly}
        />
        <p className={styles.error}>{message ? message: '\u00A0'}</p>
      </div>
    );
}

export default InputWithValidation