'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Testing() {
    const [pokemon, setPokemon] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(0);
    const [clickedIds, setClickedIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            const data: any[] = [];

            for (let i = 1; i <= 18; i++) {
                try {
                    const response = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${i}`
                    );
                    const pokemon = {
                        id: response.data.id,
                        name: response.data.name,
                        image: response.data.sprites.front_default,
                        color: getRandomColor(),
                    };
                    data.push(pokemon);
                } catch (error) {
                    console.error(`Error fetching Pokémon ${i}:`, error);
                }
            }

            setPokemon(shuffleArray(data));
            setLoading(false);
        };

        fetchPokemon();
    }, []);

    const handleCardClick = (id: number) => {
        if (clickedIds.includes(id)) {
            setScore(0);
            setClickedIds([]);
        } else {
            setScore(prev => prev + 1);
            setClickedIds([...clickedIds, id]);
        }

        setPokemon(prev => shuffleArray([...prev]));
    };

    const shuffleArray = (arr: any[]) => {
        return arr
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };

    const getRandomColor = () => {
        const colors = [
            '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#A66DD4', '#F57DFF',
            '#FF9F1C', '#E23E57', '#00C9A7', '#FF5E5B', '#51E5FF', '#9D4EDD'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading Pokémon...</p>;
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginBottom: '30px',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ margin: 0, fontSize: '2.2rem', color: '#2c3e50' }}>
                    🎉 Pokémon Memory Game
                </h1>
                <p
                    style={{
                        fontSize: '1rem',
                        color: '#fff',
                        marginTop: '10px',
                        backgroundColor: '#ff6b6b',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                >
                    Score: {score}
                </p>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '16px',
                }}
            >
                {pokemon.map((poke) => (
                    <div
                        key={poke.id}
                        onClick={() => handleCardClick(poke.id)}
                        style={{
                            flex: '1 1 calc(33.33% - 32px)',
                            maxWidth: '200px',
                            minWidth: '120px',
                            height: '220px',
                            border: '2px solid #fff',
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: poke.color,
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        <img
                            src={poke.image}
                            alt={poke.name}
                            style={{
                                width: '80px',
                                height: '80px',
                                objectFit: 'contain',
                                marginBottom: '10px',
                            }}
                        />
                        <p
                            style={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                color: '#fff',
                                textTransform: 'capitalize',
                            }}
                        >
                            {poke.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
