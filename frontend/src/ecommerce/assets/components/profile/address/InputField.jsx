import ProfileStyle from "../../../pages/profile.module.css"

const InputField = ({
  idName,
  content,
  label,
  maxLength,
  tabIndex,
  autoComplete,
}) => {
  return (
    <div className={ProfileStyle.addressInputContainer}>
      <input
        type="text"
        id={"address_" + idName}
        name={"address_" + idName}
        value={content}
        autoComplete={autoComplete}
        tabIndex={tabIndex}
        maxLength={maxLength}
        required
      />
      <label htmlFor={"address_" + idName}>{label}</label>
    </div>
  )
}

export default InputField
