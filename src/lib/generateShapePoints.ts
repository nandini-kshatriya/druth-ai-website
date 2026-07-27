//export type IconShape = "brain" | "layers" | "network" | "stack";
export type IconShape = "cube" | "brain" | "layers" | "network" | "stack";

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// Wireframe cube outline — points sampled along the 12 edges
function generateCubePoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const s = 0.75;
  const edges: [number[], number[]][] = [
    [[-s,-s,-s],[s,-s,-s]], [[s,-s,-s],[s,s,-s]], [[s,s,-s],[-s,s,-s]], [[-s,s,-s],[-s,-s,-s]],
    [[-s,-s,s],[s,-s,s]], [[s,-s,s],[s,s,s]], [[s,s,s],[-s,s,s]], [[-s,s,s],[-s,-s,s]],
    [[-s,-s,-s],[-s,-s,s]], [[s,-s,-s],[s,-s,s]], [[s,s,-s],[s,s,s]], [[-s,s,-s],[-s,s,s]],
  ];
  const perEdge = Math.floor(count / edges.length);
  let idx = 0;
  for (const [a, b] of edges) {
    for (let i = 0; i < perEdge; i++) {
      const t = Math.random();
      positions[idx++] = a[0] + (b[0] - a[0]) * t + rand(-0.015, 0.015);
      positions[idx++] = a[1] + (b[1] - a[1]) * t + rand(-0.015, 0.015);
      positions[idx++] = a[2] + (b[2] - a[2]) * t + rand(-0.015, 0.015);
    }
  }
  while (idx < positions.length) {
    positions[idx] = positions[idx - 3] ?? 0;
    idx++;
  }
  return positions;
}

// Lobed, slightly noisy sphere — reads as a "brain" silhouette
function generateBrainPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = rand(0, Math.PI * 2);
    const phi = Math.acos(2 * Math.random() - 1);

    const wrinkle =
      0.14 * Math.sin(theta * 6) * Math.cos(phi * 8) +
      0.05 * Math.sin(theta * 13 + phi * 5);
    const r = 0.85 + wrinkle + rand(-0.02, 0.02);

    let x = r * Math.sin(phi) * Math.cos(theta) * 1.0;
    const y = r * Math.sin(phi) * Math.sin(theta) * 1.15;
    const z = r * Math.cos(phi) * 0.7;

    // carve a central groove so it reads as two hemispheres
    if (Math.abs(x) < 0.08) x += x >= 0 ? 0.08 : -0.08;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

// Three open, offset diamond planes stacked vertically
function generateLayersPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const layerCount = 3;
  const perLayer = Math.floor(count / layerCount);

  let idx = 0;
  for (let L = 0; L < layerCount; L++) {
    const yOffset = (L - 1) * 0.55;
    const edgeBias = 0.75; // push most points toward the outline

    for (let i = 0; i < perLayer; i++) {
      const t = Math.random();
      let u = rand(-1, 1);
      let v = rand(-1, 1);

      if (Math.random() < edgeBias) {
        // snap near the perimeter of the diamond for a wireframe look
        if (Math.random() < 0.5) u = Math.sign(u || 1) * rand(0.75, 1);
        else v = Math.sign(v || 1) * rand(0.75, 1);
      }

      positions[idx++] = u * 0.95;
      positions[idx++] = yOffset + rand(-0.02, 0.02);
      positions[idx++] = v * 0.95;
    }
  }
  // fill any leftover slots (rounding) with a duplicate of the last point
  while (idx < positions.length) {
    positions[idx] = positions[idx - 3] ?? 0;
    idx++;
  }
  return positions;
}

// Central node + ring of satellite nodes + connecting "wires"
function generateNetworkPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const satellites = 5;
  const nodePortion = 0.55;
  const nodePoints = Math.floor(count * nodePortion);
  const linePoints = count - nodePoints;

  const nodeCenters: [number, number, number][] = [[0, 0, 0]];
  for (let s = 0; s < satellites; s++) {
    const angle = (s / satellites) * Math.PI * 2;
    nodeCenters.push([Math.cos(angle) * 0.95, Math.sin(angle) * 0.95, rand(-0.15, 0.15)]);
  }

  let idx = 0;
  const perNode = Math.floor(nodePoints / nodeCenters.length);
  for (const [cx, cy, cz] of nodeCenters) {
    for (let i = 0; i < perNode && idx < nodePoints * 3; i++) {
      const theta = rand(0, Math.PI * 2);
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.13;
      positions[idx++] = cx + r * Math.sin(phi) * Math.cos(theta);
      positions[idx++] = cy + r * Math.sin(phi) * Math.sin(theta);
      positions[idx++] = cz + r * Math.cos(phi);
    }
  }

  const perLine = Math.floor(linePoints / satellites);
  for (let s = 1; s < nodeCenters.length; s++) {
    const [x1, y1, z1] = nodeCenters[0];
    const [x2, y2, z2] = nodeCenters[s];
    for (let i = 0; i < perLine && idx < positions.length; i++) {
      const t = Math.random();
      positions[idx++] = x1 + (x2 - x1) * t + rand(-0.015, 0.015);
      positions[idx++] = y1 + (y2 - y1) * t + rand(-0.015, 0.015);
      positions[idx++] = z1 + (z2 - z1) * t + rand(-0.015, 0.015);
    }
  }

  while (idx < positions.length) {
    positions[idx] = positions[idx - 3] ?? 0;
    idx++;
  }
  return positions;
}

// Dense stacked rectangular slabs — reads as a server / infra tower
function generateStackPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const slabCount = 6;
  const perSlab = Math.floor(count / slabCount);
  const totalHeight = 1.5;
  const slabHeight = totalHeight / slabCount;

  let idx = 0;
  for (let s = 0; s < slabCount; s++) {
    const yOffset = -totalHeight / 2 + slabHeight * s + slabHeight / 2;
    for (let i = 0; i < perSlab; i++) {
      const u = rand(-1, 1);
      const v = rand(-1, 1);
      const edge = Math.random() < 0.6;
      const x = edge ? Math.sign(u || 1) * rand(0.85, 1) : u * 0.95;
      const z = edge ? v * 0.95 : Math.sign(v || 1) * rand(0.85, 1);

      positions[idx++] = x * 0.85;
      positions[idx++] = yOffset + rand(-slabHeight * 0.15, slabHeight * 0.15);
      positions[idx++] = z * 0.85;
    }
  }
  while (idx < positions.length) {
    positions[idx] = positions[idx - 3] ?? 0;
    idx++;
  }
  return positions;
}

/*export function generateShapePoints(shape: IconShape, count: number): Float32Array {
  switch (shape) {
    case "brain":
      return generateBrainPoints(count);
    case "layers":
      return generateLayersPoints(count);
    case "network":
      return generateNetworkPoints(count);
    case "stack":
      return generateStackPoints(count);
  }
}*/
export function generateShapePoints(shape: IconShape, count: number): Float32Array {
  switch (shape) {
    case "cube":
      return generateCubePoints(count);
    case "brain":
      return generateBrainPoints(count);
    case "layers":
      return generateLayersPoints(count);
    case "network":
      return generateNetworkPoints(count);
    case "stack":
      return generateStackPoints(count);
  }
}