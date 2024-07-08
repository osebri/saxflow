import * as React from "react";
import anime from "animejs";

const SvgComponent = (props) => {
  React.useEffect(() => {
    anime({
      targets: '#Pendulum',
      rotate: [
        { value: 40, duration: 500, easing: 'linear' },
        { value: 0, duration: 500, easing: 'linear' },
        { value: -40, duration: 500, easing: 'linear' },
        { value: 0, duration: 500, easing: 'linear' },
      ],
      loop: true,
      transformOrigin: 'center bottom'
    });
  }, []);

  return (
    <svg
      width={385}
      height={319}
      viewBox="0 0 385 319"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
    <g id="Frame 1">
      <g id="Pendulum" style={{transformOrigin: '185px 221px'}}>
        <rect
          id="stick"
          x={183.442}
          y={80.8449}
          width={3}
          height={142.894}
          fill="#D9D9D9"
        />
        <g id="rectangle">
          <path
            id="Rectangle 2"
            d="M180.442 89.0103H189.442L187.642 101.469H182.242L180.442 89.0103Z"
            fill="#D9D9D9"
          />
          <ellipse
            id="Ellipse 1"
            cx={183.142}
            cy={92.7478}
            rx={0.9}
            ry={1.24585}
            fill="white"
          />
          <ellipse
            id="Ellipse 2"
            cx={186.742}
            cy={92.7478}
            rx={0.9}
            ry={1.24585}
            fill="white"
          />
        </g>
      </g>
      <circle id="screw" cx={185} cy={221} r={4} fill="white" />
      <g id="meter1">
        <path
          id="Meter"
          d="M70 85.9271C143.965 51.0973 226.171 51.619 300 85.9271V97C231.296 62.2747 149.397 60.4837 70 97V85.9271Z"
          fill="#D9D9D9"
        />
        <circle id="Marker" cx={76} cy={89} r={4} fill="white" />
        <circle id="Marker_2" cx={294} cy={89} r={4} fill="white" />
      </g>
    </g>
  </svg>
  );
};

export { SvgComponent as ReactComponent };
