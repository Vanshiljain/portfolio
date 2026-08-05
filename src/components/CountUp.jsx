import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export default function CountUp({ value, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const match = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  const prefix = match ? match[1] : "";
  const number = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : "";
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (inView) motionValue.set(number);
  }, [inView, number, motionValue]);

  const displayRef = useRef(null);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix, decimals]);

  return (
    <motion.span ref={ref} className={className}>
      <span ref={displayRef}>{prefix}0{suffix}</span>
    </motion.span>
  );
}
