# Sobre o Projeto

Este é um projeto de gerenciamento de animais e seus cuidados, desenvolvido com base no conceito de MVP (Minimum Viable Product), com foco em entregar um produto funcional, simples para avaliação.

## Tecnologias Utilizadas

- **Backend:** Golang com o framework Gin
- **Frontend:** React com Vite
- **Banco de Dados:** Supabase (PostgreSQL gerenciado na nuvem)

## Justificativas Técnicas

- **Golang com Gin:** Escolhi por ser uma linguagem compilada, de alta performance, com otima escalabilidade e tipagem forte — caracteristicas semelhantes ao C#. O framework Gin foi adotado por ser simples e robusto para construir APIs REST.
- **React com Vite:** Popularidade e robustez. O uso do Vite se justifica tambem pela descontinuação do suporte oficial ao Create React App (CRA) e performance superior.
- **Supabase como banco de dados:** Optei pelo Supabase por ser uma solução baseada em PostgreSQL, que facilita a configuração e desenvolvimento, elimina a necessidade de configurar um banco local ou servidor, mas o projeto conta com uma migração chamada init e docker compose para sql server

## Estrutura e Organização

O backend foi estruturado separando as regras de negócio entre animais e cuidados, o que favorece a manutenção, organização e possibilidade de escalar o sistema futuramente.

O frontend foi desenvolvido com foco na legibilidade, considerando principios de organização e separação por responsabilidade, para agilizar o desenvolvimento e facilitar a avaliação.

## Pontos de Melhoria (Reconhecidos)

### Backend

- **Paginação:** Em um cenario real com grandes volumes de dados, implementar paginação nas consultas ao banco seria essencial para performance. Neste MVP, foi desconsiderado por não ser um gargalo.
- **Uso de ORM:** Pode ser utilizado um ORM como o GORM para facilitar interações com o banco de dados, reduzir boilerplate.
- **Arquitetura Limpa:** Embora conheça a convenção de separar por camadas como domain, dto, repository e service, optei por simplificar a estrutura neste projeto visando facilitar a leitura e compreensão geral. Em um projeto maior ou em produção, seguiria essa organização.
- **Regras de negócio:** A formatação da data de nascimento atualmente é feita no frontend, com a adição de "T00:00:00Z". Seria mais apropriado encapsular essa logica no backend com um tipo customizado ou middleware. Tambem, validação de campos obrigatorios e campos não negativos ou no futuro (como datas), normalização de strings.

### Frontend

- **Componentização:** Separação de responsabilidades pode ser melhorada, extraindo funções auxiliares e componentes reutilizaveis, evitar repetição, melhorar escalabilidade.
- **Validações mais robustas:** Algumas validações basicas foram feitas, mas poderiam ser expandidas com bibliotecas como Yup ou Zod, principalmente para inputs obrigatórios ou formatos especificos.

## Considerações Finais

Este projeto busca demonstrar habilidades praticas e organização de codigo, com foco em produtividade, legibilidade e boas praticas.
As escolhas feitas visaram equilibrar simplicidade, agilidade e legibilidade, com consciencia das melhorias possiveis que poderiam ser aplicadas em versões mais robustas ou com mais tempo em um projeto maior.


# Como Rodar o Projeto

## Requisitos

ter os seguintes itens instalados:

### Backend (Golang)

- [Golang](https://golang.org/dl/) (versao 1.24.2 minimo)
- Git

### Frontend (React com Vite)

- [Node.js](https://nodejs.org/) 

---

## clonar repositorio


## Docker
1. Descomentar no .env a SA_PASSWORD
2. Navegue até a pasta do backend
```bash
cd backend
```
3. nela crie o container
```bash
docker-compose up
```
4. faça as alteraçoes nescessarias no .env para a conexão com o container e alterar no db.go na pasta database


## Backend (Golang)
1. Navegue até a pasta do backend
```bash
cd backend
```
2. instale as dependencias
```bash
go mod tidy
```
3. execute o servidor
```bash
go run main.go
```

Frontend (React + Vite)
1. Navegue até a pasta do frontend
```bash
cd frontend
```
2. instale as dependencias
```bash
npm install
```
3. execute o servidor
```bash
npm run dev
```
### Preview da apliação
![image](https://github.com/user-attachments/assets/5c4feaa0-a2c4-4e76-a941-3a0a21b1c476)
![image](https://github.com/user-attachments/assets/997baf12-2897-4cb4-9f4f-95f186710ac1)
![image](https://github.com/user-attachments/assets/84d413e3-13a0-4c25-bf49-d354e3f8f9f3)
![image](https://github.com/user-attachments/assets/a1c26aac-690b-4ca5-b581-468c99504d1f)




## Observações
Verificar se a URL base da API no frontend está apontando para http://localhost:8080 (por padrao no backend) ou para possivel configuração nescessaria.

O cors no main.go esta permitindo a origiem do localhost 5173, mas pode ser nescessario configurar.

O Supabase já esta configurado com as tabelas (animals, cuidados) e as credenciais de acesso no .env do projeto que para fins de praticidade ja estao disponiveis.

