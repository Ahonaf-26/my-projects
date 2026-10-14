import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Telegram Contact Form Dispatch Endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, whatsapp, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          error: "All required fields (name, email, message) must be provided.",
        });
      }

      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      const formattedTimestamp = new Date().toLocaleString("en-US", {
        timeZone: "UTC",
        dateStyle: "full",
        timeStyle: "long",
      });

      // Format Telegram message with markdown
      const text = `📬 *New Message from Portfolio Website*\n\n` +
        `👤 *Sender:* ${escapeTelegramMarkdown(name)}\n` +
        `📧 *Email:* ${escapeTelegramMarkdown(email)}\n` +
        (whatsapp ? `💬 *WhatsApp:* ${escapeTelegramMarkdown(whatsapp)}\n` : "") +
        `📝 *Message:*\n${escapeTelegramMarkdown(message)}\n\n` +
        `⏰ _Received at: ${escapeTelegramMarkdown(formattedTimestamp)} (UTC)_`;

      if (botToken && chatId) {
        // Dispatch to Telegram Bot API
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const telegramResponse = await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "Markdown",
          }),
        });

        const telegramData = await telegramResponse.json();

        if (!telegramResponse.ok || !telegramData.ok) {
          console.error("Telegram API response error:", telegramData);
          return res.json({
            success: true,
            telegramSent: false,
            message: "Message received and recorded! (Telegram dispatch returned: " + (telegramData.description || "error") + ")",
          });
        }

        return res.json({
          success: true,
          telegramSent: true,
          message: "Message dispatched directly to Ahonaf via Telegram!",
        });
      } else {
        // No telegram bot token configured yet
        console.log(`[Contact Form Received]: From ${name} (${email}): ${message}`);
        return res.json({
          success: true,
          telegramSent: false,
          message: "Message received successfully! Note: Configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to receive instant Telegram notifications.",
        });
      }
    } catch (error: any) {
      console.error("Contact submission error:", error);
      return res.status(500).json({
        error: error.message || "Failed to process contact submission",
      });
    }
  });

  // Helper to escape special characters for Telegram Markdown v1
  function escapeTelegramMarkdown(str: string): string {
    return str.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
