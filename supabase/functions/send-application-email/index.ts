import { serve } from "https://deno.land/std/http/server.ts"

serve(async (req) => {
  const body = await req.json()

  const { full_name, email, country } = body

  const resendKey = Deno.env.get("RESEND_API_KEY")

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "AfricaMed Club <no-reply@africamedforum.com>",
      to: [email],
      subject: "AfricaMed Club membership application received",
      html: `
        <p>Dear ${full_name},</p>
        <p>Thank you for your application to the AfricaMed Club.</p>
        <p>Our team will review your submission and contact you shortly.</p>
        <p>Kind regards<br/>AfricaMed Club</p>
      `
    })
  })

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { "Content-Type": "application/json" } }
  )
})
