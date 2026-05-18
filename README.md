# satcom-orbital-simulator

Simulador visual educacional em Three.js para explicar órbitas LEO/MEO/GEO, handover, feixes RF e uma versão didática da Síndrome de Kessler.

## Objetivo
Projeto focado em ensino e demonstração técnica. **Não** é ferramenta de engenharia orbital real.

## Rodar localmente
```bash
npm install
npm run dev
```

## Build produção
```bash
npm run build
```

## Rodar com Docker
```bash
docker compose up -d --build
```
Acesse: http://localhost:8080

## Proteção inicial de acesso (MVP/demo privada)
A aplicação pode ser protegida com **HTTP Basic Auth** no Nginx, cobrindo toda a SPA.

> Esta proteção é apenas para uso privado de MVP/demo e **não substitui** autenticação completa com backend.

### 1) Criar arquivo `.htpasswd`
Opção com utilitário `htpasswd`:
```bash
htpasswd -c .htpasswd seusuario
```

Opção com Docker (sem instalar utilitário localmente):
```bash
docker run --rm httpd:2.4-alpine htpasswd -nbB seusuario suasenha > .htpasswd
```

### 2) Ativar autenticação no `docker-compose.yml`
Defina:
- `BASIC_AUTH_ENABLED: "true"`
- volume `./.htpasswd:/etc/nginx/.htpasswd:ro`

### 3) Subir container
```bash
docker compose up -d --build
```

## Funcionalidades MVP entregues
- Cena 3D com Terra, estrelas, satélites e estação terrestre.
- Feixe RF entre estação e melhor satélite (handover simples).
- Troca de cenários LEO/OneWeb/Kuiper/MEO/GEO/GPS/Kessler.
- Simulação de colisão e geração de detritos com contadores.
- Painel lateral técnico em PT-BR com controles principais.

## Limitações da v1
- Escala visual comprimida para didática.
- Órbitas e latência aproximadas (não científicas).
- Sem ingestão de TLE/SGP4 e sem dados reais NORAD.
- Basic Auth apenas para proteção simples de ambiente de demo.

## Preparação de arquitetura futura
A estrutura atual foi mantida modular para facilitar próximas fases com:
- backend Node.js/Express;
- login com usuários e perfis de acesso;
- salvamento de cenários;
- logs de uso;
- banco MariaDB ou PostgreSQL.

## Próximos passos recomendados
- Integrar TLE + SGP4.
- Cálculo real de visada/elevação/azimute.
- Footprints reais, beams múltiplos e ISL laser.
- Modo apresentação, gravação/export e narração guiada.
