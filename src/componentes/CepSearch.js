// src/CepSearch.js
import React, { useState } from 'react';
import './CepSearch.css';

const CepSearch = () => {
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setCep(event.target.value);
    };

    const handleSearch = () => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    throw new Error('CEP não encontrado');
                }
                setAddress(data);
                setError(null);
            })
            .catch(error => {
                setAddress(null);
                setError(error.message);
            });
    };

    return (
        <div className="CepSearch">
            <h1>Buscar Endereço pelo CEP</h1>
            <input
                type="text"
                value={cep}
                onChange={handleInputChange}
                placeholder="Digite o CEP"
            />
            <button onClick={handleSearch}>Buscar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {address && (
                <div>
                    <h2>Endereço:</h2>
                    <p><strong>Logradouro:</strong> {address.logradouro}</p>
                    <p><strong>Bairro:</strong> {address.bairro}</p>
                    <p><strong>Cidade:</strong> {address.localidade}</p>
                    <p><strong>Estado:</strong> {address.uf}</p>
                </div>
            )}
        </div>
    );
};

export default CepSearch;
