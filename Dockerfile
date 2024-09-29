# Etapa 1: Usar a imagem oficial do Node.js como base
FROM node:20-alpine AS build

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o código da aplicação para o diretório de trabalho
COPY . .

# Gerar o build da aplicação Angular
RUN npm run build

# Etapa 2: Usar a imagem oficial do Nginx para servir o aplicativo
FROM nginx:alpine

# Copiar o build gerado pelo Angular para o diretório padrão do Nginx
COPY --from=build /app/dist/docker-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY mime.types /etc/nginx/mime.types

# Expor a porta 80 para acessar a aplicação
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
