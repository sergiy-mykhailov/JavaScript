# I. Основные команды git


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
## 6. Проверить работоспособность

## 7. Выгрузить ветку "branchName" в удаленный репозиторий
(Выгрузка с тегами: --tags - все теги; --follow-tags - только Annotated)
```
git push origin branchName
```

## 8. Получить изменения из удаленного репозитория (ветка dev):
Перейти в основную ветку "dev"
```
git checkout dev
```
Получить изменения:
```
git pull origin dev
```

## 9. Слияние полученных изменений в свою ветку (dev -> branchName)
Перейти на ту ветку, в которую вы хотите слить свои изменения
```
git checkout branchName
```
Выполнить команду git merge <источник>
```
git merge dev -m "Merge dev into branchName"
```

## 10. Проверить работоспособность (после слияния с веткой dev)

## 11. Pull-request
```

```

## 12. Слияние Pull-request в основную ветку, используя squash
```

```

## 13. Удаление ветки "branchName":
```
git branch -d branchName
```


___


# Дополнительные команды git

## 1. Теги
Создать тэг (Lightweight Tags):
```
git tag v1.0
```
Создать тэг (Annotated Tags):
```
git tag -a -m "Version 0.1.1" v0.1.1
```
Создать тэг (Annotated Tags) на определенный комит:
```
git tag -a -m "Version 0.0.5" v0.0.5 40a073e7d10bce3d95e223454f61f9f8fc390572
```
Показать информацию о теге v0.0.5:
```
$ git show v0.0.5
```
Выгрузить теги на удаленный сервер:
(--tags - все теги; --follow-tags - только Annotated)
```
git push origin --tags
git push origin --follow-tags
```
