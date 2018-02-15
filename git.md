# Краткая инструкция по git
___

# 1. Часто используемые
### Клонирование ропозитория:
```
git clone https://github.com/sergiy-mykhailov/projectName.git
```
### Инициализация локального хранилища:
```
git init
```

### Просмотр состояния проекта:
```
git status
```

### Добавить файл "README.md" в индекс проекта:
```
git add README.md
```

### Добавить все файлы проекта в индекс:
```
git add --all
```

### Добавить все файли в репозиторий с комментарием:
```
git commit -m "first commit"
```

### Добавление нового удаленного репозитория:
```
git remote add origin https://github.com/sergiy-mykhailov/projectName.git
```

### Загрузить локальный репозиторий в удаленный репозиторий:
```
git push -u origin master
```

### Список всех веток:
```
git branch -a
```

### Создать новую ветку "branchName":
```
git branch branchName
```

### Перейти в ветку "branchName":
```
git checkout branchName
```

### Создать тэг (Lightweight Tags):
```
git tag v1.0
```

### Создать тэг (Annotated Tags):
```
git tag -a -m "Version 0.1.1" v0.1.1
```

### Создать тэг (Annotated Tags) на определенный комит:
```
git tag -a -m "Version 0.0.5" v0.0.5 40a073e7d10bce3d95e223454f61f9f8fc390572
```

### Показать информацию о теге v0.0.5:
```
$ git show v0.0.5
```

### Выгрузить теги на удаленный сервер:
(--tags - все теги; --follow-tags - только Annotated)
```
git push origin --tags
git push origin --follow-tags
```

### Получить данный из удаленного сервера:
```
git pull origin
```

### Слияние (branch2 -> branch1):
Перейти на ту ветку, в которую вы хотите слить свои изменения
```
git checkout branch1
```
Выполнить команду git merge <источник>
```
git merge branch2
```

### Удаляем ветку part2:
```
git branch -d part2
```
