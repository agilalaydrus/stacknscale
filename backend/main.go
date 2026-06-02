package main

import (
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// 1. TAMBAHKAN WHATSAPP DI STRUCT DATABASE
type Lead struct {
	gorm.Model
	Name     string `json:"name"`
	Company  string `json:"company"`
	Email    string `json:"email"`
	WhatsApp string `json:"whatsapp"` // <--- Field Baru
	Problem  string `json:"problem"`
	Status   string `json:"status" gorm:"default:'New'"`
}

func sendEmailNotification(lead Lead) {
	smtpHost := "smtp.zeptomail.com"
	smtpPort := "587"

	// TODO: Pastikan ini email verified Anda!
	senderEmail := "no-reply@puas.id"
	smtpUser := "emailapikey"

	// TODO: Masukkan Token PHtE Anda yang benar
	smtpPassword := "wSsVR611r0bxWvt0zz34ce9tzVgGA12nFxl72VX16nf7SqvD98dqnhDPBgbzGqUdFDI8EmdEpukpm0sIhmEJ3dp/mQtTWiiF9mqRe1U4J3x17qnvhDzOWmxfkRCNLogKxAVpn2NnG80k+g=="

	recipientEmail := "agilalidrus89@gmail.com"

	subject := "Subject: 🔥 LEAD B2B BARU: Konsultasi IT StacknScale\n"
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"

	// 2. TAMBAHKAN BARIS WHATSAPP DI EMAIL TEMPLATE
	htmlBody := fmt.Sprintf(
		"<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>"+
			"<h2 style='color: #2563eb;'>Permintaan Konsultasi Baru</h2>"+
			"<p>Halo Agil, ada lead B2B baru yang masuk dari website StacknScale:</p>"+
			"<table style='border-collapse: collapse; width: 100%%; max-width: 600px;'>"+
			"<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 30%%;'>Nama Lengkap</td><td style='padding: 8px; border: 1px solid #ddd;'>%s</td></tr>"+
			"<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>Perusahaan</td><td style='padding: 8px; border: 1px solid #ddd;'>%s</td></tr>"+
			"<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>Email Kerja</td><td style='padding: 8px; border: 1px solid #ddd;'>%s</td></tr>"+
			"<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>No. WhatsApp</td><td style='padding: 8px; border: 1px solid #ddd;'>%s</td></tr>"+
			"<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>Kendala/Kebutuhan</td><td style='padding: 8px; border: 1px solid #ddd;'>%s</td></tr>"+
			"</table>"+
			"<p style='margin-top: 20px; font-weight: bold;'>Segera follow-up prospek ini via WA!</p>"+
			"<p style='color: #64748b; font-size: 12px;'>- StacknScale Automated System</p>"+
			"</div>",
		lead.Name, lead.Company, lead.Email, lead.WhatsApp, lead.Problem, // <--- Masukkan parameter WhatsApp di sini
	)

	msg := []byte(subject + mime + htmlBody)
	auth := smtp.PlainAuth("", smtpUser, smtpPassword, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, senderEmail, []string{recipientEmail}, msg)
	if err != nil {
		log.Println("⚠️ Gagal mengirim email notifikasi via SMTP:", err)
		return
	}
	log.Println("✅ Notifikasi email BERHASIL dikirim via SMTP ke", recipientEmail)
}

func main() {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=supersecretpassword dbname=stacknscale_db port=5433 sslmode=disable"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal terhubung ke database:", err)
	}

	// GORM akan otomatis menambahkan kolom 'whatsapp' di tabel karena ada perubahan struct!
	db.AutoMigrate(&Lead{})
	log.Println("✅ Database PostgreSQL berhasil terhubung & dimigrasi.")

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.POST("/api/audit-request", func(c *gin.Context) {
		var newLead Lead
		if err := c.ShouldBindJSON(&newLead); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		result := db.Create(&newLead)
		if result.Error != nil {
			log.Println("Gagal menyimpan lead:", result.Error)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan data"})
			return
		}

		log.Printf("🔥 LEAD BARU TERSIMPAN: %s (WA: %s)", newLead.Name, newLead.WhatsApp)

		go sendEmailNotification(newLead)

		c.JSON(http.StatusOK, gin.H{"message": "Permintaan audit berhasil diterima."})
	})

	log.Println("🚀 StacknScale API berjalan di port 8080")
	r.Run(":8080")
}
