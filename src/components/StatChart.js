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

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            const edge = payload[0].payload;
            return (
                <div style={{padding: '1rem', background: '#C08D55', color: 'white'}}>
                    <h4>{`${label}: ${edge.base_stat}`}</h4>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statData}>
                <PolarGrid/>
                <Tooltip content={<CustomTooltip/>}/>
                <PolarAngleAxis dataKey="stat"/>
                <PolarRadiusAxis domain={[0, 140]}/>
                <Radar name={capitilazeFirstLetter(name)} dataKey="base_stat" stroke={systemColors.yellow}
                       fill={systemColors.yellow} fillOpacity={0.6} isAnimationActive={false}/>
            </RadarChart>
        </ResponsiveContainer>
    );
}