import { useState, useRef } from 'react';
import { FaMicrophone, FaStop, FaTrash } from 'react-icons/fa6';
import { motion } from 'framer-motion';

interface VoiceRecorderProps {
    onRecordingComplete: (audioBlob: Blob) => void;
    onDelete: () => void;
}

const VoiceRecorder = ({ onRecordingComplete, onDelete }: VoiceRecorderProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<number | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                onRecordingComplete(blob);

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => {
                    if (prev >= 8) { // 8 seconds max
                        stopRecording();
                        return prev;
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

    const handleDelete = () => {
        setAudioUrl(null);
        setRecordingTime(0);
        onDelete();
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-white/70 text-sm font-medium">
                Record a voice memo (Max 8s)
            </p>

            {!audioUrl ? (
                <div className="flex items-center gap-4">
                    <button
                        type="button" // Prevent form submission
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording
                                ? 'bg-red-500 hover:bg-red-600 scale-110'
                                : 'bg-white text-black hover:scale-105'
                            }`}
                    >
                        {isRecording ? <FaStop className="text-white" /> : <FaMicrophone />}
                    </button>

                    {isRecording && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 font-mono font-bold"
                        >
                            00:0{recordingTime} / 00:08
                        </motion.div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-4 w-full">
                    <audio src={audioUrl} controls className="h-8 flex-1" />
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                        <FaTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default VoiceRecorder;
