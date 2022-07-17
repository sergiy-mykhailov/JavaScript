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

### Info
**OAuth** — открытый протокол авторизации, обеспечивающий предоставление третьей стороне ограниченный доступ 
к защищённым ресурсам пользователя без передачи ей (третьей стороне) логина и пароля

### Authorization Flow
* The user clicks Login within the regular web application.
* Auth0's SDK redirects the user to the Auth0 Authorization Server (`/authorize` endpoint).
* Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
* The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the regular web application.
* Your Auth0 Authorization Server redirects the user back to the application with an authorization `code`, which is good for one use.
* Auth0's SDK sends this `code` to the Auth0 Authorization Server (`/oauth/token` endpoint) along with the application's Client ID and Client Secret.
* Your Auth0 Authorization Server verifies the `code`, Client ID, and Client Secret.
* Your Auth0 Authorization Server responds with an ID Token and Access Token (and optionally, a Refresh Token).
* Your application can use the Access Token to call an API to access information about the user.
* The API responds with requested data.


## SSO

### Info
**Single Sign-On** (SSO) is a protocol used to authenticate and authorize users to multiple applications while using a single set of credentials.

### SSO flow:
* The user requests a resource from their desired application or website.
* The application or website redirects the user to the Identity Provider for authentication, using SAML, OpenID Connect, etc.
* The IdP authenticates the user and passes a token to the SSO server.
* The SSO server delivers the token to the application.
* The application grants access to the user.


## OpenID

### Info
**OpenID** — открытый стандарт децентрализованной системы аутентификации, 
предоставляющей пользователю возможность создать единую учётную запись
для аутентификации на множестве не связанных друг с другом интернет-ресурсов, используя услуги третьих лиц.

### Connection Flow
* A user requests access to an application.
* The application redirects the request to the identity provider.
* The IdP authenticates the user. If successful, the IdP displays a prompt asking the user to grant access to the required application.
* The IdP generates an ID Token with identity information that the app can use.
* The IdP redirects the user back to the application, and the user can access it without providing credentials again.


## SAML

### Info
**SAML** (security assertion markup language) — is an open standard for exchanging authentication 
and authorization data between parties, in particular, between an identity provider and a service provider.
An important use case that SAML addresses is web-browser single sign-on (SSO)

### Connection Flow
* The user requests to access a resource in an application (service provider) that participates in the SSO flow.
* The application checks with the IdP to see if the user is permitted to access the required resource.
* The IdP authenticates the user, and if the user has access, returns an assertion that the user should be able to access the resource.


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

