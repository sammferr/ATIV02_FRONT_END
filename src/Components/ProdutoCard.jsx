export function ProdutoCard({ nome, preco, categoria, promocao, children }) {
    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: promocao ? '#e3f2fd' : '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        maxWidth: '280px'
    };

    return (
        <div style={cardStyle}>
            <h3>{nome}</h3>
            <p><strong>Categoria:</strong> {categoria}</p>
            <p><strong>Preço:</strong> R$ {preco.toFixed(2)}</p>
            {promocao && <p style={{ color: 'green', fontWeight: 'bold' }}>🔥 EM PROMOÇÃO!</p>}
            
            {/* O children permite inserir o botão de remover vindo do App.jsx */}
            <div className="card-acoes">
                {children}
            </div>
        </div>
    );
}