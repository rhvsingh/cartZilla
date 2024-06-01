import "./splitLayout.css"

const SplitLayout = (props) => {
    return (
        <section
            style={props.styleComponent}
            className={`${
                props.containerFluid ? "container-fluid min-height-screen" : "container-2"
            } split-layout py-1 d-flex justify-between`}
        >
            <div
                style={{
                    flex: `${props.div1 ? props.div1 : "auto"}`,
                    borderRight: props.styleBorder,
                }}
                className={props.adminClasses}
            >
                {props.children[0]}
            </div>
            <div
                className="split-layout-box-2"
                style={{ flex: `${props.div2 ? props.div2 : "auto"}` }}
            >
                {props.children[1]}
            </div>
        </section>
    )
}

export default SplitLayout
