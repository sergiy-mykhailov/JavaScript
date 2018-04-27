# Основные команды Mercurial


## 0. Создание / клонирование / добавление репозитория

Клонирование ропозитория: 
```
```
Инициализация локального репозитория:
```
```
Добавление нового удаленного репозитория и присвоение псевдонима "origin":
```
```

## 1. Перейти в основную ветку "dev"
Список всех веток:
```
```
Перейти в ветку "dev":
```
```

## 2. Получить изменения из удаленного репозитория (dev - основная ветка)
Получить все изменения:
```
hg pull
```
Получить изменения по основной метке master:
```
hg pull -B master
```

## 3.Информация по меткам
Список всех меток:
```
hg bookmarks
```
Статус текущей метки:
```
hg identify
```

## 4. Создать новую метку от текущей
Создать новую метку "bookmarkName":
```
hg bookmark bookmarkName
```

## 5. Перейти в новую метку "bookmarkName"
```
hg update bookmarkName
```

## 6. Работа с файлами
Просмотр состояния файлов репозитория:
```
hg status
```
Просмотр изменений в НЕ проиндексированных файлах:
```
hg diff
```
Просмотр изменений в проиндексированных файлах:
```
```
Добавить файл "file.js" в индекс репозитория:
```
hg add file.js
```
Отменить все изменения в файле "file.js":
```
```
Добавить все файлы проекта в индекс:
```
hg add --all
```
Добавить все файли в репозиторий с комментарием:
```
hg commit -m "first commit"
```
## 7. Проверить работоспособность


## 8. Получить изменения из удаленного репозитория (метка master):
Перейти в основную метку "master"
```
hg update master
```
Получить изменения:
```
hg pull -B master
```

## 9. Слияние полученных изменений в свою метку (master -> bookmarkName)
Перейти на ту метку, в которую вы хотите слить свои изменения
```
hg update bookmarkName
```
Выполнить команду git merge <источник>
```
hg merge master
```
Выполнить коммит слияния 
```
hg commit -m "merge master into bookmarkName"
```

## 10. Проверить работоспособность (после слияния с меткой master)

## 11. Слияние своей метки в основную (bookmarkName -> master)
Перейти на ту метку, в которую вы хотите слить свои изменения
```
hg update master
```
Выполнить команду git merge <источник>
```
hg merge bookmarkName
```
Выполнить коммит слияния 
```
hg commit -m "merge bookmarkName into master"
```

## 12. Если изменений небыло, нужно переместить метку master
Перейти в свою метку "bookmarkName"
```
hg update bookmarkName
```
Переместить метку master
```
hg bookmark master
```

## 12. Push в удаленный репозиторий основной метки master
```
hg push -B master
```

## 13. Удаление метки "bookmarkName":
```
hg bookmarks -d bookmarkName
```