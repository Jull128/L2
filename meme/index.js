const ids = [
  "#imageFileInput",
  "#meme",
  "#topTextInput",
  "#bottomTextInput",
  ".button_section",
  "#export",
];
const [
  imageFileInput,
  canvas,
  topTextInput,
  bottomTextInput,
  downloadBtnSection,
  exportButton,
] = ids.map((id) => document.querySelector(id));

let image;

const updateMeme = () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
};

imageFileInput.addEventListener("change", (e) => {
  const imageDataUrl = URL.createObjectURL(e.target.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      downloadBtnSection.style.display = "block";
      updateMeme();
    },
    { once: true }
  );
});

// Use same event listener for both input fields
[topTextInput, bottomTextInput].forEach((input) => {
  input.addEventListener("keyup", updateMeme);
});

exportButton.onclick = () => {
  const img = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "My Meme";
  link.href = img;
  link.click();
};

function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  // Update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  // Add top text
  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  // Add bottom text
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
}
