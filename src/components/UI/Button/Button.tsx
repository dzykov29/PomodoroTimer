import './Button.css'

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    className: string
    type: 'submit' | 'reset' | 'button'
}

const Button = ({
    children,
    onClick,
    disabled,
    className,
    type,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={`${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
