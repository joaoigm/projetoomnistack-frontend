import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'

export default function NewIncident() {
    const [title, setTitle ] = useState('');
    const [description, setDescription ] = useState('');
    const [value, setValue ] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();
        try {
            await api.post('incidents', {
                title: title,
                description: description,
                value: value
            }, {
                headers: { Authorization: ongId }
            });
            history.push('/profile')
        }catch(err){
            alert('Falha ao cadastrar caso, tente novamente')
        }
    }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Rero"></img>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreve o caso detalhadamente para encontrar um herói para resolver isso</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Titulo do caso" value={title} onChange={e => setTitle(e.target.value)}></input>
                    <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
                    <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)}/>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}