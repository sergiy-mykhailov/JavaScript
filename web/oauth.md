# OAuth

OAuth 2.0 Authorization Code Flow (using Google login as an example).

> **Core Architecture Concept:** The frontend only handles a temporary *authorization code*, while the backend securely exchanges it for actual *tokens* using a private secret key. This architecture ensures that malicious actors cannot forge the login process, even if they completely intercept the client-side traffic.

### Process Participants

* **User** (Browser)
* **Frontend** (Client-side, e.g., React or Vue)
* **Backend** (Your server, e.g., Node.js or Python)
* **Google** (Authorization Server)

---

### Step-by-Step Algorithm

1. **Login Initiation (User ➔ Frontend):**
   The user clicks the "Sign in with Google" button in your application.
2. **Redirect to Google (Frontend ➔ Google):**
   The frontend constructs a specific URL and redirects the user there. This URL contains your `client_id` (the public identifier of your app), the `redirect_uri` (where to return the user after success), and the `scope` (the specific data you are requesting, such as email and profile).
3. **Authorization & Consent (User ➔ Google):**
   The user enters their credentials on Google's secure login page (your system never sees this information). They then click "Allow," granting your application permission to access their requested data.
4. **Return with a Code (Google ➔ Frontend):**
   Google redirects the user back to your app (using the specified `redirect_uri`), appending a temporary, one-time **`code`** (authorization code) to the URL.
   *Example:* `yoursite.com/callback?code=4/P7q7W91...`
5. **Sending the Code to the Server (Frontend ➔ Backend):**
   The frontend extracts this `code` from the URL parameters and sends it to your backend via a standard POST request.
6. **Exchanging the Code for Tokens (Backend ➔ Google):**
   *This is the most critical step for security.* Your backend makes a direct, server-to-server request to Google's API, transmitting:
* The received `code`
* Your `client_id`
* Your **`client_secret`** (the app's highly sensitive password, which must remain *exclusively* on the backend and never be exposed in the browser).


7. **Issuing Tokens (Google ➔ Backend):**
   Google verifies the `code` and the `client_secret`. If both are valid, it responds to your backend with:
* An **`access_token`** (allowing your backend to fetch data from Google's API on the user's behalf).
* An **`id_token`** (a JWT containing verified user information, such as their email, name, and profile picture).


8. **Creating a Custom Session (Backend ➔ Database):**
   The backend decodes the `id_token` to extract the user's email, then looks for that user in your database (if they don't exist, it creates a new user record). Once the user is identified, the backend generates a **custom session** specific to your application (such as your own internal JWT or a secure HTTP-only Cookie).
9. **Successful Login (Backend ➔ Frontend ➔ User):**
   The backend returns this new internal token or Cookie to the frontend. From this point forward, the frontend includes this session identifier with every request to prove the user is successfully authenticated in your system.
