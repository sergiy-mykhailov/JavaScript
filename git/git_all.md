# Команды git

## 1. Инициализация локального репозитория
Инициализация локального репозитория:
```git
git init
```
##### Настройка репозитория:
Имя пользователя:
```git
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```
Выбор редактора:
```git
git config --global core.editor emacs
```
Утилита сравнения:
```git
git config --global merge.tool vimdiff
```
Показать все настройки:
```git
git config --list
```

## 2. Исключения файлов из обзора VCS
Добавить путь к файлам / каталогам в файл **.gitignore**:
```git exclude
.idea
.git
node_modules/
someFile.js
someFolder/someFileInFolder.js
/folderInRootDirectory
*.css
doc/**/*.txt
```
К шаблонам в файле **.gitignore** применяются следующие правила:
* Пустые строки, а также строки, начинающиеся с #, игнорируются.
* Можно использовать стандартные glob шаблоны.
* Можно заканчивать шаблон символом слэша (/) для указания каталога.
* Можно инвертировать шаблон, использовав восклицательный знак (!) в качестве первого символа.
* Символ * соответствует 0 или более символам.
* [abc] — любому символу из указанных в скобках ([0-9] - или интервалу символов).
* Знак вопроса (?) соответствует одному символу.

## 3. Локальный и глобальный репозитории

## 4. Как создать ссылку на глобальный репозиторий, как скачать репозиторий(clone)
Добавление нового удаленного репозитория и присвоение псевдонима "origin":
```git
git remote add <alias> <url>
git remote add origin https://github.com/someUser/projectName.git
```
Клонирование ропозитория: 
```git
git clone <repository> [<directory>]
git clone https://github.com/someUser/projectName.git dirName
```

## 5. Где находиться локальный репозиторий, откуда будут работать команды VCS
Локальный репозиторий находится в скрытой папке **.git** в папке проекта:
```
/projectFolder/.git/
```

## 6. Что такое коммит и как его сделать, что является уникальным для каждого коммита
Добавить все проиндексированные файли в репозиторий с комментарием:
```git
git commit -m "first commit"
```
Каждый коммит создается с уникальным идентификатором.

## 7. Pull | Fetch отличия
Команда **fetch** забирает данные в локальный репозиторий, но не сливает их с какими-либо наработками и не модифицирует текущие файлы
```git
git fetch [<remote repository>]
git fetch origin
```
Команда **pull** автоматически извлекает и затем сливает данные из удалённой ветки в текущую ветку:
```git
git pull [<remote repository>] [<branch>]
git pull origin master
```

## 8. Push. Для чего использовать оператор ":" (двоеточие) и как удалить ветку из удаленного репозитория
Отправка изменений в удаленный репозиторий:
```git
git push [<remote repository>] [<branch>]
git push origin master
```
Отправка изменений в удаленный репозиторий, в другую ветку
(Соответствие веток - **локальная : удаленная**)
```git
git push [<remote repository>] [<srcBranch>:<dstBranch>]
git push origin branchName:master
```
Удаление ветки из удаленного репозитория
```git
git push [<remote repository>] [:<branch>]
git push origin :branchName
```

## 9. Создание веток, как создать ветку из текущей и как скачать определенную ветку из удаленного репозитория
Создание ветки из текущей:
```git
git branch <branchName>
```
Создание ветки из текущей и перейти в новую ветку:
```git
git checkout -b <branchName>
```
Создать и перейти в новую ветку (задать отслеживание удаленной ветки):
```git
git checkout -b <branchName> [<remote repository>]/[<branchName>]
git checkout --track [<remote repository>]/[<branchName>]
```
Скачать определенную ветку из удаленного репозитория:
```git
git pull [<remote repository>] [<branchName>]
git pull origin dev
```
Скачать определенную ветку из удаленного репозитория и поместить в другую ветку:
```git
git pull [<remote repository>] [<srcBranch>:<dstBranch>]
git pull origin dev:newBranch
```

## 10. Как перейти на конкретный коммит в текущей ветке.
Перейти на коммит с ID = 'f2ca58f1...' в текущей ветке:
```git
git checkout <commit> 
git checkout f2ca58f1 
```

## 11. Как просмотреть все ветки в локальном репозитории,удаленном
Просмотреть все ветки в локальном репозитории
```git
git branch
```
Просмотреть все ветки в удаленном репозитории
```git
git remote show origin
```

## 12. Как просмотреть ветки, которые были слиты в текущую ветку, как просмотреть ветки, которые не были слиты в текущую ветку
Ветки, которые были слиты в текущую ветку:
```git
git branch --merged
```
Ветки, которые НЕ были слиты в текущую ветку:
```git
git branch --no-merged
```
## 13. Конфликты, как возникают, как решать, какие типы слияния существуют?(Recursive, fast-forward)
**Конфликты** - возникают при слиянии, если сделаны изменения
в одной и той же части одного и того же файла в двух объединяемых ветках.

Git добавляет в конфликтующие файлы стандартные пометки разрешения конфликтов,
чтобы вы могли вручную открыть их и разрешить конфликты.

Отменить попытку слияния:
```git
git merge --abort
```

Слияние с определенной стратегией и/или механизмом:
```git
git merge -s <стратегия> -X<механизм>
```

**Стратегии слияния:**
1. **resolve** - выполняет поиск общего предка и слияние относительно него, при конфликте выводится сообщение
2. **recursive** - в качестве предка используется «виртуальный» предок, который получается путем слияния нескольких предков, каждого из коммитов, далее проводится слияние коммитов этого предка
3. **octopus** -  используется для слияния более чем двух веток.
4. **ours** - выполняет слияние, но все изменения берет из ветки-приемника
5. **subtree** - используется для слияния разных каталогов

**Механизмы (для recursive стратегии):**
1. **ours** - при конфликте будут взяты изменения из ветки-приемника
2. **theirs** - при конфликте будут взяты изменения из ветки-источника
3. **subtree\[=path\]** - используется для слияния разных каталогов

**Fast forward** - используется при отсутствии коммитов в ветке master
после ответвления, коммиты из новой ветки копируются в master
и указатель перемещается на последний коммит, коммит слияния не создается.

Слияние без *Fast forward* (**no-ff**), Слияние с *Fast forward* (**ff-only**):
```git
git merge branchName [--no-ff] [--ff-only]
```


## 14. Как переключиться на другую ветку, но оставить текущие изменения без создания коммита?
Спрятать изменения (stash):
```git
git stash
git stash save
```
Посмотреть список спрятанных изменений:
```git
git stash list
```
Востановить последнее изменение:
```git
git stash apply
```
Востановить одно из предыдущих изменений (stashName - имя спрятанного изменения):
```git
git stash apply stashName
```
Востановить последнее изменение (со всеми проиндексированными файлами):
```git
git stash apply --index
```
Удалить из хранилища одно из предыдущих изменений:
```git
git stash drop stashName
```
Востановить последнее изменение и удалить его из хранилища:
```git
git stash pop
```
[Docs git-stash](https://git-scm.com/docs/git-stash)

## 15. Использование HTTPS и SSH для доступа к удаленному репозиторию, отличия, как сделать доступ по SSH
Клонирование через HTTPS
```git
git clone https://github.com/username/reponame.git
```
Клонирование через SSH
```git
git clone git@github.com:username/reponame.git
```

Создание ssh-ключа.
```git
ssh-keygen -t rsa -C "user.name@mail.domain"
```
По умолчанию пара ключей кладутся в
```
~/.ssh/id_rsa
~/.ssh/id_rsa.pub (*это публичный ключ который надо скопировать в акаунт github.com)
```

## 16. Как отменить текущие проиндексированные изменения, что произойдет?(reset)
Сброс HEAD к <commit>. Индекс и рабочая директирия не изменяются:
```git
git reset --soft [<commit>]
git reset --soft HEAD~
```
Сброс HEAD и индекса. Рабочая директирия не изменяются:
```git
git reset --mixed [<commit>]
git reset --mixed HEAD~
```
Сброс HEAD, индекса и рабочей директирии:
```git
git reset --hard [<commit>]
git reset --hard HEAD~
```
[Docs  git-reset](https://git-scm.com/book/ru/v2/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-Git-%D0%A0%D0%B0%D1%81%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5-%D1%82%D0%B0%D0%B9%D0%BD-reset#_git_reset)


## 17. Как отменить последний коммит, что произойдет?(revert)
Создается новый комит обратный \<commit\>
```git
git revert <commit>
```
## 18. Как изменить последний коммит и его описания,  что при этом произойдет, что если этот коммит до изменения был запушен на удаленный репозиторий? commit --amend
The second commit replaces the results of the first:
```git
git commit -m 'initial commit'
git add forgotten_file
git commit --amend
```
## 19. Что такое rebase, зачем он нужен, приведи пример использования
Командой **rebase** можно взять все изменения, которые попали в коммиты на одной из веток, и повторить их на другой:
```git
git checkout brancheName
git rebase master
```
## 20. Как откатить последние 6 коммитов?
```git
git reset --hard HEAD~6
```

## 21. Теги
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

## 22. Apply the changes introduced by some existing commits
```git
git cherry-pick <branche>
```
[git-cherry-pick](https://git-scm.com/docs/git-cherry-pick)
