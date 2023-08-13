import React from "react";
import Ball from "./ball";
import { IBallRow } from "@/types/IBallRow";

interface IProps extends Partial<IBallRow> {
  size?: "small" | "medium" | "large" | "xlarge";
}

export default function BallRow({ main, special, size = "medium" }: IProps) {
  const EmptyRow = () => (
    <>
      {Array.from(Array(5).keys()).map((_, index) => (
        <Ball key={index} size={size} />
      ))}
      <Ball state="special" size={size} />
    </>
  );

  const ActiveRow = () => (
    <>
      {main!.map((ball, index) => (
        <Ball key={index} number={ball} size={size} />
      ))}
      <Ball number={special!} state="special" size={size} />
    </>
  );

  return (
    <div className="grid grid-cols-6 gap-2">
      {main && special ? ActiveRow() : EmptyRow()}
    </div>
  );
}
