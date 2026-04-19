declare module '*.svg' {
	const src: string;
	export default src;
}
declare module '*.svg?react' {
	import React = require('react');
	const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}
declare module '*.png' {
	const content: any;
	export default content;
}
declare module '*.jpg' {
	const content: any;
	export default content;
}
declare module '*.json' {
	const content: any;
	export default content;
}

declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.sass' {
	const classes: { [key: string]: string };
	export default classes;
}
