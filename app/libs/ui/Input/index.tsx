import {
  Label,
  FormFeedback,
  Input as StrapInput,
  type InputProps as StrapInputProps,
} from 'reactstrap'

interface InputProps extends StrapInputProps {
  label?: string
  isError?: boolean
  invalidMsg?: string
}
const Input = ({ label, isError, invalidMsg, ...props }: InputProps) => {
  return (
    <div className='flex-1'>
      {label && <Label className='form-label'>{label}</Label>}
      <StrapInput {...props} />

      <div style={{ height: 16 }}>
        <div className='invalid-feedback d-block'>{props.invalid ? invalidMsg : ''}</div>
      </div>
    </div>
  )
}

export default Input
