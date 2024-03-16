import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip} from 'recharts';
import {useEffect, useState} from "react";
import {capitilazeFirstLetter} from "@/utils/common";
import {systemColors} from "@/utils/constants";

export const StatChart = ({data, name}) => {
    const [statData, setStatData] = useState([]);

    useEffect(() => {
        setStatData(data.map((d) => ({
            base_stat: d.base_stat,
            stat: capitilazeFirstLetter(d.stat.name)
        })))
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statData}>
                <PolarGrid/>
                <Tooltip />
                <PolarAngleAxis dataKey="stat"/>
                <PolarRadiusAxis/>
                <Radar name={capitilazeFirstLetter(name)} dataKey="base_stat" stroke={systemColors.yellow} fill={systemColors.yellow} fillOpacity={0.6}/>
            </RadarChart>
        </ResponsiveContainer>
    );
}