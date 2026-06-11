import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Vehicle } from '@/entities/Vehicle'
import { Terrain } from '@/components/Terrain'
import { Trees } from '@/components/Trees'
import { Buildings } from '@/components/Buildings'
import { Decorations } from '@/components/Decorations'
import { ExplorationPoints } from '@/components/ExplorationPoints'
import { TrafficSystem } from '@/components/TrafficSystem'
import { Roads } from '@/components/Roads'
import { TrafficLights } from '@/components/TrafficLights'
import { FollowCamera } from '@/systems/FollowCamera'
import { DayNightCycle } from '@/systems/DayNightCycle'
import { HUD } from '@/components/HUD'
import { Minimap } from '@/components/Minimap'

export function GameScene() {
  return (
    <>
      <Canvas shadows={false} camera={{ position: [0, 10, 20], fov: 75 }} dpr={1}>
        <color attach="background" args={['#87ceeb']} />

        <ambientLight intensity={0.8} />
        <directionalLight position={[100, 100, 50]} intensity={1.2} />

        <fog attach="fog" args={['#87ceeb', 100, 600]} />

        <Terrain />
        <Roads />
        <Buildings />
        <Trees />
        <Decorations />
        <TrafficLights />
        <ExplorationPoints />
        <TrafficSystem />
        <Vehicle />

        <FollowCamera />
        <DayNightCycle />
      </Canvas>

      <HUD />
      <Minimap />

      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: 14,
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        userSelect: 'none',
        opacity: 0.8
      }}>
        <div>WASD - 驾驶 | 空格 - 漂移 | Shift - 氮气加速</div>
      </div>
    </>
  )
}
