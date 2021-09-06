interface Props {
  text: string
}

const Alert = ({ text }: Props) => (
  <div
    className="py-3 px-5 mb-4 bg-red-100 text-red-900 text-sm rounded-md border border-red-200"
    role="alert"
  >
    {text}
  </div>
)

export default Alert
