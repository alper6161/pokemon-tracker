import "@/assets/styles/main.css";
export default function MyApp({ Component, pageProps }) {
    return <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column',background: '#9CBFA7', overflow: 'auto'}}>
        <Component {...pageProps} />
    </div>
}