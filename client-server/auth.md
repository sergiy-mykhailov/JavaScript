# Auth

## Authentication

**Аутентификация** - процедура проверки подлинности, например:
* проверка подлинности пользователя путём сравнения введённого им пароля с паролем, сохранённым в базе данных;
* подтверждение подлинности электронного письма путём проверки цифровой подписи письма по открытому ключу отправителя;
* проверка контрольной суммы файла на соответствие сумме, заявленной автором этого файла.


## Authorization

**Авторизация** — предоставление определённому лицу или группе лиц прав на выполнение определённых действий; 
а также процесс проверки (подтверждения) данных прав при попытке выполнения этих действий.


## Basic auth

The credentials are sent in the header field:
```
Authorization: Basic <credentials>
```
###### Params:
- `credentials` is the `Base64` encoding of login and password joined by a single colon `:`


## Digest auth

The credentials are sent in the header field:
```
Authorization: Didgest <credentials>
```
###### Params:
- `credentials` - MD5 хеш-сумма логина, пароля, адреса сервера и случайных данных


## Bearer auth

The credentials are sent in the header field:
```
Authorization: Bearer <credentials>
```
###### Params:
- `credentials` - string of hexadecimal characters (often JWT)


## OAuth

**OAuth** — открытый протокол авторизации, обеспечивающий предоставление третьей стороне ограниченный доступ 
к защищённым ресурсам пользователя без передачи ей (третьей стороне) логина и пароля


## OpenID

**OpenID** — открытый стандарт децентрализованной системы аутентификации, 
предоставляющей пользователю возможность создать единую учётную запись
для аутентификации на множестве не связанных друг с другом интернет-ресурсов, используя услуги третьих лиц.


## SAML

**SAML** (security assertion markup language) — is an open standard for exchanging authentication 
and authorization data between parties, in particular, between an identity provider and a service provider.
An important use case that SAML addresses is web-browser single sign-on (SSO)


## OAuth vs OpenID
- **OAuth** является протоколом авторизации, который позволяет предоставить права на использование какого-то ресурса (например, API какого-либо сервиса). Наличие прав определяется токеном (уникальным идентификатором), который может быть одним и тем же для разных пользователей, или же у одного пользователя в разное время могут быть разные токены. Предоставление прав происходит в обмен на предоставление токена. В общем случае нельзя определить, кому принадлежит токен и кто в настоящий момент пользуется правами.
- **OpenID** является средством аутентификации: с помощью этой системы можно удостовериться, что пользователь — именно тот, за кого себя выдаёт. Какие действия сможет совершать пользователь, прошедший аутентификацию посредством OpenID, определяется стороной, проводящей аутентификацию.


## SAML vs OAuth

**SAML** Assertions or “SAML tokens” contain the user identification information (which can be trusted because it is signed), 
while with **OAuth** the Resource Server needs to make additional round trip in order to authenticate the Client with the Authorisation Server.


## Certification authority
Центр сертификации или удостоверяющий центр — сторона (отдел, организация), чья честность неоспорима, а открытый ключ широко известен. 
Задача центра сертификации — подтверждать подлинность ключей шифрования с помощью сертификатов электронной подписи.


## JWT

**JSON Web Token** — это открытый стандарт для создания токенов доступа, основанный на формате JSON. 
Как правило, используется для аутентификации.

### Схема работы
1. Клиент проходит аутентификацию в приложении (к примеру, с использованием логина и пароля)
2. В случае успешной аутентификации сервер отправляет клиенту access- и refresh-токены.
3. При дальнейшем обращении к серверу клиент использует access-токен. Сервер проверяет токен на валидность и предоставляет клиенту доступ к ресурсам
4. В случае, если access-токен становится невалидным, клиент отправляет refresh-токен, в ответ на который сервер предоставляет два обновленных токена.
5. В случае, если refresh-токен становится невалидным, клиент опять должен пройти процесс аутентификации (п. 1).

### Структура

```
header.payload.signature
```
Params:
- **header** - `Base64` encoded json object with headers (info about token)
- **payload** - `Base64` encoded json object with data (info about user)
- **signature** - `Base64` encoded signature: `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), your-256-bit-secret)`

#### header
* `alg` (**required**): алгоритм, используемый для подписи/шифрования (если неподписанный: `none`).
* `typ`: тип токена (type).
* `cty`: тип содержимого (content type).

#### payload
* `iss`: ID стороны, генерирующей токен (issuer).
* `sub`: user ID (subject).
* `aud`: список получателей данного токена. Принимающая сторона должна проверить наличие себя в получателях — иначе проигнорировать токен (audience).
* `exp`: время (Unix Time), когда токен станет невалидным (expiration).
* `nbf`: время (Unix Time), когда токен станет валидным (not before).
* `jti`: ID данного токена (JWT ID).
* `iat`: время (Unix Time), когда токен был создан. iat и nbf могут не совпадать.

