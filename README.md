# DJ Finance AI

### Sistema de Gestão Financeira Pessoal

**Desenvolvido por Douglas Williams — 2026**

O DJ Finance AI é um projeto acadêmico de desenvolvimento de software voltado à gestão financeira pessoal. Seu objetivo é oferecer uma aplicação web para organização de receitas, despesas, categorias financeiras e objetivos de economia, com uma arquitetura preparada para futuras funcionalidades inteligentes.

---

## 1. Objetivo do projeto

Desenvolver um sistema de gestão financeira pessoal que permita centralizar informações financeiras, acompanhar movimentações e organizar recursos por meio de uma interface intuitiva.

O projeto aplica conceitos de desenvolvimento web moderno, modelagem de dados, autenticação, segurança e organização de código utilizando princípios de Domain-Driven Design (DDD).

## 2. Módulos do sistema

- **Dashboard:** painel principal com indicadores financeiros.
- **Transações:** gerenciamento de receitas e despesas.
- **Investimentos:** módulo destinado à organização financeira de investimentos.
- **Relatórios:** acompanhamento e análise financeira.
- **Cofres:** estrutura para objetivos de economia, depósitos e retiradas.
- **Assistente IA:** módulo destinado à evolução do sistema com recursos de inteligência artificial.
- **Autenticação:** cadastro, login e integração com Google.
- **Configurações:** gerenciamento das configurações do sistema.

*Observação: os módulos encontram-se em diferentes estágios de implementação. A existência de uma página ou rota não significa que todas as funcionalidades previstas estejam concluídas.*

## 3. Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| Next.js 16 | Framework da aplicação |
| React 19 | Construção da interface |
| TypeScript | Tipagem estática |
| Tailwind CSS 4 | Estilização |
| PostgreSQL | Banco de dados |
| Prisma ORM 7 | Acesso e modelagem de dados |
| NextAuth.js | Autenticação |
| bcryptjs | Hash e verificação de senhas |
| Zod | Validação de dados |
| Resend | Envio de e-mails |
| AWS SDK | Integração com armazenamento S3 |

## 4. Arquitetura e organização

O projeto utiliza uma organização inspirada em Domain-Driven Design (DDD), buscando separar responsabilidades e facilitar a manutenção e evolução do sistema.

Estrutura principal:

```text
DJ-Finance-AI/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
└── src/
    ├── app/
    │   ├── api/
    │   ├── dashboard/
    │   ├── investments/
    │   ├── transactions/
    │   ├── reports/
    │   ├── ai-assistant/
    │   ├── settings/
    │   ├── login/
    │   └── register/
    ├── components/
    │   ├── dashboard/
    │   ├── layout/
    │   ├── providers/
    │   └── ui/
    ├── lib/
    ├── types/
    └── generated/
```

## 5. Modelagem do banco de dados

O banco utiliza PostgreSQL e Prisma ORM.

Principais entidades:

| Entidade | Responsabilidade |
|---|---|
| User | Cadastro e gerenciamento de usuários |
| Account | Contas de autenticação externa |
| Session | Sessões de acesso |
| VerificationToken | Tokens de verificação |
| Category | Categorias financeiras |
| Transaction | Receitas e despesas |
| Vault | Cofres e objetivos financeiros |
| VaultTransaction | Movimentações dos cofres |

Enums utilizados:

- `UserRole`: USER e ADMIN.
- `TransactionType`: INCOME e EXPENSE.
- `VaultTransactionType`: DEPOSIT e WITHDRAWAL.

As migrações do banco estão versionadas em `prisma/migrations`.

## 6. Requisitos

Para executar o projeto:

- Node.js 24 ou versão compatível.
- npm.
- PostgreSQL ou uma instância PostgreSQL hospedada.
- Git.

## 7. Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/DJ-Finance-AI-Academico.git
```

Entre na pasta:

```bash
cd DJ-Finance-AI-Academico
```

Instale as dependências:

```bash
npm ci
```

Crie o arquivo de ambiente:

```bash
cp .env.example .env.local
```

## 8. Configuração do ambiente

Configure as variáveis no arquivo `.env.local`.

| Variável | Finalidade |
|---|---|
| DATABASE_URL | Conexão PostgreSQL da aplicação |
| DATABASE_URL_UNPOOLED | Conexão utilizada pelo Prisma CLI |
| AUTH_URL | URL da aplicação |
| AUTH_SECRET | Segredo da autenticação |
| AUTH_GOOGLE_ID | Identificador OAuth do Google |
| AUTH_GOOGLE_SECRET | Segredo OAuth do Google |
| RESEND_API_KEY | Chave de API do Resend |
| EMAIL_FROM | Remetente dos e-mails |

Gere um segredo de autenticação:

```bash
openssl rand -base64 32
```

Utilize o resultado na variável `AUTH_SECRET`.

As integrações externas exigem credenciais próprias. Nenhuma credencial privada é fornecida neste repositório.

## 9. Configuração do banco de dados

Configure as URLs de conexão PostgreSQL no `.env.local`.

Gere o cliente Prisma:

```bash
npx prisma generate
```

Aplique as migrações existentes:

```bash
npx prisma migrate deploy
```

## 10. Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

http://localhost:3000

Para verificar o código:

```bash
npm run lint
```

Para gerar a versão de produção:

```bash
npm run build
```

## 11. Segurança

- Credenciais e variáveis privadas não devem ser publicadas.
- O arquivo `.env.local` está excluído do versionamento.
- O arquivo `.env.example` contém apenas valores ilustrativos.
- Senhas são armazenadas utilizando hash.
- O acesso aos dados deve respeitar a identificação e as permissões dos usuários.

## 12. Considerações finais

O DJ Finance AI é um projeto acadêmico que reúne conceitos de engenharia de software, desenvolvimento web, banco de dados relacional e autenticação.

Sua arquitetura foi organizada para permitir manutenção, evolução e futuras integrações com recursos de inteligência artificial.

---

**Autor:** Douglas Williams
**Ano:** 2026
**Licença:** MIT