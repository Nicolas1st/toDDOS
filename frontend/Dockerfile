FROM node:14.17.0-slim AS dependencies

RUN mkdir -p /workspace/frontend && chown 1000:1000 /workspace/frontend
WORKDIR /workspace/frontend
USER 1000

ENV NEXT_TELEMETRY_DISABLED=1

COPY --chown=1000:1000 package*.json ./
RUN npm ci

FROM dependencies AS prebuild

COPY --chown=1000:1000 . .

FROM prebuild as build

ENV NODE_ENV=production

RUN npm run build

CMD ["npm", "run", "start"]
