import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type TProps = {
  className?: {
    svg?: string;
    bar?: string;
    barBackground?: string;
    centerCircle?: string;
    centerCircleText?: string;
    needle?: string;
    dividers?: string;
    numbers?: string;
    goal?: { number?: string; needle?: string };
  };
  value: number;
  maxValue?: number;
  goal?: number;
  barLengthPercentage?: number;
  barStrokeWidth?: number;
  centerCircleStrokeWidth?: number;
  centerCircleRadius?: number;
  needleLengthPercentage?: number;
  needleWidthPercentage?: number;
  dividers?: number;
  numbersDistanceRatio?: number;
  goalNumberDistanceRatio?: number;
  styles?: {
    color?: {
      primary?: string;
      backgroundBar?: string;
      dividers?: string;
      needle?: string;
    };
  };
};
export function Velocimeter({
  className,
  value,
  maxValue = 100,
  goal = 0,
  styles,
  barLengthPercentage = 0.9,
  barStrokeWidth = 25,
  centerCircleStrokeWidth = 10,
  centerCircleRadius = 180,
  needleLengthPercentage = 0.4,
  needleWidthPercentage = 1,
  dividers = 10,
  numbersDistanceRatio = 0.95,
  goalNumberDistanceRatio = 1,
}: TProps) {
  // Bar
  const barRadius = 500 - barStrokeWidth / 2;
  const fullCircleBarPerimeter = 2 * Math.PI * barRadius;
  const barPerimeter = barLengthPercentage * fullCircleBarPerimeter;
  const barValuePercentage = value / maxValue;
  const barValuePercentagePerimeter = barValuePercentage * barLengthPercentage;

  // Center Circle
  const fullCircleCenterCirclePerimeter = 2 * Math.PI * centerCircleRadius;
  const centerCirclePerimeter =
    barLengthPercentage * fullCircleCenterCirclePerimeter;

  //Goal
  const goalValuePercentage = goal / maxValue;
  const goalPercentagePerimeter = goalValuePercentage * barLengthPercentage;

  // Needle
  const needleLength = 350 * needleLengthPercentage;
  const needleWidth = 30 * needleWidthPercentage;

  // Dividers
  const dividerLength = barPerimeter / dividers / 10;

  return (
    <svg
      className={twMerge("size-96 fill-transparent", className?.svg)}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Velocimeter">
        <g id="Components">
          <g
            id="BarBackground"
            className={twMerge("stroke-white/10", className?.barBackground)}
            style={{ stroke: styles?.color?.backgroundBar }}
          >
            <circle
              r={barRadius}
              cx={"50%"}
              cy={"50%"}
              fill="none"
              strokeWidth={barStrokeWidth}
              strokeDasharray={`${barPerimeter} ${
                fullCircleBarPerimeter - barPerimeter
              }`}
              strokeDashoffset={
                barPerimeter +
                (0.5 - barLengthPercentage) * (fullCircleBarPerimeter / 2)
              }
            />
          </g>

          <g
            id="Bar"
            className={twMerge("stroke-emerald-500", className?.bar)}
            style={{ stroke: styles?.color?.primary }}
          >
            <circle
              r={barRadius}
              cx={"50%"}
              cy={"50%"}
              fill="none"
              strokeWidth={barStrokeWidth}
              strokeDasharray={`${
                barValuePercentagePerimeter * fullCircleBarPerimeter
              } ${(1 - barValuePercentagePerimeter) * fullCircleBarPerimeter}`}
              strokeDashoffset={
                barPerimeter +
                (0.5 - barLengthPercentage) * (fullCircleBarPerimeter / 2)
              }
            />
          </g>

          <g
            id="CenterText"
            style={{ fill: styles?.color?.primary }}
          >
            <text
              id="Value"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className={twMerge(
                "fill-emerald-500 text-[10rem]",
                className?.centerCircleText
              )}
              style={{ fill: styles?.color?.primary }}
            >
              {value}
            </text>
          </g>

          <g
            id="CenterCircle"
            style={{ fill: styles?.color?.primary }}
          >
            <circle
              className={twMerge("stroke-white/10", className?.centerCircle)}
              r={centerCircleRadius}
              cx={"50%"}
              cy={"50%"}
              fill="none"
              strokeWidth={centerCircleStrokeWidth}
              strokeDasharray={`${centerCirclePerimeter} ${
                fullCircleCenterCirclePerimeter - centerCirclePerimeter
              }`}
              strokeDashoffset={
                centerCirclePerimeter +
                (0.5 - barLengthPercentage) *
                  (fullCircleCenterCirclePerimeter / 2)
              }
            />
          </g>

          <g
            id="Dividers"
            className={twMerge("stroke-white/80 relative", className?.dividers)}
            style={{ stroke: styles?.color?.dividers }}
          >
            {Array.from({ length: dividers + 1 }).map((_, idx) => (
              <circle
                key={idx}
                r={barRadius}
                cx={"50%"}
                cy={"50%"}
                fill="none"
                strokeWidth={barStrokeWidth}
                strokeDasharray={`${dividerLength} ${
                  fullCircleBarPerimeter - dividerLength
                }`}
                strokeDashoffset={
                  barPerimeter +
                  dividerLength / 2 -
                  (idx * barPerimeter) / dividers +
                  (0.5 - barLengthPercentage) * (fullCircleBarPerimeter / 2)
                }
              />
            ))}
          </g>

          <g
            id="Numbers"
            className={twMerge(
              "fill-white/50 text-[4.5rem]",
              className?.numbers
            )}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {Array.from({ length: dividers + 1 }).map((_, idx) => {
              const indexAngle =
                (((0.5 - (1 - barLengthPercentage)) * 180 -
                  idx * ((barLengthPercentage * 360) / dividers)) *
                  Math.PI) /
                180;
              const translateX =
                (barRadius - barStrokeWidth / 2) *
                0.9 *
                numbersDistanceRatio *
                Math.cos(indexAngle);
              const translateY =
                (barRadius - barStrokeWidth / 2) *
                0.9 *
                numbersDistanceRatio *
                Math.sin(indexAngle);

              return (
                <text
                  key={idx}
                  x="50%"
                  y="50%"
                  transform={`translate(${-translateX}, ${translateY})`}
                >
                  {((maxValue * idx) / dividers).toFixed(0)}
                </text>
              );
            })}
          </g>

          <g
            id="Needle"
            className={twMerge("fill-rose-500/90", className?.needle)}
            style={{ fill: styles?.color?.needle }}
          >
            <path
              d={`M
                ${500 - centerCircleRadius + centerCircleStrokeWidth / 2}
                ${500 - needleWidth / 2}
                l -${needleLength} ${needleWidth / 3}
                a 1 1 0 0 0 0 ${needleWidth / 3}
                l ${needleLength} ${needleWidth / 3}
                a 1 1 0 0 0 0 -${needleWidth}
                `}
              transform={`rotate(${
                (0.5 - barLengthPercentage) * 180 +
                barValuePercentagePerimeter * 360
              } 500 500)`}
            />
          </g>

          {goal && (
            <g
              id="Goal"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {Array.from({ length: 1 }).map((_, idx) => {
                const indexAngle =
                  (((0.5 - (1 - barLengthPercentage)) * 180 -
                    (barLengthPercentage * 360 * goal) / maxValue) *
                    Math.PI) /
                  180;
                const translateX =
                  (barRadius - barStrokeWidth / 2) *
                  0.9 *
                  numbersDistanceRatio *
                  goalNumberDistanceRatio *
                  Math.cos(indexAngle);
                const translateY =
                  (barRadius - barStrokeWidth / 2) *
                  0.9 *
                  numbersDistanceRatio *
                  goalNumberDistanceRatio *
                  Math.sin(indexAngle);

                return (
                  <Fragment key={idx}>
                    <path
                      className={twMerge(
                        "fill-amber-500/90",
                        className?.goal?.needle
                      )}
                      d={`M
                        ${500 - barRadius - barStrokeWidth / 2}
                        ${500 - needleWidth / 2}
                        l ${barStrokeWidth} 0
                        a ${barRadius} ${barRadius} 0 0 1 0 ${needleWidth}
                        l -${barStrokeWidth} 0
                        a
                        ${barRadius}
                        ${barRadius}
                        0 0 1 0
                        -${needleWidth}
                        `}
                      transform={`rotate(${
                        (0.5 - barLengthPercentage) * 180 +
                        goalPercentagePerimeter * 360
                      } 500 500)`}
                    />
                    <text
                      className={twMerge(
                        "fill-amber-500 text-[4.5rem]",
                        className?.goal?.number
                      )}
                      x="50%"
                      y="50%"
                      transform={`translate(${-translateX}, ${translateY})`}
                    >
                      {goal.toFixed(0)}
                    </text>
                  </Fragment>
                );
              })}
            </g>
          )}
        </g>
      </g>
    </svg>
  );
}
