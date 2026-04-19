# Итоговый проект

## Snapshot

- Node package manager: `npm`
- Main production build: `npm run build`
- Bundler: `webpack 5`
- React: `18.2.0`
- React DOM: `18.2.0`

## Webpack Metrics

Замер выполнен командой:

```bash
/usr/bin/time -p npm run build
```

Результат:

- Build time: `real 10.99s`
- JS bundle: `611 KiB` (`625339` bytes)
- CSS bundle: `50 KiB` (`51228` bytes)
- HTML: `407` bytes
- Total `dist` size: `672K` (`676974` bytes)
- Entrypoint `main`: `661 KiB`
