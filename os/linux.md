# Linux


## 1. basic commands

#### Работы с файлами и директориями

Выводит форматированный список всех файлов и директорий:
```Shell
ls [option(s)] [file(s)]
  -l detailed list
  -a displays hidden files
```
Копирование
```Shell
cp [option(s)] sourcefile targetfile
  -i Waits for confirmation, if necessary, before an existing targetfile is overwritten
  -r Copies recursively (includes subdirectories)
```
Переименование
```Shell
mv [option(s)] sourcefile targetfile
  -b Creates a backup copy of the sourcefile before moving
  -i Waits for confirmation, if necessary, before an existing targetfile is overwritten
```
Удаление
```Shell
rm [option(s)] file(s)
  -r Deletes any existing subdirectories
  -i Waits for confirmation before deleting each file.
```
Cоздает символическую ссылку
```Shell
ln [option(s)] sourcefile targetfile
  -s Creates a symbolic link
```
Переход в директорию
```Shell
cd [options(s)] [directory]
```
Создание директории
```Shell
mkdir [option(s)] directoryname
```
Удаление директории
```Shell
rmdir [option(s)] directoryname
```
Выводит текущий путь
```Shell
pwd
```
Создание пустого файла
```Shell
touch filename
```
 Показать содержимое файла
```Shell
cat filename
```
Выводит конец файла (работф с логами и большими файлами)
```Shell
tail filename
```
Редактирование файла
```Shell
nano filename
gedit filename
```
Выводит на экран размер заданной директории/файла
```Shell
du -sh filename
```
Поиск всех файлов с именем "filename"
```Shell
locate filename
```
Проверка существования директории "someDirectory"
```sh
if [ -d /home/user/someDirectory ]; then
  echo -e "Directory exist!"
else
  echo -e "Directory does not exist!"
fi
```

#### Права доступа

Изменение владельца и группы
```Shell
chown [option(s)] username.group file(s)
  -R Changes files and directories in all subdirectories.
```
Изменение группы
```Shell
chgrp [option(s)] groupname file(s)
```

##### Изменение прав доступа к файлам и директориям

Права:
```Shell
  r read
  w write
  x eXecute — executing files or changing to the directory.
```

**Использование команды в числовом виде**
```Shell
chmod [options] mode[,mode] file(s)
```
options:
```
    -R рекурсивное изменение прав доступа для каталогов и их содержимого
    -f не выдавать сообщения об ошибке для файлов, чьи права не могут быть изменены.
    -v подробно описывать действие или отсутствие действия для каждого файла.
```
mode (Пример — значение права «755»):

Тип             |владелец| группа |остальные
:---------------|:------:|:------:|:------:
восьмеричная    |   7    |   5    |   5
двоичная        |  111   |  101   |  101
символьная      |  rwx   |  r-x   |  r-x
тип пользователя|   u    |   g    |   0

Три варианта записи прав пользователя:

двоичная|восьмеричная| символьная |права на файл|права на директорию
:------:|:----------:|:----------:|:-----------:|:-----------------:
   000  |     0      |    ---     |    нет      |нет
   001  |     1      |    --x     | выполнение  |чтение файлов и их свойств
   010  |     2      |    -w-     | запись      |нет
   011  |     3      |    -wx     |запись и выполнение|всё, кроме чтения списка файлов
   100  |     4      |    r--     |  чтение     |чтение имён файлов
   101  |     5      |    r-x     |чтение и выполнение|доступ на чтение
   110  |     6      |    rw-     |чтение и запись |чтение имён файлов
   111  |     7      |    rwx     |  все права  |все права


**Использование команды в символьном виде**
```Shell
chmod [references][operator][modes] file(s)
```

references:
```Shell
u 	user 	Владелец файла
g 	group 	Пользователи, входящие в группу владельца файла
o 	others 	Остальные пользователи
a 	all 	Все пользователи (или ugo)
```

operator:
```Shell
+ 	добавить определенные права
- 	удалить определенные права
= 	установить определенные права
```

modes:
```Shell
r read - чтение файла или содержимого каталога
w write - запись в файл или в каталог
x execute - выполнение файла или чтение содержимого каталога
X special execute - выполнение, если файл является каталогом или уже имеет право на выполнение для какого-нибудь пользователя
s setuid/gid - установленные атрибуты SUID или SGID позволяют запускать файл на выполнение с правами владельца файла или группы соответственно
t sticky - устанавливая t-бит на директорию, мы меняем это правило таким образом, что удалить файл может только владелец этого файла
```





## 2. standard streams; stdin, stdout, stderr,
## 3. permissions; users and groups
## 4. bash/sh scripting;
## 5. networking;
## 6. package managers
## 7. setup dev env (nginx, mysql, php, nodejs, mongodb)
## 8. virtualization(containers; docker; OpenVZ, KVM)

KVM, Virtualbox

OpenVZ, Docker, LXC




