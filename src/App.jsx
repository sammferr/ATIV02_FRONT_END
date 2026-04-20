import { useState } from 'react';
import { produtos as listaInicial } from './data/produtos';
import { ProdutoCard } from './Components/ProdutoCard';

function App() {
    const [produtos, setProdutos] = useState(listaInicial);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');

    const adicionarProduto = (e) => {
        e.preventDefault();
        const novo = {
            id: Math.random(),
            nome: nome,
            preco: parseFloat(preco),
            categoria: "Geral",
            promocao: false
        };
        setProdutos([...produtos, novo]);
        setNome('');
        setPreco('');
    };

    const total = produtos.reduce((acc, p) => acc + p.preco, 0);

    return (
        /* AJUSTE: Cor alterada para #333 para dar nitidez total nos cards e textos */
        <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            
            <h1 style={{ textAlign: 'center', color: '#222' }}>Catálogo de Produtos - Tech Store</h1>

            <form onSubmit={adicionarProduto} style={{ 
                marginBottom: '30px', 
                padding: '20px', 
                background: '#333', 
                color: 'white', 
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ marginTop: 0 }}>Cadastrar Novo Produto</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input 
                        type="text" 
                        placeholder="Nome do Produto" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                        required 
                    />
                    <input 
                        type="number" 
                        placeholder="Preço" 
                        value={preco} 
                        onChange={(e) => setPreco(e.target.value)} 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '120px' }}
                        required 
                    />
                    <button type="submit" style={{ 
                        padding: '8px 20px', 
                        cursor: 'pointer', 
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        fontWeight: 'bold'
                    }}>
                        Adicionar
                    </button>
                </div>
            </form>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {produtos.map(p => (
                    <ProdutoCard key={p.id} {...p} />
                ))}
            </div>

            <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #ccc' }} />
            
            <div style={{ textAlign: 'right', paddingRight: '20px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Total do Catálogo: 
                    <span style={{ color: '#2e7d32', marginLeft: '10px' }}>
                        R$ {total.toFixed(2)}
                    </span>
                </h2>
            </div>
        </div>
    );
}

export default App;