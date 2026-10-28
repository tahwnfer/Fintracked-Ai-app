# Fintracked

O Fintracked é uma aplicação web para organizar e acompanhar as finanças pessoais. Com ele, cada pessoa pode registrar suas movimentações e visualizar um resumo financeiro em um painel.

## O que a aplicação faz

- Permite criar uma conta e entrar na aplicação.
- Exibe um painel com o saldo, as entradas, as despesas e os investimentos do período.
- Apresenta gráficos para facilitar a visualização das movimentações.
- Permite cadastrar e consultar transações, como depósitos, despesas e investimentos.
- Organiza as transações por categoria, forma de pagamento e data.
- Oferece uma lista com as movimentações recentes e uma página para consultar o histórico completo.
- Inclui opções para editar e excluir transações.

### Insights

A área de insights está disponível no painel como uma prévia. No momento, ela informa que as sugestões personalizadas com IA serão disponibilizadas futuramente.

## Como funciona

Depois de criar uma conta ou entrar, a pessoa é direcionada ao painel. Ali, pode consultar os valores resumidos e as transações recentes. Ao adicionar movimentações, elas aparecem no histórico e contribuem para os totais e gráficos do painel. A página de transações permite consultar, editar e excluir os registros.

## Tecnologias

- Next.js e React
- TypeScript
- Tailwind CSS
- Recharts para gráficos
- Better Auth para autenticação

## Executar localmente

É necessário ter Node.js e npm instalados.

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

Para verificar o código com o ESLint, execute:

```bash
npm run lint
```

## Situação do projeto

O painel, a autenticação e o gerenciamento de transações fazem parte da aplicação. As sugestões de economia geradas por IA ainda são uma funcionalidade planejada.
