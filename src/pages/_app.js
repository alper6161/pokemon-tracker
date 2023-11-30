import "@/assets/styles/main.css";
export default function MyApp({ Component, pageProps }) {
    return <div style={{height: '100vw', display: 'flex', flexDirection: 'column',background: 'darkred'}}>
        <Component {...pageProps} />
    </div>
}