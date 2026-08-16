# Kyiv Runner Web

Окрема веб-сторінка проєкту **Kyiv Runner**.

## Структура

- `index.html` - головна сторінка.
- `styles.css` - адаптивні стилі.
- `script.js` - легка поведінка сторінки.
- `assets/` - зображення з актуального GitHub Pages артефакту гри.

## Локальний запуск

Відкрий `index.html` у браузері або запусти простий локальний сервер:

```powershell
python -m http.server 8080
```

## GitHub Pages

Репозиторій підготовлений як статичний сайт без build-кроку. Для деплою достатньо
увімкнути GitHub Pages з гілки `main` або використати workflow з `.github/workflows/pages.yml`.
