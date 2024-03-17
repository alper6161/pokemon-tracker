import {systemColors} from "@/utils/constants";
import {capitilazeFirstLetter} from "@/utils/common";
import {NavigateNext} from "@mui/icons-material";
import React from "react";
import {useRouter} from "next/router";


export const EvolutionContainer = ({evolutionDetails, name}) => {
    const router = useRouter();

    return <div style={{
        flex: 1,
        background: systemColors.darkGray,
        display: 'flex',
        alignItems: 'center',
        margin: '1rem',
        borderRadius: '2rem'
    }}>
        {
            evolutionDetails?.map((evolution, index) => <>
                    <div className="centered"
                         style={{
                             flex: 1,
                             color: 'white',
                             flexDirection: 'column',
                             cursor: 'pointer'
                         }}
                         onClick={() => router.push(`/pokemon/${evolution.pokeId}`)}>
                        <div style={{
                            padding: '1rem',
                            margin: '1rem',
                            border: '1px solid white',
                            background: evolution.name === name ? systemColors.yellow : 'gray',
                            borderRadius: '10rem'
                        }}>
                            {evolution.image}
                        </div>
                        {capitilazeFirstLetter(evolution.name)}
                    </div>
                    {
                        index < evolutionDetails.length - 1 &&
                        <NavigateNext sx={{color: 'white', fontSize: '96px'}}>
                        </NavigateNext>
                    }
                </>
            )
        }
    </div>
}