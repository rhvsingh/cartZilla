import Editor from "react-simple-wysiwyg"

const TextEditor = ({ context, setContext }) => {
    function onChangeDesc(e) {
        setContext(e.target.value)
    }

    return (
        <Editor
            containerProps={{ style: { marginBottom: "1rem" } }}
            value={context}
            onChange={onChangeDesc}
        />
    )
}

export default TextEditor
