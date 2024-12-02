import Editor from "react-simple-wysiwyg"

const TextEditor = ({ context, setContext }) => {
    function onChangeDesc(e) {
        setContext(e.target.value)
    }

    //Just adding commit again to check whether it is working or not

    return (
        <Editor
            containerProps={{ style: { marginBottom: "1rem" } }}
            value={context}
            onChange={onChangeDesc}
        />
    )
}

export default TextEditor
