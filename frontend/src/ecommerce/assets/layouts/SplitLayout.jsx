import "./splitLayout.css"

const SplitLayout = (props) => {
  return (
    <section className={`container-2 split-layout py-1 d-flex justify-between`}>
      <div style={{ flex: `${props.div1 ? props.div1 : "auto"}` }}>
        {props.children[0]}
      </div>
      <div style={{ flex: `${props.div2 ? props.div2 : "auto"}` }}>
        {props.children[1]}
      </div>
    </section>
  )
}

export default SplitLayout
