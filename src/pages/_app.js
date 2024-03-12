import "@/assets/styles/main.css";
import {useRouter} from "next/router";
export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    return <div className="background-app"
                style={{minHeight: '100vh', display: 'flex', flexDirection: 'column',background: '#9CBFA7', overflow: 'auto'}}>
        <div className="centered" onClick={() => router.push(`/pokemons`)} style={{cursor: 'pointer'}}>
            <img src={'/pokemon_logo.png'} alt={'Pokemon'} height={'100px'} />
        </div>
        <Component {...pageProps} />
    </div>
}
