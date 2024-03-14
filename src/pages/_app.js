import "@/assets/styles/main.css";
import {Header} from "@/components/Header";
export default function MyApp({ Component, pageProps }) {
    return <div className="background-app">
        <Header/>
        <Component {...pageProps} />
    </div>
}
