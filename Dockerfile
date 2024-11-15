# # 使用轻量级 Rust 镜像作为基础镜像
# FROM rust:slim AS builder

# # 设置工作目录
# WORKDIR /app

# # 安装 mdBook
# RUN cargo install mdbook

# # 复制项目文件到工作目录
# COPY ./book /app

# # 构建 mdBook 项目
# RUN mdbook build

# # 使用 Nginx 作为 Web 服务器
# FROM nginx:alpine

# # 将构建后的静态文件复制到 Nginx 默认静态目录
# COPY --from=builder /app/target /usr/share/nginx/html

# # 暴露端口
# EXPOSE 80

# # 启动 Nginx
# CMD ["nginx", "-g", "daemon off;"]

# 使用轻量级 Rust 镜像作为基础镜像
FROM rust:slim AS builder

# 设置工作目录
WORKDIR /app

# 安装 mdBook 和 static-web-server
RUN cargo install mdbook static-web-server mdbook-admonish mdbook-theme

# 复制项目文件到工作目录
COPY ./book /app

# 构建 mdBook 项目
RUN mdbook build

# 使用新的基础镜像以减小最终镜像体积
FROM debian:stable-slim

# 安装 static-web-server（直接使用从 builder 阶段的二进制）
COPY --from=builder /usr/local/cargo/bin/static-web-server /usr/local/bin/static-web-server

# 复制构建后的静态文件到新镜像
COPY --from=builder /app/target /app

COPY --from=builder /usr/local/cargo/bin/mdbook-admonish /usr/local/bin/mdbook-admonish
COPY --from=builder /usr/local/cargo/bin/mdbook-theme /usr/local/bin/mdbook-theme

# 设置工作目录
WORKDIR /app

# 暴露端口
EXPOSE 8080

# 启动 static-web-server
CMD ["static-web-server", "--port", "8080", "--host", "0.0.0.0", "--root", "/app"]