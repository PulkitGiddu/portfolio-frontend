import { useEffect, useRef } from 'react';

type FieldProps = {
    className?: string;
};

/**
 * A slow field of grey threads. The pointer bends the nearest lines,
 * the way a hand disturbs a surface of water.
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
        let running = true;
        let time = 0;

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
        };

        const draw = (still: boolean) => {
            const { width, height } = parent.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const lines = width < 720 ? 6 : 9;
            const segments = width < 720 ? 16 : 28;
            const amp = Math.min(height * 0.045, 52);

            if (!still) {
                mouse.x += (pointer.x - mouse.x) * 0.06;
                mouse.y += (pointer.y - mouse.y) * 0.06;
                time += 0.007;
            }

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

                const breath = still ? 0.5 : Math.sin(i * 0.8 + time) * 0.5 + 0.5;
                const alpha = 0.1 + breath * 0.16;
                const tone = document.documentElement.classList.contains('light') ? '28, 28, 26' : '214, 214, 210';
                ctx.strokeStyle = `rgba(${tone}, ${alpha})`;
                ctx.lineWidth = i % 3 === 0 ? 1.15 : 0.7;
                ctx.stroke();
            }
        };

        const loop = () => {
            if (!running) return;
            draw(false);
            frame = requestAnimationFrame(loop);
        };

        const onMove = (event: PointerEvent) => {
            const rect = parent.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
        };

        const onVisibility = () => {
            if (reduce) return;
            if (document.hidden) {
                running = false;
                cancelAnimationFrame(frame);
            } else if (!running) {
                running = true;
                frame = requestAnimationFrame(loop);
            }
        };

        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(parent);
        parent.addEventListener('pointermove', onMove);
        document.addEventListener('visibilitychange', onVisibility);

        if (reduce) {
            draw(true);
        } else {
            frame = requestAnimationFrame(loop);
        }

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
