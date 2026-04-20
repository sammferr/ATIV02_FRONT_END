// 3. Props e JSX
export function ProdutoCard({ nome, preco, categoria, promocao }) {
    const cardStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        borderRadius: '8px',
        backgroundColor: promocao ? '#e1f5fe' : '#fff'
    };

    return (
        <div style={cardStyle}>
            <h3>{nome}</h3>
            <p>Categoria: {categoria}</p>
            <p>Preço: R$ {preco.toFixed(2)}</p>
            {/* 4. Condicional com Operador Ternário */}
            {promocao ? <strong style={{color: 'green'}}>🔥 EM PROMOÇÃO!</strong> : <small>Preço normal</small>}
        </div>
    );
}