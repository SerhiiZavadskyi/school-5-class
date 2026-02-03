interface FractionPieProps {
	numerator: number;
	denominator: number;
	color?: string;
	size?: number;
}

const FractionPie: React.FC<FractionPieProps> = ({ numerator, denominator, color = "text-blue-500", size = 100 }) => {
	const radius = 40;
	const center = 50;
	const paths = [];
	const safeDen = Math.max(1, denominator);
	for (let i = 0; i < safeDen; i++) {
		const startAngle = (i * 360) / safeDen;
		const endAngle = ((i + 1) * 360) / safeDen;
		const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
		const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
		const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180);
		const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180);
		const filled = i < numerator;
		const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
		paths.push(
			<path
				key={i}
				d={pathData}
				className={`${filled ? color : "text-gray-200"} fill-current stroke-white stroke-1 transition-colors duration-300`}
			/>,
		);
	}
	return (
		<svg width={size} height={size} viewBox="0 0 100 100" className="inline-block">
			{paths}
			<circle cx="50" cy="50" r="40" fill="none" stroke="#cbd5e1" strokeWidth="2" />
		</svg>
	);
};
export default FractionPie;
