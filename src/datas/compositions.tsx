import { IComposition } from "@/types/types";

const compositions: IComposition<any>[] = [
  {
    name: "Diamond",
    type: "4-4-2",
    lines: [
      [
        {
          position: "base",
          type: "goalkeeper",
        },
      ],
      [
        {
          position: "forward",
          positionMultiplier: 2,
          type: "defender",
        },
        {
          position: "backward",
          type: "defender",
        },
        {
          position: "backward",
          type: "defender",
        },
        {
          position: "forward",
          positionMultiplier: 2,
          type: "defender",
        },
      ],
      [
        {
          position: "forward",
          type: "midfielder",
        },
      ],
      [
        {
          position: "base",
          type: "midfielder",
        },
        {
          position: "base",
          type: "midfielder",
        },
      ],
      [
        {
          position: "base",
          type: "forward",
        },
        {
          position: "backward",
          type: "midfielder",
        },
        {
          position: "base",
          type: "forward",
        },
      ],
    ],
  },
  {
    name: "Freedom",
    type: "3-5-2",
    lines: [
      [
        {
          position: "base",
          type: "goalkeeper",
        },
      ],
      [
        {
          position: "backward",
          type: "defender",
        },
        {
          position: "forward",
          type: "defender",
        },
        {
          position: "backward",
          type: "defender",
        },
      ],
      [
        {
          position: "base",
          type: "midfielder",
        },
        {
          position: "forward",
          type: "midfielder",
        },
        {
          position: "base",
          type: "midfielder",
        },
      ],
      [
        {
          position: "base",
          type: "midfielder",
        },
        {
          position: "base",
          type: "midfielder",
        },
      ],
      [
        {
          position: "base",
          type: "forward",
        },
        {
          position: "base",
          type: "forward",
        },
      ],
    ],
  },
];

export default compositions;
