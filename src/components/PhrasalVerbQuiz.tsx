// src/components/PhrasalVerbQuiz.tsx
import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
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

    const showAllDetails = (): void => {
        const allVisible = selectedVerbs.reduce((acc, _, index) => {
            acc[index] = true;
            return acc;
        }, {} as Record<number, boolean>);
        setVisibleDetails(allVisible);
    };

    const hideAllDetails = (): void => {
        setVisibleDetails({});
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
            onClick={showAllDetails}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
            Show All
            </button>
            <button 
            onClick={hideAllDetails}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
            Hide All
            </button>
        </div>

        <div className="space-y-4">
            {selectedVerbs.map((verb, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold">{index}. {verb.phrase}</h2>
                                {visibleDetails[index] && (
                                    <div className="space-y-2 mt-2">
                                        <p className="text-lg text-blue-600">{verb.meaning}</p>
                                        <div className="space-y-1">
                                            {verb.examples.map((example, i) => (
                                                <p key={i} className="text-gray-600 italic">
                                                    {example}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => toggleDetails(index)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                {visibleDetails[index] ? 'Hide' : 'Show'} Details
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