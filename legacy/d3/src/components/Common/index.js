export const hexToRgba = function (hx, opacity = 100) {
  const hex = hx.replace('#', '');
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  } else {
    const rd = hex.substring(0, 1) + hex.substring(0, 1);
    const gd = hex.substring(1, 2) + hex.substring(1, 2);
    const bd = hex.substring(2, 3) + hex.substring(2, 3);
    const r = parseInt(rd, 16);
    const g = parseInt(gd, 16);
    const b = parseInt(bd, 16);
  }

  return `rgba(${r},${g},${b},${opacity / 100})`
};