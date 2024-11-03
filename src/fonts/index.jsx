const fonts = import.meta.glob('./*.ttf', { eager: true });

const fontFaces = Object.keys(fonts).map((path) => {
  const fileName = path.split('/').pop();
  const [fontName, fontWeight] = fileName.replace('.ttf', '').split('-'); // Ex: 'Poppins', 'Black'

  return `
    @font-face {
      font-family: '${fontName}';
      src: url(${fonts[path].default || fonts[path]}) format('truetype');
      font-weight: ${mapFontWeight(fontWeight)};
      font-style: normal;
    }
  `;
}).join('\n');

function mapFontWeight(weight) {
  switch (weight.toLowerCase()) {
    case 'thin': return 100;
    case 'extralight': return 200;
    case 'light': return 300;
    case 'regular': return 400;
    case 'medium': return 500;
    case 'semibold': return 600;
    case 'bold': return 700;
    case 'extrabold': return 800;
    case 'black': return 900;
    default: return 400; 
  }
}

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = fontFaces;
document.head.appendChild(styleSheet);
