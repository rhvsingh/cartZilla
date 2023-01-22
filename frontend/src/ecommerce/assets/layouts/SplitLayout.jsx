const SplitLayout = (props) => {
    console.log(props);

    return (
        <section className='container-2 d-flex justify-between'>
            <div>
                {props.children[0]}
            </div>
            <div>
                {props.children[1]}
            </div>
        </section>
    )
}

export default SplitLayout