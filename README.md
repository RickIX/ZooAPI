# Sistema de Gerenciamento de Zoológico

## Descrição
Sistema completo para gerenciamento de animais em um zoológico, desenvolvido com Spring Boot no backend e Angular no frontend. O sistema permite o cadastro, visualização, edição e exclusão de animais, além de oferecer estatísticas sobre a população do zoológico.

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Microsoft SQL Server
- Maven

### Frontend
- Angular 17
- TypeScript

## Funcionalidades

### Gestão de Animais
- Cadastro de novos animais
- Listagem de todos os animais
- Edição de informações dos animais
- Exclusão de animais
- Filtro por habitat

### Estatísticas
- Total de animais no zoológico
- Distribuição por habitat
- Distribuição por espécie
- Distribuição por país de origem

## Estrutura do Projeto

### Backend
- `src/main/java/com/zoo/controller`: Controladores REST
- `src/main/java/com/zoo/model`: Entidades
- `src/main/java/com/zoo/repository`: Repositórios JPA
- `src/main/java/com/zoo/service`: Serviços de negócio
- `src/main/resources`: Configurações e propriedades

### Frontend
- `src/app/components`: Componentes Angular
- `src/app/models`: Interfaces TypeScript
- `src/app/services`: Serviços Angular
- `src/assets`: Recursos estáticos

## Modelo de Dados

### Animal
- ID
- Nome
- Espécie
- Habitat
- País de Origem
- Data de Nascimento

## Interface do Usuário

### Lista de Animais
- Tabela responsiva com informações dos animais
- Botões de ação para editar e excluir
- Filtro por habitat
- Botão para adicionar novo animal
- Botão para visualizar estatísticas

### Estatísticas
- Cards informativos com totais
- Gráficos de distribuição
- Layout responsivo e moderno

## Estilo Visual
- Tema personalizado com cores naturais
- Verde floresta como cor principal
- Âmbar como cor secundária
- Marrom terroso como cor de destaque
- Design responsivo e adaptativo
- Animações suaves
- Ícones intuitivos

## Como Executar

### Backend
1. Clone o repositório
2. Configure o banco de dados SQL Server:
   - Certifique-se de ter o SQL Server instalado e rodando
   - Crie um banco de dados chamado `zoo_db`
   - Configure o arquivo `application.properties` com as credenciais corretas:
     ```properties
     spring.datasource.url=jdbc:sqlserver://<MAQUINA>\\SQLEXPRESS:1433;databaseName=zoodb;integratedSecurity=false;encrypt=true;trustServerCertificate=true;
     spring.datasource.username=seu_usuario
     spring.datasource.password=sua_senha
     spring.datasource.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver
     ```
3. Execute `mvn spring-boot:run`
4. O servidor estará disponível em `http://localhost:8080`

### Frontend
1. Navegue até a pasta `zoo-frontend`
2. Execute `npm install`
3. Execute `ng serve`
4. Acesse `http://localhost:4200`

## Requisitos
- Java 17 ou superior
- Node.js 18 ou superior
- MySQL 8.0 ou superior
- Maven 3.6 ou superior
- Angular CLI 17 ou superior
