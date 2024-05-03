import SEO from "../../assets/components/SEO"

const MainContentShow = () => {
    return (
        <>
            <SEO title="Dashboard | CartZilla" />
            <div
                className="dashboard-header d-flex px-1 py-1"
                style={{
                    borderBottom: "1px solid var(--white-color-d)",
                    padding: "1.8rem 1.5rem",
                }}
            >
                <div style={{ fontSize: "1rem", fontWeight: "bold" }}>Dashboard</div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}

export default MainContentShow
