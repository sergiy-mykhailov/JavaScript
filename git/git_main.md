# Инструкция (Основные команды git)


## 0. Создание / клонирование / добавление репозитория

Клонирование ропозитория: 
```
git clone <repository> [<directory>]
git clone https://github.com/someUser/projectName.git
```
Инициализация локального репозитория:
```
git init
```
Добавление нового удаленного репозитория и присвоение псевдонима "origin":
```
git remote add origin https://github.com/sergiy-mykhailov/projectName.git
```

## 1. Перейти в основную ветку "dev"
Список всех веток:
```
git branch
```
Перейти в ветку "dev":
```
git checkout dev
```

## 2. Получить изменения из удаленного репозитория "origin" (dev - основная ветка)
```
git pull origin dev
```

## 3. Создать новую ветку от текущей ветки (dev)
Создать новую ветку "branchName":
```
git branch branchName
```

## 4. Перейти в новую ветку "branchName"
```
git checkout branchName
```

## 5. Работа с файлами
Просмотр состояния файлов репозитория:
```
git status
```
Просмотр изменений в НЕ проиндексированных файлах:
```
git diff
```
Просмотр изменений в проиндексированных файлах:
```
git diff --cached
git diff --staged
```
Добавить файл "file.js" в индекс репозитория:
```
git add file.js
```
Отменить все изменения в файле "file.js":
```
git checkout -- file.js
```
Добавить все файлы проекта в индекс:
```
git add --all
```
Добавить все файли в репозиторий с комментарием:
```
git commit -m "first commit"
```

## 6. Выгрузить ветку "branchName" в удаленный репозиторий
(Выгрузка с тегами: --tags - все теги; --follow-tags - только Annotated)
```
git push origin branchName
```

## 7. Получить изменения из удаленного репозитория (ветка dev):
Перейти в основную ветку "dev"
```
git checkout dev
```
Получить изменения:
```
git pull origin dev
```

## 8. Слияние полученных изменений в свою ветку (dev -> branchName)
Перейти на ту ветку, в которую вы хотите слить свои изменения
```
git checkout branchName
```
Выполнить команду git merge <источник>
```
git merge dev -m "Merge dev into branchName"
```

## 9. Проверить работоспособность (после слияния с веткой dev)

## 10. Pull-request
```

```

## 11. Слияние Pull-request в основную ветку, используя squash
Перейти в основную ветку "dev":
```
git checkout dev
```
Выполнить squash и commit:
```
git merge branchName --squash
git commit -m "Merge branchName into dev"
```

## 12. Удаление ветки "branchName":
```
git branch -d branchName
```
