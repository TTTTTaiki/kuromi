import * as d3 from "d3";

function App() {

	const winRates = [
		0.3,
		0.31,
		0.29,
		0.27,
		0.33,
		0.34,
		0.35,
		0.31,
		0.25,
		0.33,
		0.35,
		0.44,
		0.46,
		0.45,
		0.33,
		0.32,
		0.21,
		0.3,
		0.47,
		0.32,
		0.4,
		0.63,
		0.57,
		0.64,
		0.7,
		0.83
	];

	const contentW = 500, contentH = 500;
	const margin = { top: 50, bottom: 100, left: 100, right: 100 };
	const windowW = contentW + margin.left + margin.right;
	const windowH = contentH + margin.top + margin.bottom;
	const lineCol = "black";
	const dataCol = "red";

	const xScale = d3.scaleLinear()
		.domain([0, winRates.length - 1])
		.range([0, contentW])
		.nice();
	console.log(xScale.ticks());

	const yScale = d3.scaleLinear()
		.domain(d3.extent(winRates))
		.range([contentH, 0])
		.nice();
	console.log(yScale.ticks());

	const line = d3.line()
		.x((d, i) => xScale(i))
		.y((d) => yScale(d));

	return (
		<div>
			<svg width={windowW} height={windowH}>
				<text x={windowW / 2} y="30" stroke="lineCol" fontSize="20">～～側の勝率の推移</text>
				<g transform={`translate(${margin.left},${margin.top})`}>

					<g>
						<line x1="0" y1="0" x2="0" y2={contentH} stroke={lineCol}></line>
						<text ></text>
						{
							yScale.ticks().map((item, index) => {
								return (
									<g key={index} transform={`translate(0, ${yScale(item)})`}>
										<line x1="-3" y1="0" x2={contentW} y2="0" stroke={lineCol} strokeOpacity="40%" />
										<text x="-10" y="0" textAnchor="end" dominantBaseline="central">{item}</text>
									</g>
								);
							})
						}
					</g>

					<g transform={`translate(0, ${contentH})`}>
						<line x1="0" y1="0" x2={contentW} y2="0" stroke={lineCol}></line>
						{
							xScale.ticks().map((item, index) => {
								return (
									<g key={index} transform={`translate(${xScale(item)}, 0)`}>
										<line x1="0" y1="0" x2="0" y2="3" stroke={lineCol} />
										<text x="0" y="18" textAnchor="middle" dominantBaseline="top">{item}</text>
									</g>
								);
							})
						}
					</g>
					<g>
						<path d={line(winRates)} fill="none" stroke={dataCol} strokeWidth="2" />
					</g>
				</g>
			</svg>

		</div>
	);
}
export default App;