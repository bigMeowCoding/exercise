export function momentum(
  current: number,
  start: number,
  time: number,
  lowerMargin: number,
  wrapperSize: number
) {
  var distance = current - start;
  var speed = Math.abs(distance) / time;

  var deceleration = 0.001;
  var duration = 2500;

  var destination = current + (speed / deceleration) * (distance < 0 ? -1 : 1);

  if (destination < lowerMargin) {
    destination = wrapperSize
      ? lowerMargin - (wrapperSize / 2.5) * (speed / 8)
      : lowerMargin;
    duration = 1000 - 400;
    //distance = Math.abs(destination - current);
  } else if (destination > 0) {
    destination = wrapperSize ? (wrapperSize / 2.5) * (speed / 8) : 0;
    duration = 1000 - 400;
    //distance = Math.abs(current) + destination;
  }
  return {
    destination: Math.round(destination),
    duration: duration,
  };
}
