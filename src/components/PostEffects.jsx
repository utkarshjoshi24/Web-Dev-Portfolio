import { useThree } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

export default function PostEffects() {
  const { gl } = useThree();
  if (
    !gl ||
    typeof gl.getContext !== 'function' ||
    !gl.getContext() ||
    typeof gl.getContext().getContextAttributes !== 'function' ||
    !gl.getContext().getContextAttributes()
  ) {
    return null;
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    // Minimal post-processing on mobile
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette
          offset={0.3}
          darkness={0.7}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.8}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0004, 0.0004)}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Vignette
        offset={0.25}
        darkness={0.75}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
