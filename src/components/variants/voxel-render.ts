import { PALETTE } from '@/generated/brand-art'
import type { PixelGrid, Vec3, VoxelFace, VoxelPose } from '@/types'

const DEPTH = 2
const LIGHT: Vec3 = normalize({ x: 0.45, y: 0.7, z: 0.55 })

const DIRECTIONS: Vec3[] = [
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
]

function normalize(v: Vec3): Vec3 {
  const length = Math.hypot(v.x, v.y, v.z)
  return { x: v.x / length, y: v.y / length, z: v.z / length }
}

function faceCorners(center: Vec3, n: Vec3): Vec3[] {
  const [u, v] =
    n.x !== 0
      ? [
          { x: 0, y: 1, z: 0 },
          { x: 0, y: 0, z: 1 },
        ]
      : n.y !== 0
        ? [
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 0, z: 1 },
          ]
        : [
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 },
          ]
  const c = { x: center.x + n.x / 2, y: center.y + n.y / 2, z: center.z + n.z / 2 }
  return [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].map(([a, b]) => ({
    x: c.x + (u.x * a + v.x * b) / 2,
    y: c.y + (u.y * a + v.y * b) / 2,
    z: c.z + (u.z * a + v.z * b) / 2,
  }))
}

export function buildFaces(grid: PixelGrid): VoxelFace[] {
  const filled = new Map(grid.cells.map((cell) => [`${cell.x},${cell.y}`, cell.isAccent]))
  const isSolid = (x: number, y: number, z: number) =>
    z >= 0 && z < DEPTH && filled.has(`${x},${y}`)
  const half = grid.size / 2
  const faces: VoxelFace[] = []
  for (const cell of grid.cells) {
    for (let z = 0; z < DEPTH; z++) {
      for (const n of DIRECTIONS) {
        if (isSolid(cell.x + n.x, cell.y + n.y, z + n.z)) continue
        const center = { x: cell.x - half + 0.5, y: cell.y - half + 0.5, z: z - DEPTH / 2 + 0.5 }
        faces.push({ corners: faceCorners(center, n), normal: n, isAccent: cell.isAccent })
      }
    }
  }
  return faces
}

function rotate(v: Vec3, { yaw, pitch }: VoxelPose): Vec3 {
  const x1 = v.x * Math.cos(yaw) + v.z * Math.sin(yaw)
  const z1 = -v.x * Math.sin(yaw) + v.z * Math.cos(yaw)
  return {
    x: x1,
    y: v.y * Math.cos(pitch) - z1 * Math.sin(pitch),
    z: v.y * Math.sin(pitch) + z1 * Math.cos(pitch),
  }
}

const rgb = (hex: string) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16))

const shade = (hex: string, light: number) => {
  const [r, g, b] = rgb(hex)
  const lift = (channel: number) => Math.round(channel * (0.55 + 0.45 * light) + 70 * light * 0.35)
  return `rgb(${lift(r)}, ${lift(g)}, ${lift(b)})`
}

export function drawVoxels(
  ctx: CanvasRenderingContext2D,
  faces: VoxelFace[],
  pose: VoxelPose,
  size: number,
  body: string,
) {
  const unit = size / 24
  const center = size / 2
  const visible = faces
    .map((face) => ({
      face,
      normal: rotate(face.normal, pose),
      corners: face.corners.map((c) => rotate(c, pose)),
    }))
    .filter(({ normal }) => normal.z < 0)
    .map((entry) => ({ ...entry, depth: entry.corners.reduce((sum, c) => sum + c.z, 0) }))
    .sort((a, b) => b.depth - a.depth)

  ctx.clearRect(0, 0, size, size)
  for (const { face, normal, corners } of visible) {
    const light = Math.max(0, -(normal.x * LIGHT.x + normal.y * LIGHT.y + normal.z * LIGHT.z))
    ctx.fillStyle = shade(face.isAccent ? PALETTE.sakura : body, light)
    ctx.beginPath()
    corners.forEach((corner, index) => {
      const x = center + corner.x * unit
      const y = center + corner.y * unit
      if (index === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = ctx.fillStyle
    ctx.lineWidth = 0.75
    ctx.stroke()
  }
}
