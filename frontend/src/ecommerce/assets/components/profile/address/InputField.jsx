import ProfileStyle from "../../../pages/profile.module.css"

const InputField = ({
  idName,
  content,
  setContent,
  label,
  maxLength,
  tabIndex,
  autoComplete,
}) => {
  const handleInputChange = (e) => {
    setContent(e.target.value)
  }

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
        onChange={handleInputChange}
        required
      />
      <label htmlFor={"address_" + idName}>{label}</label>
    </div>
  )
}

export default InputField
