<template>
  <canvas ref="canvasRef" class="fixed inset-0 z-0"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animationId: number
let particles: Particle[] = []

class Particle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  opacity: number

  constructor(w: number, h: number) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.radius = Math.random() * 2 + 0.5
    this.speedX = (Math.random() - 0.5) * 0.3
    this.speedY = (Math.random() - 0.5) * 0.3
    this.opacity = Math.random() * 0.5 + 0.3
  }

  update(w: number, h: number) {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x < 0 || this.x > w) this.speedX *= -1
    if (this.y < 0 || this.y > h) this.speedY *= -1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(150, 210, 255, ${this.opacity * 0.8})`
    ctx.fill()
  }
}

const initParticles = (w: number, h: number) => {
  particles = []
  const count = Math.floor((w * h) / 10000) // 根据屏幕尺寸控制数量
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(w, h))
  }
}

const animate = () => {
  if (!canvasRef.value || !ctx) return
  const w = canvasRef.value.width = window.innerWidth
  const h = canvasRef.value.height = window.innerHeight
  ctx.clearRect(0, 0, w, h)
  particles.forEach(p => {
    p.update(w, h)
    p.draw(ctx!)
  })
  // 绘制连线（邻近粒子之间）
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100) {
        ctx!.beginPath()
        ctx!.moveTo(particles[i].x, particles[i].y)
        ctx!.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(150, 210, 255, ${0.08 * (1 - dist / 100)})`
        ctx!.stroke()
      }
    }
  }
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    initParticles(window.innerWidth, window.innerHeight)
    animate()
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>