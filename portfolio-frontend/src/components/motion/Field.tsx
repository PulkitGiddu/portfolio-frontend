import { useEffect, useRef } from 'react';

type FieldProps = {
    className?: string;
};

/**
 * Grey threads that stay still until the pointer moves, then bend with it
 * and settle back. Motion is a response, not a loop.
 */
const Field = ({ className = '' }: FieldProps) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const parent = canvas?.parentElement;
        if (!canvas || !parent) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const pointer = { x: 0, y: 0 };
        const mouse = { x: 0, y: 0 };
        let frame = 0;
        let running = false;
        let time = 0;
        let energy = 0;
        let lastMove = 0;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const { width, height } = parent.getBoundingClientRect();
            canvas.width = Math.max(1, width * dpr);
            canvas.height = Math.max(1, height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (pointer.x === 0 && pointer.y === 0) {
                pointer.x = width * 0.62;
                pointer.y = height * 0.38;
                mouse.x = pointer.x;
                mouse.y = pointer.y;
            }
            draw();
        };

        const draw = () => {
            const { width, height } = parent.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const lines = width < 720 ? 6 : 9;
            const segments = width < 720 ? 16 : 28;
            const amp = Math.min(height * 0.045, 52) * (0.28 + energy * 0.72);

            mouse.x += (pointer.x - mouse.x) * 0.5;
            mouse.y += (pointer.y - mouse.y) * 0.5;
            if (energy > 0.002) time += 0.012 * energy;

            for (let i = 0; i < lines; i++) {
                const baseY = (height / (lines + 1)) * (i + 1);
                ctx.beginPath();

                for (let j = 0; j <= segments; j++) {
                    const x = (width / segments) * j;
                    const wave =
                        Math.sin(j * 0.42 + time * 0.9 + i * 0.7) * amp +
                        Math.sin(j * 0.15 - time * 0.42 + i * 1.35) * amp * 1.35 +
                        Math.cos(j * 0.08 + time * 0.22 + i) * amp * 0.35;

                    let y = baseY + wave;
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    const reach = Math.min(320, width * 0.28);

                    if (dist < reach) {
                        const influence = (1 - dist / reach) ** 2;
                        y += (mouse.y - y) * influence * 0.42;
                    }

                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                const breath = 0.55 + Math.sin(i * 0.8) * 0.12 * (0.4 + energy);
                const alpha = 0.12 + breath * 0.14;
                const tone = document.documentElement.classList.contains('light') ? '28, 28, 26' : '214, 214, 210';
                ctx.strokeStyle = `rgba(${tone}, ${alpha})`;
                ctx.lineWidth = i % 3 === 0 ? 1.15 : 0.7;
                ctx.stroke();
            }
        };

        const settled = () =>
            energy < 0.02 &&
            performance.now() - lastMove > 220 &&
            Math.hypot(pointer.x - mouse.x, pointer.y - mouse.y) < 0.5;

        const loop = () => {
            if (!running) return;
            const interacting = performance.now() - lastMove < 140;
            energy += ((interacting ? 1 : 0) - energy) * 0.14;
            draw();
            if (settled()) {
                running = false;
                draw();
                return;
            }
            frame = requestAnimationFrame(loop);
        };

        const wake = () => {
            if (reduce || running) return;
            running = true;
            frame = requestAnimationFrame(loop);
        };

        const onMove = (event: PointerEvent) => {
            const rect = parent.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
            lastMove = performance.now();
            wake();
        };

        const onVisibility = () => {
            if (reduce || document.hidden) {
                running = false;
                cancelAnimationFrame(frame);
            }
        };

        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(parent);
        parent.addEventListener('pointermove', onMove);
        document.addEventListener('visibilitychange', onVisibility);

        draw();

        return () => {
            running = false;
            cancelAnimationFrame(frame);
            observer.disconnect();
            parent.removeEventListener('pointermove', onMove);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            className={`pointer-events-none ${className}`}
            aria-hidden="true"
        />
    );
};

export default Field;
