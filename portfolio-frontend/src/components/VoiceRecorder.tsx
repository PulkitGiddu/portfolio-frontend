import { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaTrash, FaPlay, FaPause } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceRecorderProps {
    onRecordingComplete: (audioBlob: Blob) => void;
    onDelete: () => void;
}

const VoiceRecorder = ({ onRecordingComplete, onDelete }: VoiceRecorderProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackProgress, setPlaybackProgress] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const maxDuration = 8;

    useEffect(() => {
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                onRecordingComplete(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => {
                    if (prev >= maxDuration - 1) {
                        stopRecording();
                        return maxDuration;
                    }
                    return prev + 1;
                });
            }, 1000);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone. Please ensure permission is granted.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    const togglePlayback = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
            trackProgress();
        }
    };

    const trackProgress = () => {
        if (!audioRef.current) return;
        const update = () => {
            if (audioRef.current) {
                const progress = audioRef.current.currentTime / audioRef.current.duration;
                setPlaybackProgress(isNaN(progress) ? 0 : progress);
                if (!audioRef.current.paused) {
                    animFrameRef.current = requestAnimationFrame(update);
                }
            }
        };
        animFrameRef.current = requestAnimationFrame(update);
    };

    const handleDelete = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        setAudioUrl(null);
        setRecordingTime(0);
        setIsPlaying(false);
        setPlaybackProgress(0);
        onDelete();
    };

    const formatTime = (s: number) => `0:${s.toString().padStart(2, '0')}`;

    // Generate waveform bars
    const bars = 24;
    const waveformHeights = useRef(
        Array.from({ length: bars }, () => 0.2 + Math.random() * 0.8)
    ).current;

    return (
        <div className="flex items-center gap-3">
            {!audioUrl ? (
                <>
                    {/* Record button */}
                    <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${isRecording
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        {isRecording && (
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-red-400"
                                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
                            />
                        )}
                        {isRecording ? (
                            <FaStop className="text-white text-sm" />
                        ) : (
                            <FaMicrophone className="text-gray-600 dark:text-gray-300 text-sm" />
                        )}
                    </button>

                    <AnimatePresence>
                        {isRecording && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="flex items-center gap-3 overflow-hidden"
                            >
                                {/* Waveform visualization */}
                                <div className="flex items-center gap-[2px] h-8">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-[3px] rounded-full bg-red-500"
                                            animate={{
                                                height: [4, 8 + Math.random() * 20, 4],
                                            }}
                                            transition={{
                                                duration: 0.4 + Math.random() * 0.4,
                                                repeat: Infinity,
                                                delay: i * 0.05,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    ))}
                                </div>

                                <span className="font-mono text-sm text-red-500 tabular-nums whitespace-nowrap">
                                    {formatTime(recordingTime)}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isRecording && (
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                            Tap to record (max 8s)
                        </span>
                    )}
                </>
            ) : (
                <>
                    {/* Playback UI */}
                    <audio
                        ref={audioRef}
                        src={audioUrl}
                        onEnded={() => { setIsPlaying(false); setPlaybackProgress(0); }}
                    />

                    <button
                        type="button"
                        onClick={togglePlayback}
                        className="w-11 h-11 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center transition-colors shrink-0"
                    >
                        {isPlaying ? (
                            <FaPause className="text-white text-sm" />
                        ) : (
                            <FaPlay className="text-white text-sm ml-0.5" />
                        )}
                    </button>

                    {/* Waveform progress bar */}
                    <div className="flex items-center gap-[2px] h-8 flex-1">
                        {waveformHeights.map((h, i) => {
                            const barProgress = (i + 1) / bars;
                            const isActive = barProgress <= playbackProgress;
                            return (
                                <div
                                    key={i}
                                    className={`w-[3px] rounded-full transition-colors duration-150 ${isActive
                                        ? 'bg-teal-500'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                    style={{ height: `${h * 28}px` }}
                                />
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    >
                        <FaTrash className="text-sm" />
                    </button>
                </>
            )}
        </div>
    );
};

export default VoiceRecorder;
