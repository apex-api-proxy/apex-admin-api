openssl req \
-newkey rsa:2048 \
-x509 \
-nodes \
-keyout server.key \
-new \
-out server.cert \
-subj /CN=localhost \
-reqexts SAN \
-extensions SAN \
-config <(cat /etc/ssl/openssl.cnf \
    <(printf '[SAN]\nsubjectAltName=DNS:localhost,IP:172.31.30.253')) \
-sha256 \
-days 3650


openssl req \
-newkey rsa:2048 \
-x509 \
-nodes \
-keyout server.key \
-new \
-out server.cert \
-subj /CN=localhost \
-reqexts SAN \
-extensions SAN \
-config <(cat /etc/ssl/openssl.cnf \
    <(printf '[SAN]\nsubjectAltName=DNS:localhost,IP:127.0.0.1')) \
-sha256 \
-days 3650