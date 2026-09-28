# 📰 Plataforma Editorial & Publicação Digital

> Plataforma full stack para gestão editorial, moderação de conteúdos e publicação digital, desenvolvida com foco em **tipagem estrita de ponta a ponta (Type-Safe)**, arquitetura orientada a componentes e persistência relacional com **Drizzle ORM**.

---

## 🏛️ Visão Geral da Arquitetura

A aplicação foi concebida unificando o ecossistema moderno de desenvolvimento web com Next.js, tirando partido de renderização otimizada, rotas de API protegidas e uma camada de dados sem sobrecarga de runtime:

* **Frontend & Renderização:** Interface desenvolvida em **Next.js (React)** com componentes reutilizáveis, Tailwind CSS para estilização consistente e consumo de dados assíncrono.
* **Camada de Dados & Persistência:** Gestão de base de dados relacional com **Drizzle ORM**, garantindo esquemas tipados, migrações controladas e consultas diretas em SQL sem overhead.
* **Segurança & Controlo de Acessos:** Painel de gestão editorial protegido, com validação de entradas e controlo de estados de publicação.

---

## 🚀 Funcionalidades Principais

* **Portal Público de Notícias / Artigos:**
  * Listagem dinâmica com metadados editoriais, data de publicação e ativos visuais.
  * Renderização otimizada para carregamento rápido e consumo leve de dados.
* **Painel Administrativo & Gestão Editorial:**
  * Fluxo completo de criação, edição, publicação e remoção de matérias (CRUD).
  * Associação de imagens de capa e metadados estruturados.
  * Gestão de estados de conteúdo para moderação editorial.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
|---|---|
| **Ambiente Full Stack** | Next.js, React, TypeScript |
| **Camada de Dados (ORM)**| Drizzle ORM |
| **Bases de Dados** | SQLite (desenvolvimento local) / PostgreSQL |
| **Estilização & UI** | Tailwind CSS, PostCSS |
| **Qualidade & Padrões** | ESLint, Prettier, TypeScript Strict Mode |

---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (versão 18.x ou superior)
* npm, yarn ou pnpm

### Passos de Instalação

1. Clone o repositório:
   ```bash
   git clone git@github.com:lucaslbrena/plataforma-de-publicacao.git
   cd plataforma-de-publicacao
