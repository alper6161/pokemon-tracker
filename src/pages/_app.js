import "@/assets/styles/main.css";
export default function MyApp({ Component, pageProps }) {
    return <div style={{height: '100vw', display: 'flex', flexDirection: 'column',background: '#9CBFA7'}}>
        <Component {...pageProps} />
    </div>
}