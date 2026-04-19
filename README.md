# Итоговый проект

## Snapshot

- Node package manager: `npm`
- Main production build: `npm run build`
- Alternative production build: `npm run build:vite`
- Development server with Vite: `npm run start:vite`
- Bundlers: `webpack 5` and `vite + swc`
- React: `19.1.1`
- React DOM: `19.1.1`

## Сравнение сборок

Замер выполнен командами:

```bash
/usr/bin/time -p npm run build
/usr/bin/time -p npm run build:vite
```

Результат:

| Сборка     | Время         | JS                           | CSS                        | HTML        | Размер папки |
| ---------- | ------------- | ---------------------------- | -------------------------- | ----------- | ------------ |
| Webpack    | `real 10.44s` | `650135` bytes (`635 KiB`)   | `54745` bytes (`53.5 KiB`) | `434` bytes | `756K`       |
| Vite + SWC | `real 2.03s`  | `661800` bytes (`661.80 kB`) | `41719` bytes (`41.71 kB`) | `415` bytes | `712K`       |

Краткий вывод:

- `Vite + SWC` собирает проект заметно быстрее, чем `webpack` на текущем коде.
- У `vite` итоговая папка сборки меньше, а CSS получается компактнее.
- Основной JS-файл у `vite` чуть больше.
