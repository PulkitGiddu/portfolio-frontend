type ToneName = 'tap' | 'hover' | 'open' | 'close' | 'toggle';

type Tone = {
    type: OscillatorType;
    freq: number;
    glide?: number;
    dur: number;
    gain: number;
    attack: number;
};

const TONES: Record<ToneName, Tone> = {
    tap: { type: 'sine', freq: 740, dur: 0.07, gain: 0.045, attack: 0.004 },
    hover: { type: 'sine', freq: 980, dur: 0.05, gain: 0.018, attack: 0.008 },
    open: { type: 'sine', freq: 294, glide: 466, dur: 0.32, gain: 0.05, attack: 0.02 },
    close: { type: 'sine', freq: 392, glide: 220, dur: 0.22, gain: 0.04, attack: 0.012 },
    toggle: { type: 'triangle', freq: 520, dur: 0.09, gain: 0.03, attack: 0.006 },
};

const STORAGE_KEY = 'pg-sound';

let context: AudioContext | null = null;
let master: GainNode | null = null;
const lastPlayed: Partial<Record<ToneName, number>> = {};
let bound = false;

export function soundEnabled() {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return localStorage.getItem(STORAGE_KEY) !== 'off';
}

export function setSoundEnabled(on: boolean) {
    localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
}

function ctx() {
    const Audio = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Audio) return null;
    if (!context) {
        context = new Audio();
        master = context.createGain();
        master.gain.value = 0.55;
        master.connect(context.destination);
    }
    if (context.state === 'suspended') void context.resume();
    return context;
}

export function play(name: ToneName) {
    if (!soundEnabled()) return;
    const audio = ctx();
    if (!audio || !master) return;

    const now = audio.currentTime;
    if (now - (lastPlayed[name] ?? -1) < 0.05) return;
    lastPlayed[name] = now;

    const tone = TONES[name];
    const osc = audio.createOscillator();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();

    osc.type = tone.type;
    osc.frequency.setValueAtTime(tone.freq, now);
    if (tone.glide) {
        osc.frequency.exponentialRampToValueAtTime(tone.glide, now + tone.dur * 0.7);
    }

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.value = 0.6;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(tone.gain, now + tone.attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + tone.dur + 0.02);
}

export function bindUiSounds() {
    if (bound || typeof document === 'undefined') return;
    bound = true;

    const unlock = () => {
        void ctx()?.resume();
    };

    document.addEventListener('pointerdown', unlock);

    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement | null;
        const control = target?.closest('a, button');
        if (!control || control.getAttribute('data-sound') === 'none') return;
        play('tap');
    });
}
