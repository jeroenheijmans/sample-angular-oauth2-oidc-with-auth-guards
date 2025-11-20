# ForgeRock OAuth2/OIDC Integration Guide

This guide explains how to configure this Angular application to authenticate with ForgeRock Access Management.

## Prerequisites

- ForgeRock Access Management instance (AM 6.5+ or later)
- Admin access to ForgeRock to create OAuth2 clients
- Angular application running on `http://localhost:4200` (development)

## Step 1: Configure ForgeRock OAuth2 Client

### 1.1 Login to ForgeRock Admin Console

Navigate to your ForgeRock AM admin console:
```
https://your-forgerock-instance.com/am/console
```

### 1.2 Create OAuth2 Client

1. Navigate to: **Realms** > **[Your Realm]** > **Applications** > **OAuth 2.0**
2. Click **Add Client** or **New**
3. Configure the following settings:

#### Core Settings

| Setting | Value |
|---------|-------|
| **Client ID** | `angular-spa-client` |
| **Client Type** | `Public` |
| **Redirection URIs** | `http://localhost:4200/`<br>`http://localhost:4200/silent-refresh.html`<br>`https://your-production-domain.com/`<br>`https://your-production-domain.com/silent-refresh.html` |

#### Advanced Settings

| Setting | Value |
|---------|-------|
| **Scopes** | `openid profile email` |
| **Grant Types** | ✅ Authorization Code<br>✅ Refresh Token |
| **Response Types** | ✅ code |
| **Token Endpoint Authentication Method** | `none` (public client) |
| **Proof Key for Code Exchange (PKCE)** | ✅ Required (or Recommended) |
| **Access Token Lifetime** | 3600 (1 hour) |
| **Refresh Token Lifetime** | 86400 (24 hours) |

#### Post Logout Redirect URIs (Optional)

Add allowed logout redirect URIs:
```
http://localhost:4200/
https://your-production-domain.com/
```

### 1.3 Save the Client Configuration

Click **Create** or **Save**

---

## Step 2: Get ForgeRock Endpoint Information

### 2.1 Find Your Issuer URL

Your ForgeRock issuer URL follows this format:

**With Realm:**
```
https://{hostname}/am/oauth2/realms/root/realms/{realm-name}
```

**Root Realm:**
```
https://{hostname}/am/oauth2
```

### 2.2 Verify Discovery Document

Test your issuer URL by accessing the discovery document:

```bash
curl https://your-forgerock-instance.com/am/oauth2/.well-known/openid-configuration
```

You should see a JSON response with endpoints like:
```json
{
  "issuer": "https://your-forgerock-instance.com/am/oauth2",
  "authorization_endpoint": "https://your-forgerock-instance.com/am/oauth2/authorize",
  "token_endpoint": "https://your-forgerock-instance.com/am/oauth2/access_token",
  "userinfo_endpoint": "https://your-forgerock-instance.com/am/oauth2/userinfo",
  ...
}
```

Copy the exact value of the `"issuer"` field - this is what you'll use in the Angular app.

---

## Step 3: Configure Angular Application

### 3.1 Update Development Environment

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,

  auth: {
    // Replace with your ForgeRock issuer URL (from discovery document)
    issuer: 'https://your-forgerock-instance.com/am/oauth2',

    // Replace with your OAuth2 Client ID
    clientId: 'angular-spa-client',

    // Adjust scopes based on your ForgeRock configuration
    scope: 'openid profile email',

    // Add your backend API URLs here
    resourceServerUrls: [
      'https://your-api.com/api',
      'https://your-forgerock-instance.com/api'
    ]
  }
};
```

### 3.2 Update Production Environment

Edit `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,

  auth: {
    // Production ForgeRock issuer URL
    issuer: 'https://prod-forgerock.example.com/am/oauth2',

    // Production OAuth2 Client ID (create separate client for production)
    clientId: 'angular-spa-client-prod',

    scope: 'openid profile email',

    resourceServerUrls: [
      'https://api.example.com/api',
      'https://prod-forgerock.example.com/api'
    ]
  }
};
```

---

## Step 4: Run the Application

### 4.1 Install Dependencies

```bash
npm install
```

### 4.2 Start Development Server

```bash
npm start
```

The application will run on `http://localhost:4200`

### 4.3 Test Authentication Flow

1. Open browser to `http://localhost:4200`
2. Navigate to a protected route (e.g., `/basics/admin1`)
3. You should be redirected to ForgeRock login page
4. Enter ForgeRock credentials
5. After successful authentication, you'll be redirected back to the Angular app
6. You should see your user information and access token in the UI

---

## Step 5: Verify Integration

### 5.1 Check Browser Console

With the app running, open browser DevTools console. You should see:

```
[DEBUG] Loaded discovery document
[DEBUG] Token received
[DEBUG] User profile loaded
```

### 5.2 Check LocalStorage

In DevTools > Application > Local Storage > `http://localhost:4200`, you should see:

- `access_token`
- `id_token`
- `refresh_token`
- `nonce`
- `PKCE_verifier`

### 5.3 Inspect ID Token

The app displays token information on the home page. Verify:

- ✅ `iss` claim matches your ForgeRock issuer
- ✅ `aud` claim matches your client ID
- ✅ `sub` claim contains user identifier
- ✅ `exp` claim shows expiration time

---

## Troubleshooting

### Issue: "Invalid redirect_uri"

**Cause:** The redirect URI is not whitelisted in ForgeRock client configuration.

**Solution:**
1. Go to ForgeRock admin console
2. Edit your OAuth2 client
3. Add `http://localhost:4200/` to **Redirection URIs**
4. Save and retry

### Issue: "Discovery document validation failed"

**Cause:** ForgeRock discovery document might be missing some standard OIDC fields.

**Solution:** Already handled in `auth-config.ts`:
```typescript
strictDiscoveryDocumentValidation: false
```

### Issue: Silent refresh fails

**Cause:** Third-party cookies blocked (Safari, Firefox strict mode).

**Solutions:**
1. Use refresh tokens instead of silent refresh
2. Disable `useSilentRefresh` in `auth-config.ts`
3. Use prompt-based refresh (user interaction required)

### Issue: CORS errors when calling APIs

**Cause:** Backend API not configured for CORS.

**Solution:** Configure your backend to:
1. Allow origin: `http://localhost:4200`
2. Allow credentials: `true`
3. Allow headers: `Authorization, Content-Type`

### Issue: Token not sent to API

**Cause:** API URL not in `resourceServerUrls`

**Solution:** Add your API base URL to `environment.ts`:
```typescript
resourceServerUrls: [
  'https://your-api.com/api',  // ← Add this
]
```

---

## Advanced Configuration

### Custom Claims

If ForgeRock provides custom claims, access them via:

```typescript
// In any component
constructor(private authService: AuthService) {}

ngOnInit() {
  const claims = this.authService.identityClaims;
  console.log('Custom claim:', claims['your-custom-claim']);
}
```

### Custom Scopes

To request additional scopes, update `environment.ts`:

```typescript
scope: 'openid profile email phone address custom-scope'
```

Make sure these scopes are configured in your ForgeRock OAuth2 client.

### Logout from ForgeRock

The app's logout only clears local session. To logout from ForgeRock:

```typescript
// In your component
logout() {
  const logoutUrl = this.authService.logoutUrl;
  this.authService.logout();
  window.location.href = logoutUrl; // Redirect to ForgeRock logout
}
```

---

## Security Best Practices

### Production Checklist

- [ ] Use HTTPS for all production URLs
- [ ] Set `showDebugInformation: false` in production (already configured)
- [ ] Create separate ForgeRock OAuth2 client for production
- [ ] Use different client IDs for dev/staging/prod
- [ ] Implement proper CSRF protection on backend APIs
- [ ] Validate JWT tokens on the backend (never trust client-side validation)
- [ ] Set appropriate token lifetimes (short access tokens, longer refresh tokens)
- [ ] Monitor token usage and revocation
- [ ] Implement proper error handling for expired/invalid tokens

### Token Storage

Tokens are stored in **localStorage** by default. This is acceptable for public clients but has XSS risk.

**Mitigation strategies:**
1. Use Content Security Policy (CSP) headers
2. Sanitize all user inputs
3. Keep dependencies updated
4. Consider using Backend-for-Frontend (BFF) pattern for highly sensitive applications

---

## ForgeRock-Specific Notes

### Realm Configuration

If using a custom realm, ensure the issuer URL includes the full realm path:

```
https://forgerock.com/am/oauth2/realms/root/realms/my-custom-realm
```

### AM Version Compatibility

This configuration is tested with:
- ForgeRock AM 6.5+
- ForgeRock AM 7.x
- Ping Identity (ForgeRock) AM 7.2+

Older versions may require adjustments.

### Session Timeout

Configure session timeout in ForgeRock to match your application requirements:

1. Navigate to: **Realms** > **[Your Realm]** > **Authentication** > **Settings**
2. Adjust **Session Quota** and **Session Timeout** as needed

---

## Next Steps

- ✅ ForgeRock OAuth2 client configured
- ✅ Angular app configured
- ✅ Authentication flow working
- 🔄 Implement role-based access control (RBAC)
- 🔄 Add protected API calls
- 🔄 Configure production deployment
- 🔄 Set up monitoring and logging

---

## Support & Resources

- **ForgeRock Documentation:** https://backstage.forgerock.com/docs/
- **angular-oauth2-oidc Library:** https://github.com/manfredsteyer/angular-oauth2-oidc
- **This Repository:** Check README.md for general usage

---

## Example ForgeRock Configurations

### Example 1: Development with Local ForgeRock

```typescript
// environment.ts
auth: {
  issuer: 'http://localhost:8080/openam/oauth2',
  clientId: 'angular-dev',
  scope: 'openid profile email',
  resourceServerUrls: ['http://localhost:3000/api']
}
```

### Example 2: Production with ForgeRock Cloud

```typescript
// environment.prod.ts
auth: {
  issuer: 'https://openam.forgerock.io/am/oauth2/realms/root/realms/alpha',
  clientId: 'angular-prod-client',
  scope: 'openid profile email',
  resourceServerUrls: ['https://api.example.com/api']
}
```

### Example 3: Multi-Realm Setup

```typescript
// environment.ts
auth: {
  issuer: 'https://forgerock.com/am/oauth2/realms/root/realms/customers/realms/acme-corp',
  clientId: 'acme-angular-client',
  scope: 'openid profile email custom-scope',
  resourceServerUrls: ['https://acme-api.example.com/api']
}
```
