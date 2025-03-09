import { thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export function generateAvatar(name: string) {
  return createAvatar(thumbs, {
    scale: 80,
    seed: name,
    shapeColor: ["FE7740"],
    backgroundRotation: [25],
    backgroundType: ["gradientLinear"],
    backgroundColor: ["7740FE", "2CDC5F"],
  }).toString();
}
