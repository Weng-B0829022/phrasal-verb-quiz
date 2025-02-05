// src/components/PhrasalVerbQuiz.tsx
import React, { useState, useEffect } from 'react';
import { Shuffle, Volume2 } from 'lucide-react';
import { PhrasalVerb, phrasalVerbs } from '../data/phrasalVerbs';

const PhrasalVerbQuiz: React.FC = () => {
    const [selectedVerbs, setSelectedVerbs] = useState<PhrasalVerb[]>([]);
    const [visibleDetails, setVisibleDetails] = useState<Record<number, boolean>>({});

    const getRandomVerbs = (): PhrasalVerb[] => {
        const shuffled = [...phrasalVerbs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    };

    const generateNewSet = (): void => {
        setSelectedVerbs(getRandomVerbs());
        setVisibleDetails({});
    };

    useEffect(() => {
        generateNewSet();
    }, []);

    const toggleDetails = (index: number): void => {
        setVisibleDetails(prev => ({
        ...prev,
        [index]: !prev[index]
        }));
    };

    const shuffleVerbs = (): void => {
        const shuffled = [...selectedVerbs].sort(() => Math.random() - 0.5);
        setSelectedVerbs(shuffled);
    };

    const toggleAllDetails = (): void => {
        // 檢查是否所有詳情都已顯示
        const allShown = selectedVerbs.every(verb => visibleDetails[verb.id]);
        
        if (allShown) {
            // 如果全部顯示，則隱藏所有
            setVisibleDetails({});
        } else {
            // 如果未全部顯示，則顯示所有
            const allVisible = selectedVerbs.reduce((acc, verb) => {
                acc[verb.id] = true;
                return acc;
            }, {} as Record<number, boolean>);
            setVisibleDetails(allVisible);
        }
    };

    const speak = (text: string): void => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.volume = 0.3;
        
        // 獲取所有可用的語音
        const voices = window.speechSynthesis.getVoices();
        // 尋找英語女聲
        const femaleVoice = voices.find(voice => 
            voice.lang.includes('en') && voice.name.includes('Female')
        );
        
        // 如果找到女聲就使用，否則使用默認聲音
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Phrasal Verbs Quiz</h1>
            <button 
                onClick={generateNewSet}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
            <Shuffle className="w-4 h-4" />
            New Set
            </button>
            <button 
                onClick={shuffleVerbs}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
            Shuffle
            </button>
            <button 
                onClick={toggleAllDetails}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
                {selectedVerbs.every(verb => visibleDetails[verb.id]) ? 'Hide All' : 'Show All'}
            </button>
        </div>

        <div className="space-y-4">
            {selectedVerbs.map((verb) => (
                <div key={verb.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-semibold">{verb.id}. {verb.phrase}</h2>
                                    <button
                                        onClick={() => speak(verb.phrase)}
                                        className="p-1 hover:bg-gray-100 rounded-full"
                                        title="Play pronunciation"
                                    >
                                        <Volume2 className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                                {visibleDetails[verb.id] && (
                                    <div className="space-y-2 mt-2">
                                        <div className="flex items-center gap-2">
                                            <p className="text-lg text-blue-600">{verb.meaning}</p>
                                            <button
                                                onClick={() => speak(verb.meaning)}
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                                title="Play pronunciation"
                                            >
                                                <Volume2 className="w-5 h-5 text-gray-600" />
                                            </button>
                                        </div>
                                        <div className="space-y-1">
                                            {verb.examples.map((example, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <p className="text-gray-600 italic">{example}</p>
                                                    <button
                                                        onClick={() => speak(example)}
                                                        className="p-1 hover:bg-gray-100 rounded-full"
                                                        title="Play pronunciation"
                                                    >
                                                        <Volume2 className="w-5 h-5 text-gray-600" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => toggleDetails(verb.id)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                {visibleDetails[verb.id] ? 'Hide' : 'Show'} Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default PhrasalVerbQuiz;