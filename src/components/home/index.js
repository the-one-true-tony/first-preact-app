import { h, Component } from 'preact';
import style from './style.less';
let d3 = require('d3');

export default class Home extends Component {

	componentDidMount() {
		let nodeData = {
	    "name": "TOPICS", "children": [{
	        "name": "Topic A",
	        "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
	    }, {
	        "name": "Topic B",
	        "children": [{"name": "Sub B1", "size": 3}, {"name": "Sub B2", "size": 3}, {
	            "name": "Sub B3", "size": 3}]
	    }, {
	        "name": "Topic C",
	        "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
	    }]
		};
		let width = 500;  // <-- 1
		let height = 500;
		let radius = Math.min(width, height) / 2;  // < -- 2
		let color = d3.scaleOrdinal(d3.schemeCategory20b);   // <-- 3

		let g = d3.select('svg')  // <-- 1
	    .attr('width', width)  // <-- 2
	    .attr('height', height)
	    .append('g')  // <-- 3
	    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let partition = d3.partition()  // <-- 1
	    .size([2 * Math.PI, radius]);  // <-- 2

		let root = d3.hierarchy(nodeData)  // <-- 1
	    .sum((d) => d.size);

		partition(root);  // <-- 1
		var arc = d3.arc()  // <-- 2
	    .startAngle(function (d) { return d.x0 })
	    .endAngle(function (d) { return d.x1 })
	    .innerRadius(function (d) { return d.y0 })
	    .outerRadius(function (d) { return d.y1 });

		g.selectAll('path')  // <-- 1
	    .data(root.descendants())  // <-- 2
	    .enter()  // <-- 3
	    .append('path')  // <-- 4
	    .attr("display", function (d) { return d.depth ? null : "none"; })  // <-- 5
	    .attr("d", arc)  // <-- 6
	    .style('stroke', '#fff')  // <-- 7
	    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });  // <-- 8
	}
	render() {

		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<div class={style.grid}>
					<svg></svg>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>

				</div>
			</div>
		);
	}
}
