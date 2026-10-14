export const handler = async (event: any) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    let payload = {};
    if (event.body) {
      try {
        payload = JSON.parse(event.body);
      } catch {
        // Fallback for form url-encoded bodies if any
        const params = new URLSearchParams(event.body);
        payload = {
          name: params.get("name"),
          email: params.get("email"),
          whatsapp: params.get("whatsapp"),
          message: params.get("message"),
        };
      }
    }

    const { name, email, whatsapp, message } = payload as any;

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "All required fields (name, email, message) must be provided.",
        }),
      };
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const formattedTimestamp = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "full",
      timeStyle: "long",
    });

    const escapeTelegramMarkdown = (str: string) =>
      str.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");

    const text =
      `📬 *New Message from Portfolio Website*\n\n` +
      `👤 *Sender:* ${escapeTelegramMarkdown(String(name))}\n` +
      `📧 *Email:* ${escapeTelegramMarkdown(String(email))}\n` +
      (whatsapp ? `💬 *WhatsApp:* ${escapeTelegramMarkdown(String(whatsapp))}\n` : "") +
      `📝 *Message:*\n${escapeTelegramMarkdown(String(message))}\n\n` +
      `⏰ _Received at: ${escapeTelegramMarkdown(formattedTimestamp)} (UTC)_`;

    if (!botToken || !chatId) {
      console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in Netlify environment variables.");
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          success: true,
          telegramSent: false,
          message: "Message received! (Note: Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Netlify Site Settings > Environment Variables for instant Telegram alerts)",
        }),
      };
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const telegramRes = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok || !telegramData.ok) {
      console.error("Telegram API response error:", telegramData);
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          success: true,
          telegramSent: false,
          message: `Message received, but Telegram dispatch failed: ${telegramData.description || "API error"}`,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        telegramSent: true,
        message: "Message dispatched directly to Telegram!",
      }),
    };
  } catch (err: any) {
    console.error("Netlify contact function uncaught error:", err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: err.message || "Failed to process contact message",
      }),
    };
  }
};
