FROM daocloud.io/library/node:8.0.0-onbuild
MAINTAINER 287069934@qq.com
ENV PORT 3000
COPY . /koa2-project
WORKDIR /koa2-project
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD ["npm", "run", "dev"]
