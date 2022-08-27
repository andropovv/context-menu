export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.autoplay = true;
}

export function svgImage(src, name, imgClass = '') {
  return `
    <svg class="${imgClass}">
      <use xlink:href="${src}#${name}"></use>
    </svg>
    `;
}