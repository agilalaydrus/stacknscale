# STAGE 1: Builder
# Kita gunakan versi alpine terbaru agar tidak bentrok dengan versi lokal Anda
FROM golang:alpine AS builder

# Set environment variables (Perhatikan: GO111MODULE harus 'on')
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /app

# Copy go.mod dan go.sum terlebih dahulu untuk caching dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy seluruh source code
COPY . .

# Build aplikasi menjadi binary file bernama 'api-server'
RUN go build -ldflags="-w -s" -o api-server .

# STAGE 2: Production (Image super ringan)
FROM alpine:latest  

# Install ca-certificates agar ZeptoMail (SMTP TLS) tidak error
RUN apk --no-cache add ca-certificates tzdata

WORKDIR /root/

# Copy binary dari stage builder
COPY --from=builder /app/api-server .

# Expose port backend
EXPOSE 8080

# Jalankan binary
CMD ["./api-server"]