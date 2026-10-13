import { useEffect, useRef } from 'react'
import { PALETTE } from '@/generated/brand-art'
import { PIXEL_CAT } from '@/lib/pixel-grid'
import type { VoxelCatProps, VoxelPose } from '@/types'
import { buildFaces, drawVoxels } from './voxel-render'

const FACES = buildFaces(PIXEL_CAT)
const EASE = 0.08

export function VoxelCat({ className }: VoxelCatProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pose: VoxelPose = { yaw: -0.5, pitch: 0.3 }
    const target: VoxelPose = { yaw: -0.5, pitch: 0.3 }
    let isPointing = false
    let frame = 0

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      isPointing = true
      target.yaw = ((event.clientX - rect.left) / rect.width - 0.5) * 2.2
      target.pitch = ((event.clientY - rect.top) / rect.height - 0.5) * 1.2
    }
    const onLeave = () => {
      isPointing = false
    }

    const render = (time: number) => {
      const size = canvas.clientWidth
      const dpr = window.devicePixelRatio || 1
      if (canvas.width !== Math.round(size * dpr)) {
        canvas.width = Math.round(size * dpr)
        canvas.height = Math.round(size * dpr)
      }
      if (!isPointing && !isReduced) {
        target.yaw = Math.sin(time / 2400) * 0.75
        target.pitch = 0.28 + Math.sin(time / 3100) * 0.12
      }
      pose.yaw += (target.yaw - pose.yaw) * EASE
      pose.pitch += (target.pitch - pose.pitch) * EASE
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawVoxels(ctx, FACES, pose, size, PALETTE.sumi)
      frame = requestAnimationFrame(render)
    }

    canvas.addEventListener('pointermove', onPointer)
    canvas.addEventListener('pointerleave', onLeave)
    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      canvas.removeEventListener('pointermove', onPointer)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      aria-label="Term, the Netko cat, as a rotating 3D voxel model"
      className={`aspect-square w-full touch-none ${className ?? ''}`}
      ref={canvasRef}
      role="img"
    />
  )
}
