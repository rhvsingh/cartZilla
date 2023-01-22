const SplitLayout = (props) => {
    return (
        <section className={`container-2 d-flex justify-between`}>
            <div style={{ flex: `${props.div1}` }}>
                {props.children[0]}
            </div>
            <div style={{ flex: `${props.div2}` }}>
                {props.children[1]}
            </div>
        </section>
    )
}

export default SplitLayout