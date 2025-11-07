# LLM Visual Explanation 🚀

Uma aplicação interativa que explica como funcionam os Large Language Models (LLMs) através de visualizações matemáticas e conceitos fundamentais.

## 🎯 Sobre o Projeto

Este projeto foi criado para tornar acessível os conceitos complexos por trás dos modelos de linguagem de grande escala, como o GPT, BERT e outros. A aplicação apresenta visualizações interativas dos principais componentes matemáticos que fazem esses modelos funcionarem.

## ✨ Funcionalidades

### 📐 Vetores & Similaridade do Cosseno
- Visualização de como palavras são representadas como vetores
- Cálculo interativo de similaridade usando cosseno
- Demonstração do produto escalar
- Seleção de diferentes palavras para comparação

### 🧠 Mecanismo de Atenção
- Mapa visual de atenção em frases
- Demonstração de como palavras "prestam atenção" umas nas outras
- Valores de atenção representados em cores e intensidades

### 🎯 Função Softmax
- Conversão de scores brutos para probabilidades
- Visualização das barras de probabilidade
- Explicação da fórmula matemática
- Demonstração prática com exemplos

### 🚀 Pipeline Completo
- Fluxo completo de processamento de uma LLM
- Desde tokenização até predição final
- Visualização step-by-step do processo


## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS para estilização
- **Lucide React** - Ícones modernos
- **Vite** - Build tool e dev server

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:3000`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Verifica qualidade do código
- `npm run typecheck` - Verifica tipos TypeScript

## 📚 Conceitos Abordados

### Matemática dos LLMs
- **Embeddings de Palavras**: Como texto é convertido em vetores numéricos
- **Similaridade Coseno**: Medida de proximidade semântica entre palavras
- **Produto Escalar**: Operação fundamental para cálculos de similaridade
- **Self-Attention**: Mecanismo que permite ao modelo entender contexto
- **Softmax**: Normalização de probabilidades para predições
- **Transformers**: Arquitetura base dos modelos modernos

### Pipeline de Processamento
1. **Tokenização**: Divisão do texto em unidades menores
2. **Embedding**: Conversão de tokens em vetores
3. **Self-Attention**: Cálculo de relações entre palavras
4. **Normalização**: Aplicação de softmax
5. **Predição**: Geração da próxima palavra

## 🎨 Interface

A aplicação possui uma interface moderna e intuitiva com:
- **Design Responsivo**: Funciona em diferentes tamanhos de tela
- **Navegação por Abas**: Organização clara dos conceitos
- **Visualizações Interativas**: Elementos que respondem à interação do usuário
- **Cores e Gradientes**: Visual atrativo para facilitar o aprendizado
- **Botão de PDF**: Exportação fácil do conteúdo

## 📖 Como Usar

1. **Navegue pelas Abas**: Use as abas superiores para explorar diferentes conceitos
2. **Interaja com os Controles**: Mude palavras na seção de vetores para ver como a similaridade varia
3. **Observe as Visualizações**: Cada gráfico e tabela explica um aspecto dos LLMs
4. **Leia as Explicações**: Textos explicativos acompanham cada visualização
5. **Exporte em PDF**: Use o botão "Baixar PDF" para salvar todo o conteúdo

## 🤝 Contribuições

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Alexandre Cardoso**

- 💼 LinkedIn: [alexandre-cardoso-b47353184](https://www.linkedin.com/in/alexandre-cardoso-b47353184/)

---

## 🎓 Para Estudantes e Educadores

Este projeto é ideal para:
- **Estudantes** que querem entender como funcionam os LLMs
- **Professores** que precisam explicar conceitos de IA de forma visual
- **Desenvolvedores** que trabalham com modelos de linguagem
- **Pesquisadores** que querem material didático sobre transformers

## 🔮 Roadmap

Funcionalidades futuras planejadas:
- [ ] Visualização 3D de embeddings
- [ ] Demonstração de diferentes tipos de atenção
- [ ] Comparação entre diferentes modelos
- [ ] Modo escuro
- [ ] Suporte a outros idiomas
- [ ] Animações interativas

---

⭐ **Se este projeto te ajudou, dê uma estrela no repositório!**

Feito com ❤️ por [Alexandre Cardoso](https://www.linkedin.com/in/alexandre-cardoso-b47353184/)