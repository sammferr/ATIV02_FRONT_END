import { useState } from 'react';
import { produtos as listaInicial } from './data/produtos';
import { ProdutoCard } from './Components/ProdutoCard';
import './App.css'; 

function App() {
    const [produtos, setProdutos] = useState(listaInicial);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('Geral');
    const [termoBusca, setTermoBusca] = useState('');

    const adicionarProduto = (e) => {
        e.preventDefault();
        const novo = {
            id: Math.random(),
            nome: nome,
            preco: parseFloat(preco),
            categoria: categoria,
            promocao: false
        };
        setProdutos([...produtos, novo]);
        setNome(''); setPreco('');
    };

    const removerProduto = (id) => {
        setProdutos(produtos.filter(p => p.id !== id));
    };

    const produtosFiltrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    const total = produtosFiltrados.reduce((acc, p) => acc + p.preco, 0);

    return (
        <div className="app-container">
            <h1 className="titulo-central">Catálogo de Produtos - Unidade 3</h1>

            {/* Formulário Requisito 5 */}
            <form onSubmit={adicionarProduto} className="form-estilizado">
                <h3>Cadastrar Novo Produto</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input className="input-field" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <input className="input-field" type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                    <select className="input-field" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="Geral">Geral</option>
                        <option value="Fotografia">Fotografia</option>
                        <option value="Lentes">Lentes</option>
                        <option value="Acessórios">Acessórios</option>
                    </select>
                    <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', padding: '10px', cursor: 'pointer' }}>
                        Adicionar
                    </button>
                </div>
            </form>

            {/* Filtro de Busca - Desafio Extra */}
            <div style={{ marginBottom: '20px' }}>
                <input 
                    className="input-field" 
                    style={{ width: '100%' }}
                    type="text" 
                    placeholder="🔍 Buscar produto por nome..." 
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
            </div>

            {/* Grid de Produtos - Requisito 3 e 4 */}
            <div className="grid-produtos">
                {produtosFiltrados.map(p => (
                    <ProdutoCard key={p.id} {...p}>
                        {/* Uso de Children - Requisito 2 */}
                        <button className="btn-remover" onClick={() => removerProduto(p.id)}>
                            Remover Produto
                        </button>
                    </ProdutoCard>
                ))}
            </div>

            <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #ccc' }} />
            
            <div style={{ textAlign: 'right' }}>
                <h2>Total (Filtrados): R$ {total.toFixed(2)}</h2>
            </div>
        </div>
    );
}

export default App;