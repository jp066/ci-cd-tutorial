> [!IMPORTANT]
> Escrevi este REDME e esse tutorial com minhas proprias mãos, nada de IA.

# CI/CD Tutorial - Aula Pessoal

## O que é CI/CD?

CI/CD significa **Continuous Integration** e **Continuous Deployment**. É basicamente um sistema automático que você configura para que, toda vez que você faça alterações no seu código, tudo seja testado e implantado automaticamente. Você não precisa mais fazer tudo manualmente.

## O Fluxo Completo (Passo a Passo)

### Você cria uma branch de feature
Você sempre cria uma branch nova para trabalhar em uma funcionalidade específica. Isso evita que você quebre o código principal.

```bash
git checkout -b feature/tela-perfil
```

### Você escreve o código e testa localmente
Você escreve o código, testa na sua máquina, faz ajustes, etc. Tudo normal.

```bash
npm test     # Roda os testes
npm start    # Inicia o servidor local
```

### Você faz commit e push
Quando termina, você salva seu código no GitHub:

```bash
git add .
git commit -m "Adiciona tela de perfil do usuário"
git push origin feature/tela-perfil
```

### Você abre um Pull Request (PR)
Você vai no GitHub e cria um PR. Aqui você está pedindo para que outras pessoas reviem seu código antes de colocar na branch staging.

**O que acontece aqui?**
- O GitHub Actions "escuta" que um PR foi aberto
- A **CI Pipeline** é disparada automaticamente
- A CI Pipeline executa:
  - Instala todas as dependências do projeto
  - Roda todos os testes
  - Valida o build
  
Se alguma coisa falhar, o PR fica marcado como "failed" e você precisa corrigir.

### Você (ou alguém) aprova e faz merge
Quando a CI Pipeline passa com sucesso e o código é aprovado, você faz o merge da feature para staging.

**O que aconte aqui?**
- O GitHub Actions "escuta" que um merge foi feito na branch staging
- A **CD Pipeline** é disparada automaticamente
- A CD Pipeline executa:
  - Roda os testes novamente
  - Constrói uma imagem Docker do seu projeto
  - Faz upload da imagem para o Docker Hub
  - Autentica no Google Cloud Platform
  - Faz deploy da imagem na Cloud Run
  - Seu serviço fica disponível em uma URL pública

## Entendendo a CI Pipeline

A **CI Pipeline** é a primeira linha de defesa. Seu objetivo é garantir que o código está bom antes de ser mesclado.

```yaml
1. Baixar o código do GitHub
2. Instalar as dependências (npm ci)
3. Rodar os testes (npm test)
4. Validar o build (npm run build)
```

Se qualquer passo falhar, o PR fica com status "failed" e você não consegue fazer merge.

**Por quê isso é importante?**
- Você não quebra o código da staging
- Você descobre bugs antes de colocar em produção
- Outras pessoas sabem que o código foi validado

## Entendendo a CD Pipeline

A **CD Pipeline** é o deploy automático. Seu objetivo é pegar o código que passou na CI e colocar ele em produção.

```yaml
1. Rodar os testes novamente
2. Fazer build da imagem Docker
3. Fazer upload para Docker Hub
4. Autenticar no GCP
5. Deploy na Cloud Run
6. Serviço fica disponível em uma URL pública
```

**Por quê isso é importante?**
- Você não precisa fazer deploy manualmente
- Tudo é consistente (mesmos passos sempre)
- Muito mais rápido (máquina faz em segundos)

## O que é Docker?

Docker é uma forma de "empacotar" sua aplicação com todas as dependências dela. É tipo um container que tem tudo que sua aplicação precisa para rodar.

**Por quê?**
- Você garante que a aplicação roda igual em qualquer lugar (sua máquina, servidor, etc)
- Você não precisa se preocupar se o servidor tem Node.js 18 ou 20 instalado
- Tudo está no container

## O que é Cloud Run?

Cloud Run é um serviço do Google que roda seus containers Docker e os disponibiliza em uma URL pública.

**O fluxo:**
1. Você tem um Dockerfile
2. Você constrói uma imagem Docker
3. Você faz upload para Docker Hub
4. Cloud Run pega a imagem do Docker Hub
5. Cloud Run roda o container
6. Sua aplicação está disponível em: `https://seu-servico.run.app`

## Detalhes Técnicos Importantes

### Dockerfile
```dockerfile
FROM node:18-slim        # Base image (sistema operacional mínimo com Node)
WORKDIR /app             # Pasta onde o código vai rodar
COPY package*.json ./    # Copia os arquivos de dependências
RUN npm ci               # Instala as dependências
COPY . .                 # Copia todo o código
EXPOSE 8080              # Expõe a porta 8080
CMD npm start            # Comando que roda quando o container inicia
```

### Autenticação do GitHub Actions

O GitHub Actions precisa de permissões para:
1. Fazer login no Docker Hub (para fazer upload de imagens)
2. Fazer login no Google Cloud (para fazer deploy)

Isso é feito através de **Secrets** - informações sensíveis que você armazena no GitHub.

### Variáveis do GitHub

As variáveis são como "constantes" que você define uma vez e usa em vários lugares.

Exemplo:
- `IMAGE`: Nome da imagem no Docker Hub
- `GCR_STAGING_PROJECT_NAME`: Nome do serviço em staging
- `GCR_REGION`: Região do Google Cloud

## Resumo

- **CI/CD** automatiza testes e deploy
- **CI Pipeline** roda quando você cria um PR (testa o código)
- **CD Pipeline** roda quando você faz merge para staging (faz deploy)
- **Docker** empacota sua aplicação
- **Cloud Run** roda o container e deixa disponível na web
- **GitHub Actions** orquestra tudo isso

## O Ciclo Infinito

```
feature branch → PR → CI testa → merge → CD deploya → URL pública → repetir
```
