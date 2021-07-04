import { useGLTF } from "@react-three/drei"
import React, { Suspense, useRef } from "react"
import { HexColorPicker } from "react-colorful"
import { Canvas } from "react-three-fiber"
import { proxy, useProxy } from "valtio"

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
})

function Shoe() {
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("shoe-draco.glb")
  const group = useRef()
  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group ref={group} dispose={null}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces}   />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh}  />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps}  />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner}   />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole}   />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes}   />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band}  />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch}   />
    </group>
  )
}

function Picker() {
  const snap = useProxy(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 2.75] }}>
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          <Shoe />
        </Suspense>
      </Canvas>
    </>
  )
}
