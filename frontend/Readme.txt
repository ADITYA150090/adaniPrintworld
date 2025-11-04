How Frontend Talks Now

Instead of calling:

http://officer-auth:3001/login


You’ll simply call:

http://api-gateway:8080/officer/login


Everything else — routing, authentication headers, etc. — is handled inside the gateway.