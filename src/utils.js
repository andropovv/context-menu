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

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

export async function getPhoto(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    throw new Error(e);
  }
}

export function createHTMLTag(tag) {
  const HTML = document.createElement(tag);
  return HTML;
}

export function newLoader() {
  const loader = document.createElement("span");
  loader.innerText = "Loading...";
  loader.id = "loader";
  return loader;
}



