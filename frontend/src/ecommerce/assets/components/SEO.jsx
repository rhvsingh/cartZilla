import { Helmet, HelmetProvider } from "react-helmet-async"

export default function SEO({ title, keywords, description, name, type }) {
    return (
        <HelmetProvider>
            <Helmet>
                {/* Standard metadata tags */}
                <title>{title ? `${title}` : "CartZilla"}</title>
                <meta name="keywords" content={keywords ? keywords : ""} />
                <meta name="description" content={description ? description : ""} />
                {/* End standard metadata tags */}
                {/* Facebook tags */}
                <meta property="og:type" content={type} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                {/* End Facebook tags */}
                {/* Twitter tags */}
                <meta name="twitter:creator" content={name} />
                <meta name="twitter:card" content={type} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                {/* End Twitter tags */}
            </Helmet>
        </HelmetProvider>
    )
}
