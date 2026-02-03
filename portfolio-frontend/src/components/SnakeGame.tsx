import { useState, useEffect, useCallback, useRef } from 'react';

import { FaPlay, FaRedo } from 'react-icons/fa';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };

const SnakeGame = () => {
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Point>({ x: 15, y: 5 });
    const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Initialize/Reset Game
    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDirection({ x: 0, y: -1 });
        setGameOver(false);
        setScore(0);
        setIsPlaying(true);
        spawnFood();
    };

    const spawnFood = useCallback(() => {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        setFood({ x, y });
    }, []);

    // Game Loop
    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const moveSnake = () => {
            setSnake((prevSnake) => {
                const newHead = {
                    x: prevSnake[0].x + direction.x,
                    y: prevSnake[0].y + direction.y,
                };

                // Check collisions (walls)
                if (
                    newHead.x < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_SIZE
                ) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return prevSnake;
                }

                // Check collisions (self)
                if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore((s) => {
                        const newScore = s + 10;
                        if (newScore > highScore) setHighScore(newScore);
                        return newScore;
                    });
                    spawnFood();
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);

        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [isPlaying, gameOver, direction, food, highScore, spawnFood]);

    // Keyboard Controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isPlaying) return;
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, isPlaying]);

    return (
        <div className="w-full h-full bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-2xl flex flex-col items-center justify-between font-mono">
            {/* Header */}
            <div className="w-full flex justify-between items-end mb-4 border-b border-gray-800 pb-4">
                <div>
                    <h3 className="text-gray-400 text-xs tracking-widest uppercase mb-1">Status</h3>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-white font-bold">{gameOver ? 'GAME OVER' : isPlaying ? 'RUNNING' : 'READY'}</span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Score</p>
                    <p className="text-2xl text-white font-bold">{score}</p>
                </div>
            </div>

            {/* Game Board */}
            <div className="relative aspect-square w-full max-w-sm bg-black/50 rounded-xl overflow-hidden border border-gray-800 backdrop-blur-sm">
                {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-6 text-center">
                        <FaPlay className="text-4xl text-orange-500 mb-4" />
                        <h4 className="text-white text-xl font-bold mb-2">Retro Snake</h4>
                        <p className="text-gray-400 text-sm mb-6">Use arrow keys to move. Eat orange dots to grow.</p>
                        <button
                            onClick={resetGame}
                            className="bg-orange-500 text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            START GAME
                        </button>
                    </div>
                )}

                {gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-6 text-center">
                        <h4 className="text-red-500 text-2xl font-bold mb-2">GAME OVER</h4>
                        <p className="text-white text-lg mb-6">Final Score: {score}</p>
                        <button
                            onClick={resetGame}
                            className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <FaRedo /> TRY AGAIN
                        </button>
                    </div>
                )}

                {/* Grid */}
                <div
                    className="w-full h-full grid"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                    }}
                >
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                        const x = i % GRID_SIZE;
                        const y = Math.floor(i / GRID_SIZE);
                        const isSnake = snake.some((s) => s.x === x && s.y === y);
                        const isFood = food.x === x && food.y === y;
                        const isHead = snake[0].x === x && snake[0].y === y;

                        return (
                            <div
                                key={i}
                                className={`w-full h-full transition-all duration-150 ${isHead ? 'bg-orange-500 rounded-sm' :
                                    isSnake ? 'bg-orange-600/60 rounded-sm scale-90' :
                                        isFood ? 'bg-green-500 rounded-full scale-50 animate-pulse' :
                                            'bg-transparent'
                                    }`}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="w-full mt-4 flex justify-between items-center text-xs text-gray-500">
                <p>WASD / ARROWS to move</p>
                <p>HIGH SCORE: {highScore}</p>
            </div>
        </div>
    );
};

export default SnakeGame;
