type ButtonType = {
    callback: () => void
    title: string
}
export const Button = ({ callback, title, ...props }: ButtonType) => {
    return (
        <>
            <button onClick={callback}>{title}</button>
        </>
    )
}