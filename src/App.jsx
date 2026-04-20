import { useState, useEffect } from 'react'; // Adicionamos useEffect
import { ProdutoCard } from './Components/ProdutoCard';
import './App.css'; 

function App() {
    // A lista inicial agora começa vazia!
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carregamento
    
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('Geral');
    const [termoBusca, setTermoBusca] = useState('');

    // REQUISITO 4: useEffect com async/await e fetch
    useEffect(() => {
        const carregarDados = async () => {
            try {
                // DESAFIO EXTRA: Verifica se já tem algo salvo no LocalStorage
                const produtosSalvos = localStorage.getItem('techStoreProdutos');
                
                if (produtosSalvos) {
                    setProdutos(JSON.parse(produtosSalvos));
                } else {
                    // REQUISITO 3: Simula chamada de API usando fetch e Promises
                    const resposta = await fetch('/produtos.json');
                    const dados = await resposta.json();
                    setProdutos(dados);
                }
            } catch (erro) {
                console.error("Erro ao buscar produtos:", erro);
            } finally {
                // Espera meio segundo só para você conseguir ver o "Carregando..." na tela
                setTimeout(() => setLoading(false), 500);
            }
        };

        carregarDados();
    }, []); // O array vazio significa que roda apenas 1 vez ao abrir a página

    // DESAFIO EXTRA: Salva no LocalStorage sempre que a lista de produtos mudar
    useEffect(() => {
        if (produtos.length > 0) {
            localStorage.setItem('techStoreProdutos', JSON.stringify(produtos));
        }
    }, [produtos]);

    const adicionarProduto = (e) => {
        e.preventDefault();
        const novo = {
            id: Math.random(), // Simulando ID único
            nome: nome,
            preco: parseFloat(preco),
            categoria: categoria,
            promocao: false
        };
        setProdutos([...produtos, novo]);
        setNome(''); setPreco('');
    };

    const removerProduto = (id) => {
        const novaLista = produtos.filter(p => p.id !== id);
        setProdutos(novaLista);
        // Se esvaziar a lista, limpa o LocalStorage também
        if (novaLista.length === 0) localStorage.removeItem('techStoreProdutos');
    };

    const produtosFiltrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    const total = produtosFiltrados.reduce((acc, p) => acc + p.preco, 0);

    return (
        <div className="app-container">
            <h1 className="titulo-central">Catálogo de Produtos - Unidade 4</h1>

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

            <div style={{ marginBottom: '20px' }}>
                <input 
                    className="input-field" style={{ width: '100%' }} type="text" 
                    placeholder="🔍 Buscar produto por nome..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}
                />
            </div>

            {/* REQUISITO 4: Exibir "Carregando..." */}
            {loading ? (
                <h2 style={{ textAlign: 'center', color: '#666' }}>⏳ Carregando produtos...</h2>
            ) : (
                <div className="grid-produtos">
                    {produtosFiltrados.map(p => (
                        <ProdutoCard key={p.id} {...p}>
                            <button className="btn-remover" onClick={() => removerProduto(p.id)}>Remover</button>
                        </ProdutoCard>
                    ))}
                </div>
            )}

            <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #ccc' }} />
            <div style={{ textAlign: 'right' }}>
                <h2>Total (Filtrados): R$ {total.toFixed(2)}</h2>
            </div>
        </div>
    );
}

export default App;