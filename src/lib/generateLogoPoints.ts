export async function generateLogoPoints(
  imageUrl: string,
  particleCount: number = 4000
): Promise<Float32Array> {
  const img = new Image();
  img.crossOrigin = "anonymous";

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = imageUrl;
  });

  const canvas = document.createElement("canvas");
  const size = 200; // sample resolution — enough detail, keeps it fast
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, size, size);

  const imageData = ctx.getImageData(0, 0, size, size).data;

  // Collect every pixel coordinate where alpha > threshold (i.e. part of the logo)
  const candidates: { x: number; y: number }[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const alpha = imageData[i + 3];
      if (alpha > 80) {
        candidates.push({ x, y });
      }
    }
  }

  // Randomly sample down to particleCount points
  const points = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const p = candidates[Math.floor(Math.random() * candidates.length)];
    // Normalize to -1.5..1.5 range, centered, flip Y (image Y is inverted vs 3D Y)
    const nx = (p.x / size - 0.5) * 3;
    const ny = -(p.y / size - 0.5) * 3;
    const nz = (Math.random() - 0.5) * 0.12; // reduced depth variance — flatter, sharper shape

    points[i * 3] = nx;
    points[i * 3 + 1] = ny;
    points[i * 3 + 2] = nz;
  }

  return points;
}