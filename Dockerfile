# 使用轻量级 Rust 镜像作为基础镜像
FROM rust:slim AS builder

# 设置工作目录
WORKDIR /app

# 安装 mdBook
RUN cargo install mdbook

# 复制项目文件到工作目录
COPY ./book /app

# 构建 mdBook 项目
RUN mdbook build

# 使用 Nginx 作为 Web 服务器
FROM nginx:alpine

# 将构建后的静态文件复制到 Nginx 默认静态目录
COPY --from=builder /app/target /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]