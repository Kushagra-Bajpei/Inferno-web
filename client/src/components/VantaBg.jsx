import { useEffect, useRef } from 'react';

const VantaBg = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;
    if (window.VANTA) {
      vantaEffect = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xff4d00,
        backgroundColor: 0x1a1a1a,
        points: 12.00,
        maxDistance: 22.00,
        spacing: 17.00
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div id="vanta-bg" ref={vantaRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}></div>;
};

export default VantaBg;
