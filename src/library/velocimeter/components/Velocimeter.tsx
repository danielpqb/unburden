import { deepMergeObjects } from "@/utils/deepMergeObjects";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

const defaultProps = {
  value: 0,
  maxValue: 100,
  goal: 0,
  dividers: { count: 10 },
  bar: { perimeterPercentage: 0.9, thickness: 25 },
  centerCircle: { thickness: 10, radius: 180 },
  needle: { lengthPercentage: 0.4, widthPercentage: 1 },
  numbers: { offsetRatio: { goal: 1, dividers: 0.95 } },
};

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
  styles?: {
    color?: {
      primary?: string;
      backgroundBar?: string;
      dividers?: string;
      needle?: string;
    };
  };
  value: number;
  maxValue?: number;
  goal?: number;
  bar?: {
    perimeterPercentage?: number;
    thickness?: number;
  };
  centerCircle?: {
    thickness?: number;
    radius?: number;
  };
  needle?: {
    lengthPercentage?: number;
    widthPercentage?: number;
  };
  dividers?: {
    count?: number;
  };
  numbers?: {
    offsetRatio?: number;
  };
};

export function Velocimeter({ className, styles, ...others }: TProps) {
  // Merge default and received props
  const mergedProps = deepMergeObjects(defaultProps, others);

  // Properties Params
  const {
    value,
    maxValue,
    goal,
    bar,
    centerCircle,
    dividers,
    needle,
    numbers,
  } = mergedProps;
  const barPerimeterPercentage = bar.perimeterPercentage;
  const barThickness = bar.thickness;
  const centerCircleThickness = centerCircle.thickness;
  const centerCircleRadius = centerCircle.radius;
  const needleLengthPercentage = needle.lengthPercentage;
  const needleWidthPercentage = needle.widthPercentage;
  const numbersDistanceRatio = numbers.offsetRatio;
  const dividersCount = dividers.count;

  // Bar
  const barRadius = 500 - barThickness / 2;
  const barTotalPerimeter = 2 * Math.PI * barRadius;
  const barPerimeter = barPerimeterPercentage * barTotalPerimeter;
  const barFilledPercentage = value / maxValue;
  const barFilledPerimeter = barFilledPercentage * barPerimeterPercentage;

  // Center Circle
  const centerCircleTotalPerimeter = 2 * Math.PI * centerCircleRadius;
  const centerCirclePerimeter =
    barPerimeterPercentage * centerCircleTotalPerimeter;

  //Goal
  const goalFilledPercentage = goal / maxValue;
  const goalFilledPerimeter = goalFilledPercentage * barPerimeterPercentage;

  // Needle
  const needleLength = 350 * needleLengthPercentage;
  const needleWidth = 30 * needleWidthPercentage;

  // Dividers
  const dividerLength = barPerimeter / dividersCount / 10;

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
              strokeWidth={barThickness}
              strokeDasharray={`${barPerimeter} ${
                barTotalPerimeter - barPerimeter
              }`}
              strokeDashoffset={
                barPerimeter +
                (0.5 - barPerimeterPercentage) * (barTotalPerimeter / 2)
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
              strokeWidth={barThickness}
              strokeDasharray={`${barFilledPerimeter * barTotalPerimeter} ${
                (1 - barFilledPerimeter) * barTotalPerimeter
              }`}
              strokeDashoffset={
                barPerimeter +
                (0.5 - barPerimeterPercentage) * (barTotalPerimeter / 2)
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
              strokeWidth={centerCircleThickness}
              strokeDasharray={`${centerCirclePerimeter} ${
                centerCircleTotalPerimeter - centerCirclePerimeter
              }`}
              strokeDashoffset={
                centerCirclePerimeter +
                (0.5 - barPerimeterPercentage) *
                  (centerCircleTotalPerimeter / 2)
              }
            />
          </g>

          <g
            id="Dividers"
            className={twMerge("stroke-white/80 relative", className?.dividers)}
            style={{ stroke: styles?.color?.dividers }}
          >
            {Array.from({ length: dividersCount + 1 }).map((_, idx) => (
              <circle
                key={idx}
                r={barRadius}
                cx={"50%"}
                cy={"50%"}
                fill="none"
                strokeWidth={barThickness}
                strokeDasharray={`${dividerLength} ${
                  barTotalPerimeter - dividerLength
                }`}
                strokeDashoffset={
                  barPerimeter +
                  dividerLength / 2 -
                  (idx * barPerimeter) / dividersCount +
                  (0.5 - barPerimeterPercentage) * (barTotalPerimeter / 2)
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
            {Array.from({ length: dividersCount + 1 }).map((_, idx) => {
              const indexAngle =
                (((0.5 - (1 - barPerimeterPercentage)) * 180 -
                  idx * ((barPerimeterPercentage * 360) / dividersCount)) *
                  Math.PI) /
                180;
              const translateX =
                (barRadius - barThickness / 2) *
                0.9 *
                numbersDistanceRatio *
                Math.cos(indexAngle);
              const translateY =
                (barRadius - barThickness / 2) *
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
                  {((maxValue * idx) / dividersCount).toFixed(0)}
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
                ${500 - centerCircleRadius + centerCircleThickness / 2}
                ${500 - needleWidth / 2}
                l -${needleLength} ${needleWidth / 3}
                a 1 1 0 0 0 0 ${needleWidth / 3}
                l ${needleLength} ${needleWidth / 3}
                a 1 1 0 0 0 0 -${needleWidth}
                `}
              transform={`rotate(${
                (0.5 - barPerimeterPercentage) * 180 + barFilledPerimeter * 360
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
                  (((0.5 - (1 - barPerimeterPercentage)) * 180 -
                    (barPerimeterPercentage * 360 * goal) / maxValue) *
                    Math.PI) /
                  180;
                const translateX =
                  (barRadius - barThickness / 2) *
                  0.9 *
                  numbersDistanceRatio *
                  Math.cos(indexAngle);
                const translateY =
                  (barRadius - barThickness / 2) *
                  0.9 *
                  numbersDistanceRatio *
                  Math.sin(indexAngle);

                return (
                  <Fragment key={idx}>
                    <path
                      className={twMerge(
                        "fill-amber-500/90",
                        className?.goal?.needle
                      )}
                      d={`M
                        ${500 - barRadius - barThickness / 2}
                        ${500 - needleWidth / 2}
                        l ${barThickness} 0
                        a ${barRadius} ${barRadius} 0 0 1 0 ${needleWidth}
                        l -${barThickness} 0
                        a
                        ${barRadius}
                        ${barRadius}
                        0 0 1 0
                        -${needleWidth}
                        `}
                      transform={`rotate(${
                        (0.5 - barPerimeterPercentage) * 180 +
                        goalFilledPerimeter * 360
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
