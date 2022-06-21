
type ButtonPropsType = {
    title: string
    callback: () => void
    disabled?: boolean
    className?: string
}
export const Button: React.FC<ButtonPropsType> = (
    {
        disabled = false,
        callback,
        className = '',
        ...props
    }) => {
    const style = {
        opacity: disabled ? '0.3' : '1'
    }
    return (
        <button style={style} className={`button ${className}`} disabled={disabled} onClick={callback}>
            {props.title}
        </button>
    )
}