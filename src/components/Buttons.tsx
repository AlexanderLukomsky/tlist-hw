
type ButtonPropsType = {
    title: string
    callback: () => void
}
export const Button = (props: ButtonPropsType) => {
    return (
        <button onClick={props.callback}>{props.title}</button>
    )
}