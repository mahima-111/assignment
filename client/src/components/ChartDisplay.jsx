import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

const ChartDisplay = ({chartData}) => {
    return (
        <BarChart
            width={1000}
            height={400}
            data={chartData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
            barSize={50}
            barCategoryGap={'30%'}
        >
            <XAxis dataKey="name"/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8"  />
        </BarChart>
    )
}

export default ChartDisplay