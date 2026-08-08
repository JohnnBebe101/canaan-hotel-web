
import React from 'react';

type CanaanPatternProps = {
    inverted?: boolean;
};

export default function CanaanPattern({ inverted = false }: CanaanPatternProps) {
    return (
        <div className={`w-full h-24 relative overflow-hidden flex justify-center items-center border-y border-cactus/5 ${inverted ? 'bg-sandstone' : 'bg-forest'}`}>
            <div className="flex space-x-12 opacity-30">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M20 0C20 0 20 15 5 20C20 25 20 40 20 40C20 40 20 25 35 20C20 15 20 0 20 0Z"
                                fill={inverted ? "#4B6344" : "#F5F2E9"}
                            />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    );
}
